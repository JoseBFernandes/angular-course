import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit{

  @Input()
  course: Course;

  ngOnInit() {
  }

  onCourseViewed(){
    console.log("card component")
  }

}
