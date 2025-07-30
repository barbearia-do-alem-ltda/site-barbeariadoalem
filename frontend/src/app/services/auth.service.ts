import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Admin {
  id: number;
  nome: string;
  email: string;
  nivelAcesso: string;
  ultimoLogin?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  admin: Admin;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'admin-token';
  private adminKey = 'admin-logado';
  
  // BehaviorSubject para gerenciar o estado de autenticação
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentAdminSubject = new BehaviorSubject<Admin | null>(this.getStoredAdmin());

  constructor(private http: HttpClient) { }

  // Observables públicos
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentAdmin$(): Observable<Admin | null> {
    return this.currentAdminSubject.asObservable();
  }

  // Verificar se tem token
  private hasToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }
    
    // Verificar se o token não está corrompido (verificação básica)
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('⚠️ Token JWT mal formado, limpando...');
        this.clearAuth();
        return false;
      }
      
      // Decodificar payload para verificar expiração
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < now) {
        console.log('⚠️ Token expirado, limpando...');
        this.clearAuth();
        return false;
      }
      
      return true;
    } catch (error) {
      console.log('⚠️ Erro ao validar token, limpando:', error);
      this.clearAuth();
      return false;
    }
  }

  // Obter admin armazenado
  private getStoredAdmin(): Admin | null {
    const adminData = localStorage.getItem(this.adminKey);
    return adminData ? JSON.parse(adminData) : null;
  }

  // Obter dados do admin logado (método público)
  getAdminLogado(): Admin | null {
    return this.getStoredAdmin();
  }

  // Login
  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/admin/login`, { email, senha })
      .pipe(
        tap(response => {
          if (response.success) {
            // Armazenar token e dados do admin
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.adminKey, JSON.stringify(response.admin));
            
            // Atualizar subjects
            this.isAuthenticatedSubject.next(true);
            this.currentAdminSubject.next(response.admin);
          }
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          return throwError(() => error);
        })
      );
  }

  // Logout
  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    
    return this.http.post(`${this.apiUrl}/admin/logout`, {}, { headers })
      .pipe(
        tap(() => this.clearAuth()),
        catchError(error => {
          // Mesmo se der erro, limpar auth local
          this.clearAuth();
          return throwError(() => error);
        })
      );
  }

  // Limpar autenticação
  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
    this.isAuthenticatedSubject.next(false);
    this.currentAdminSubject.next(null);
  }

  // Limpar dados locais (método público)
  clearLocalData(): void {
    this.clearAuth();
  }

  // Obter headers de autenticação
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Verificar status de autenticação no servidor
  checkAuthStatus(): Observable<any> {
    const headers = this.getAuthHeaders();
    
    return this.http.get(`${this.apiUrl}/admin/status`, { headers })
      .pipe(
        tap(response => {
          if (response && (response as any).authenticated) {
            this.isAuthenticatedSubject.next(true);
            this.currentAdminSubject.next((response as any).admin);
          } else {
            console.log('🔐 Sessão invalidada pelo servidor - fazendo logout automático');
            this.clearAuth();
          }
        }),
        catchError(error => {
          // Se erro 401, significa que a sessão foi invalidada
          if (error.status === 401) {
            console.log('🔐 Token inválido detectado - servidor pode ter sido reiniciado');
            console.log('🔄 Fazendo logout automático...');
          }
          this.clearAuth();
          return throwError(() => error);
        })
      );
  }

  // Getter para verificação rápida
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Getter para admin atual
  get currentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }
}
