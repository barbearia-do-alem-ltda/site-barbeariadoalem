import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GaleriaService } from '../../services/galeria.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private touchStartTime: number = 0;
  private touchMoved: boolean = false;
  
  constructor(private router: Router, private galeriaService: GaleriaService) {}
  
  navegarParaGaleria(titulo: string): void {
    this.galeriaService.setServicoSelecionado(titulo);
    this.router.navigate(['/galeria-fotos']);
  }
  
  onTouchStart(event: TouchEvent): void {
    this.touchStartTime = Date.now();
    this.touchMoved = false;
    
    // Adiciona feedback visual imediato
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(0.95)';
      target.style.transition = 'transform 0.1s ease';
    }
  }
  
  onTouchEnd(event: TouchEvent, titulo: string): void {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - this.touchStartTime;
    
    // Remove feedback visual
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.transform = 'scale(1)';
      target.style.transition = 'transform 0.2s ease';
    }
    
    // Só navega se foi um toque rápido (não um scroll)
    if (touchDuration < 500 && !this.touchMoved) {
      event.preventDefault();
      this.navegarParaGaleria(titulo);
    }
  }
}
