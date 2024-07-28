import {Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output} from '@angular/core';
import { CoursesService } from '../courses.service';

@Directive({
    selector: '[highlighted]',
    exportAs: 'hl',
    standalone: true
})
export class HighlightedDirective {

    @Input('highlighted')
    isHighlighted = false;

    @Output()
    toggleHighlight = new EventEmitter();

    //If @Host() is used, that means getting the courseService from course-card, and that why we have the providers in course-card, RARELY NEEDED
    //(course-card could get his CourseService from parente ,app.component, with the @skipself())
    constructor( private coursesService: CoursesService) {

        console.log('coursesService highlighted ' + coursesService.id);

    }

    @HostBinding('class.highlighted')
    get cssClasses() {
        return this.isHighlighted;
    }

    @HostListener('mouseover', ['$event'])
    mouseOver($event: string) {

        console.log($event);

        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }



}
