import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appGoldenToast]',
  standalone: true
})
export class GoldenToastDirective {
  @HostBinding('style.transition')
  transition = 'box-shadow 0.3s ease, transform 0.2s ease';

  @HostBinding('style.borderRadius')
  borderRadius = '50%';

  @HostBinding('style.boxShadow')
  boxShadow = 'none';

  @HostBinding('style.transform')
  transform = 'scale(1)';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.boxShadow = '0 0 18px 6px rgba(255, 200, 50, 0.85)';
    this.transform = 'scale(1.04)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.boxShadow = 'none';
    this.transform = 'scale(1)';
  }
}