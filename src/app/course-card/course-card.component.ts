import { Component, Input, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ContentChild, ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit{

  @Input()
  course: Course;

  @Input()
  index: number;

  @Input()
  cardIndex: number;

  @Input()
  noImageTpl: TemplateRef<any>;

  @Output('courseSelected')
  courseEmitter: EventEmitter<Course> = new EventEmitter<Course>();

  //query corresponds to what is being dun in app.component.html (parent)
  @ContentChild(CourseImageComponent, {read: ElementRef})
  images:QueryList<ElementRef>;

  constructor() {

  }
  
  public ngAfterViewInit(): void {
    //console.log(this.images);
  }

  ngAfterContentInit(): void {
    //console.log(this.images);
  }

  public ngOnInit():void {
  }

  public onCourseViewed(): void{
    //console.log("card component");

    this.courseEmitter.emit(this.course);
  }

  public isImageVisible(): string {
    return this.course && this.course.iconUrl;
  }

  //see if the course its beginner, if it is, will go for the css class created as 'beginner' if not there is no css associated
  public cardClasses(): Array<string> {
    return this.course.category == 'BEGINNER' ? ['beginner', ''] : [];
  }

  public cardStyle() {
    return {
      'background-image': 'url(' + this.course.iconUrl + ')'
    };
    }
}
