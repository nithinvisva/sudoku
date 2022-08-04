import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash'

@Directive({
  selector: '[appMoveToNext]'
})
export class MoveToNextDirective {
  _=_;
  

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown',['$event'])
  keyEvent(event: KeyboardEvent) {
    switch(event.key){
      case 'ArrowRight':
        if(!_.includes(['input#8','input#17','input#26','input#35','input#44','input#53','input#62','input#71','input#80'],this.el.nativeElement.children[0].id)){
          this.el.nativeElement.nextSibling.children[0].focus()
        }
        break;
      case 'ArrowLeft':
        if(!_.includes(['input#0','input#9','input#18','input#27','input#36','input#45','input#54','input#63','input#72'],this.el.nativeElement.children[0].id)){
          this.el.nativeElement.previousSibling.children[0].focus()
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if(!_.includes(['input#0','input#1','input#2','input#3','input#4','input#5','input#6','input#7','input#8'],this.el.nativeElement.children[0].id)){
          this.el.nativeElement.parentElement.previousSibling.children[this.getIndex(this.el.nativeElement.children[0].id)].children[0].focus();
        }
        break;
      case 'ArrowDown':
        if(!_.includes(['input#72','input#73','input#74','input#75','input#76','input#77','input#78','input#79','input#80'],this.el.nativeElement.children[0].id)){
          this.el.nativeElement.parentElement.nextSibling.children[this.getIndex(this.el.nativeElement.children[0].id)].children[0].focus();
        }
        break;
      default:
        this.doNothing()
        break;
    }
  }

  getIndex(s: string): number{
    return ((_.toNumber(s.split('#')[1]))%9)
  }

  doNothing(){
    //Does nothing
  }



}
