import {
  Directive,
  HostBinding,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appGoldenToast]',
  standalone: true
})
export class GoldenToastDirective {

  private clicado = false;

  @HostBinding('style.transition')
  transition = 'box-shadow 0.3s ease, transform 0.2s ease';

  @HostBinding('style.boxShadow')
  boxShadow = 'none';

  @HostBinding('style.transform')
  transform = 'scale(1)';

  @HostListener('click')
  onClick() {
    if (this.clicado) return;
    this.clicado = true;

    // Brilho dourado + leve crescimento (brinde!)
    this.boxShadow = '0 0 18px 6px rgba(255, 200, 50, 0.85)';
    this.transform = 'scale(1.04)';

    setTimeout(() => {
      this.boxShadow = 'none';
      this.transform = 'scale(1)';
      this.clicado = false;
    }, 600);
  }
}