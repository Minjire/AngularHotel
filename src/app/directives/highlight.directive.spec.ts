import { HighlightDirective } from './highlight.directive';
import { inject } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';


describe('HighlightDirective', () => {
  it('should create an instance', () => {
    inject([ElementRef, Renderer2], (elementRef: ElementRef, renderer: Renderer2) => {
      const directive = new HighlightDirective(elementRef, renderer);
      expect(directive).toBeTruthy();
    })
  });  
});
