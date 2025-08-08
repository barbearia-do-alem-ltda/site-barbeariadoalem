import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginModalService } from './services/login-modal.service';
import { LoginComponent } from './component/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'barbearia-do-alem';
  mobileMenuOpen = false;
  private menuTouchStartTime: number = 0;
  
  constructor(private loginModalService: LoginModalService) {}
  
  openAdminLogin(): void {
    this.loginModalService.openModal();
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.updateBodyOverflow();
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.updateBodyOverflow();
  }
  
  private updateBodyOverflow(): void {
    // Previne scroll do body quando menu está aberto
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }
  }
  
  onMenuTouchStart(event: TouchEvent): void {
    this.menuTouchStartTime = Date.now();
    
    // Feedback visual imediato
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(0.9)';
      target.style.transition = 'transform 0.1s ease';
    }
  }
  
  onMenuTouchEnd(event: TouchEvent): void {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - this.menuTouchStartTime;
    
    // Remove feedback visual
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(1)';
      target.style.transition = 'transform 0.2s ease';
    }
    
    // Só executa se foi um toque rápido
    if (touchDuration < 300) {
      event.preventDefault();
      this.toggleMobileMenu();
    }
  }
}
