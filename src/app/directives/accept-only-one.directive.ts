import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash'

@Directive({
  selector: '[appAcceptOnlyOne]'
})
export class AcceptOnlyOneDirective {
  _=_;
  

  constructor(private el: ElementRef) {
  }

  @HostListener('keypress',['$event'])
  keyEvent(event: KeyboardEvent) {
    if(_.includes([0,1,2,3,4,5,6,7,8,9], _.toNumber(event.key))){
      if(((this.el.nativeElement as HTMLInputElement).value).length >= 1){
        (this.el.nativeElement as HTMLInputElement).value = event.key
        event.preventDefault();
      }
    }
  }
}
