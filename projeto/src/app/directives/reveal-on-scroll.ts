import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements OnInit {

  @Input('appRevealOnScroll') delay: string = '0s';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(30px)');
    this.renderer.setStyle(element, 'transition',
      `opacity 0.6s ease ${this.delay}, transform 0.6s ease ${this.delay}`
    );

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(element, 'opacity', '1');
          this.renderer.setStyle(element, 'transform', 'translateY(0)');
          this.observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(element);
  }
}