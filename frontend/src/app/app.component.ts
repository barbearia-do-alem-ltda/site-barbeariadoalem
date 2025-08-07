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
  
  constructor(private loginModalService: LoginModalService) {}
  
  openAdminLogin(): void {
    this.loginModalService.openModal();
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Previne scroll do body quando menu está aberto
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}
