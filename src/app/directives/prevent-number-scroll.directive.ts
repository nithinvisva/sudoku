import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash'

@Directive({
  selector: '[appPreventNumberScroll]'
})
export class PreventNumberScrollDirective {
  _=_;
  

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown',['$event'])
  keyEvent(event: KeyboardEvent) {
    if(_.includes(['ArrowUp','ArrowDown'], event.key)){
        event.preventDefault();
    }
  }


}
