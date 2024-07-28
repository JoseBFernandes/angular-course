import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import { Course } from 'src/app/model/course';
//import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../courses.service';
import { NgIf } from '@angular/common';
//import { COURSES_SERVICE } from '../app.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'], 
    imports:[
        NgIf
    ],
    standalone: true
    //changeDetection: ChangeDetectionStrategy.OnPush
    //providers: [
    //    CoursesService
    //]
})
export class CourseCardComponent implements OnInit , OnDestroy, OnChanges, AfterContentChecked, AfterViewChecked, AfterContentInit, AfterViewInit, DoCheck {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    //"@Inject(COURSES_SERVICE)" IF USED IN "app.component.ts"
    //(course-card could get his CourseService from parente ,app.component, with the @SkipSelf() and didnt needed the providers in @Component)
    constructor(@SkipSelf() private coursesService: CoursesService, @Attribute('type') private type: string) {
        
    }

    /*ORDER:
    -ngOnChanges
    -ngOnInit
    -ngDoCheck
    -ngAfterContentInit
    -ngAfterContentChecked
    -ngAfterViewInit
    -ngAfterViewChecked*/ 

    public ngOnInit(): void {
        //console.log("coursesService course card" + this.coursesService.id);
    }

    //normally to unsubscribe from any observables
    public ngOnDestroy(): void {
       //console.log("ngOnDestroy");
    }

     public ngOnChanges(changes:any): void {
        //console.log("ngOnChanges", changes);
    }

    public ngAfterContentChecked(): void {
        //last opportunity to change something, method needs to be VERY light weight
        //console.log("ngAfterContentChecked");
        //this.course.category = 'BEGINNER'
    }

    public ngAfterViewChecked(): void {
        //its for scroll, changes its hard to work
        //console.log("ngAfterViewChecked");
    }

    public ngAfterViewInit(): void {
        //console.log("ngAfterViewInit");
    }

    public ngAfterContentInit(): void {
        //console.log("ngAfterContentInit");
    }

    //to see if any detect logic changes were made
    public ngDoCheck(): void {
        //console.log("ngDoCheck");
    }

    public onSaveClicked(description:string): void {

        this.courseEmitter.emit({...this.course, description});

    }

    public onTitleChanged(newTitle:string): void{
        this.course.description = newTitle
    }


}
