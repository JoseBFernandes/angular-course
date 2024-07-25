import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: true,
  exportAs: 'hl'
})
export class HighlightedDirective {

  @Input('highlighted')
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  constructor() { 
    console.log("Directive created...");
  }

  @HostBinding('class.highlighted')
  public get cssClasses(): boolean{
    return this.isHighlighted;
  }

  //@HostBinding('attr.disabled')
  //public get disabled(): string{
  //  return "true";
  //}

  //$event is a injectable
  @HostListener('mouseover', ['$event'])
  public mouseOver(): void{

    //console.log('$event')

    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  public mouveLeave(): void {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  public toggle(){
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
