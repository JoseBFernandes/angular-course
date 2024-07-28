import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-title',
  standalone: true,
  imports: [],
  templateUrl: './course-title.component.html',
  styleUrl: './course-title.component.css'
})
export class CourseTitleComponent implements OnInit{

  @Input()
  title: string

  public constructor() {
    
  }

  public ngOnInit(): void {

  }

}
