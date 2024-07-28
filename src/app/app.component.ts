import {AfterViewInit, APP_BOOTSTRAP_LISTENER, ChangeDetectionStrategy, Component, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import {HighlightedDirective} from './courses/directives/highlighted.directive';
import {Observable} from 'rxjs';

//import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';
import { CourseImageComponent } from './courses/course-image/course-image.component';
import { NgFor, NgForOf } from '@angular/common';

//THIS OR the "userClass" and ignore "useClass" AND "deps"
//function coursesServiceProvider(http:HttpClient): CoursesService {
//  return new CoursesService(http);
//}

//THIS OR change "provide"
//export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    NgForOf
  ]
  //changeDetection: ChangeDetectionStrategy.OnPush
  //providers: [CoursesService
    //{provide: COURSES_SERVICE
    //useFactory: coursesServiceProvider, deps:[HttpClient]}
  //]
})

//USE - changeDetection WITH courses$ + "this.courses$ = this.coursesService.loadCourses();" IN NGONINIT AND THE ASYNC PIPE IN HTML
//OR - DONT USE changeDetection AND "courses: Course[];" + "this.coursesService.loadCourses().subscribe(courses => this.courses = courses);" IN NGONINIT AND WITHOUT THE NGIF ASYNC PIPE IN HTML

export class AppComponent implements OnInit {


  //courses$ : Observable<Course[]>;

  courses = COURSES;

  coursesTotal = this.courses.length;

  //courses : any;

  //IF USING COMEMTS AT TOP USE "@Inject(COURSES_SERVICE)"
  constructor(private coursesService: CoursesService, @Inject(CONFIG_TOKEN) private config: AppConfig, private injector: Injector) {
    //console.log("root component " + this.coursesService.id)
  }

  ngOnInit() {

    //this.http.get('/api/courses', {params}).subscribe(
    //  courses => this.courses = courses
    //);

    //fetch the courses from the back-end, and this was passed to the course.service
    //const params = new HttpParams().set("page", "1").set("pagedSize", "10");
    //this.courses$ = this.http.get<Course[]>('/api/courses', {params})

    //this.coursesService.loadCourses().subscribe(courses => this.courses = courses);
    //this.courses$ = this.coursesService.loadCourses();

    const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});
    customElements.define('course-title', htmlElement);
  }

  public save(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('Course Saved!')
    );
  
  }

  //IF "changeDetection: ChangeDetectionStrategy.OnPush" is instatiate in course-card, 
  //IF only using "this.courses[0].description = 'New Value!'"this method will do nothing
  public onEditCourse(){
    //const course = this.courses[0];
    //const newCourse: any = {...course};
    //newCourse.description = 'New Value!';

    //this.courses[0]= newCourse;

    //FOR THE NG_DESTROY
    //this.courses = [undefined];

    //FOR THE NG_CHANGE
    //const course = this.courses[0];
    //const newCourse: any = {...course, description:'ngOnChanges'};
    //this.courses[0] = newCourse;

    this.courses[1].category = 'ADVANCED'
  }

}
