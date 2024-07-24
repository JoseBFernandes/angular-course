import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{

  courses = COURSES;

  startDate = new Date(2000, 0 , 1); //1 janeiro de 2000
  title = COURSES[0].description;
  price = 9.9944;
  rate = 0.64;

  public constructor() {
    //console.log("containerDiv", this.card1);
  }
  
  //in contructor will not generate the log but with afterViewInit it will because its produced while the page is builded
  public ngAfterViewInit(): void {
    //console.log("containerDiv", this.card1);

    //it will not be possible to see the log below because its ristrict to the templete of the commponent it self, cannot query inside child or parents components
    //console.log("courseImage", this.courseImage);

    //this.cards.changes.subscribe(
    //  cards => console.log(cards)
    //);
    
    //console.log(this.cards);
    
  }

  //@ViewChild (CourseCardComponent)
  //card:CourseCardComponent;

  @ViewChildren(CourseCardComponent, {read: ElementRef})
  cards: QueryList<ElementRef>;

  @ViewChild('courseImage')
  courseImage: ElementRef;

  //if i whant to specify what card do i need to inspect
  @ViewChild('cardRef1', {read: ElementRef})
  card1: ElementRef;
  
  public onCourseSelected(course:Course): void{
    //console.log(this.card);
    //console.log("containerDiv", this.card1);
  }

  //can be used insted of track course.id -- track trackCourse in HTML 
  public trackCourse(index:number, course:Course){
    return course.id;
  }

  onCoursesEdited() {
    this.courses.push(
      {
        id: 1,
        description: "Angular core deep dive",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
        longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
        category: 'INTERMEDIATE',
        lessonsCount: 10
    }
    );
    }
}
