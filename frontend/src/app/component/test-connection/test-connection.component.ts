import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-connection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h2>🔗 Teste de Conexão Frontend ↔ Backend</h2>
      
      <div class="config-info">
        <h3>📋 Configurações:</h3>
        <p><strong>Environment:</strong> {{ environment.production ? 'Produção' : 'Desenvolvimento' }}</p>
        <p><strong>API URL:</strong> {{ environment.apiUrl }}</p>
      </div>

      <div class="test-section">
        <button (click)="testarConexao()" [disabled]="testando" class="btn-test">
          {{ testando ? '🔄 Testando...' : '🧪 Testar Conexão' }}
        </button>
      </div>

      <div class="results" *ngIf="resultados.length > 0">
        <h3>📊 Resultados:</h3>
        <div *ngFor="let resultado of resultados" 
             [class]="'result-item ' + (resultado.sucesso ? 'success' : 'error')">
          <strong>{{ resultado.teste }}:</strong>
          <span class="status">{{ resultado.sucesso ? '✅' : '❌' }}</span>
          <p>{{ resultado.mensagem }}</p>
          <pre *ngIf="resultado.dados">{{ resultado.dados | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background: #1a1a1a;
      border-radius: 10px;
      color: #eee;
    }
    
    .config-info {
      background: #2a2a2a;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .btn-test {
      background: #d4af37;
      color: #000;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-bottom: 20px;
    }
    
    .btn-test:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .result-item {
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border-left: 4px solid;
    }
    
    .result-item.success {
      background: rgba(0, 255, 0, 0.1);
      border-color: #00ff00;
    }
    
    .result-item.error {
      background: rgba(255, 0, 0, 0.1);
      border-color: #ff0000;
    }
    
    .status {
      float: right;
      font-size: 18px;
    }
    
    pre {
      background: #000;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
  `]
})
export class TestConnectionComponent implements OnInit {
  environment = environment;
  testando = false;
  resultados: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    console.log('🔧 Configuração atual:', this.environment);
  }

  async testarConexao() {
    this.testando = true;
    this.resultados = [];

    this.adicionarResultado('URL da API', true, `Configurada para: ${this.environment.apiUrl}`);

    try {
      const servicos = await this.databaseService.getServicos().toPromise();
      this.adicionarResultado('GET /api/servicos', true, 
        `${servicos?.length || 0} serviços encontrados`, servicos?.slice(0, 2));
    } catch (error: any) {
      this.adicionarResultado('GET /api/servicos', false, 
        `Erro: ${error.message || error}`, error);
    }

    try {
      const clientes = await this.databaseService.getClientes().toPromise();
      this.adicionarResultado('GET /api/clientes', true, 
        `${clientes?.length || 0} clientes encontrados`, clientes?.slice(0, 2));
    } catch (error: any) {
      this.adicionarResultado('GET /api/clientes', false, 
        `Erro: ${error.message || error}`, error);
    }

    try {
      const response = await fetch(`${this.environment.apiUrl}/servicos`);
      if (response.ok) {
        const data = await response.json();
        this.adicionarResultado('Fetch direto', true, 
          `Status: ${response.status}, ${data.length} itens`, data.slice(0, 1));
      } else {
        this.adicionarResultado('Fetch direto', false, 
          `Status: ${response.status} - ${response.statusText}`);
      }
    } catch (error: any) {
      this.adicionarResultado('Fetch direto', false, 
        `Erro de rede: ${error.message}`);
    }

    this.testando = false;
  }

  private adicionarResultado(teste: string, sucesso: boolean, mensagem: string, dados?: any) {
    this.resultados.push({ teste, sucesso, mensagem, dados });
  }
}