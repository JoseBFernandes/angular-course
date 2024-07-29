import {Component, computed, effect, EffectRef, signal} from '@angular/core';
import {CourseCardComponent} from './courses/course-card/course-card.component';
import {CourseImageComponent} from './courses/course-image/course-image.component';
import {NgForOf} from '@angular/common';
import {CounterService} from './counter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    NgForOf
  ],
  standalone: true
})
export class AppComponent {

  //signals is a optimal way of a value change without "refreshing" the page (its will affect every method that utilizes this)
  //counter = signal(0);

  multiplier: number = 0;

  effectRef: EffectRef;

  course = signal({
    id:1,
    title: "Angular For Beginners"
  });

  courses = signal([
    "Angular for Beginners",
    "Reactive Angular Course"]
    );

  //defined a derived signal (only read signal when outside of method)
  derivedCounter = computed(() => {

    const counter = this.counterService.counter();
    return counter * 10;

    //const counter = this.counterService.counter();
    //return this.counter * 10;

  });

  //WITH PARAMETER WE INJECTED THE COUNTER OF THE CLASS
  constructor(public counterService: CounterService) {

      //when counter its modify this effect is called 
      //Normaly to do a side effect ona const/variable, without the onCleanup
      //this.effectRef = effect((onCleanup) => {
      //  onCleanup(() => {
      //  })
      //  const counterValue = this.counter();
      //  const derivedCounterValue = this.derivedCounter();

      //  console.log(` counter: ${counterValue} derived counter: ${derivedCounterValue}`);
      //},
      //  {
      //    manualCleanup: true
      //  });

      //this signal is only read, not modify
      //const readOnlySignal = this.counter.asReadonly();
  }

  increment() {
    //this.counter++;
    this.counterService.increment();

    //increment with signal (2 ways)
    //this.counter.set(this.counter() + 1);
    //this.counter.update(val => val +1);

    //this.courses().push("Angular Core Deep Dive");
    //this.course().title="Hello World";
    //Not most correct way! SEE BELOW
    //this.course.set({ id:1, title: "Hello World" });

    //update the array courses, by to courses adding "Angular Core Deep Dive"s
    //this.courses.update(courses => [...courses, "Angular Core Deep Dive"])

  }

  incrementMultiplier() {
    this.multiplier++;
  }

  onCleanup(){
    this.effectRef.destroy();
  }

}
