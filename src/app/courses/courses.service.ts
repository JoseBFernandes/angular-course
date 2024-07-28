import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

let counter = 0;

//providedIn can be comented because in app.component.ts and course-card the service is instantiate/injected in providers
@Injectable({
  providedIn: 'root'
  //useClass: CoursesService 
  //Can use the top or bot, equal to what we have
  //useFactory: (http: HttpClient) => new CoursesService(http),
  //deps: [HttpClient]
})

export class CoursesService {

  id:number

  constructor(private http: HttpClient) {
    counter++;

    this.id = counter;
    //console.log("create CoursesService " + counter);
   }

  public loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pagedSize", "10");

    return this.http.get<Course[]>('/api/courses', {params})
  }

  public saveCourse(course:Course){
    const headers = new HttpHeaders()
    .set("X-Auth", "userId");

    return this.http.put(`/api/courses/${course.id}`, course, {headers});
  }
}
