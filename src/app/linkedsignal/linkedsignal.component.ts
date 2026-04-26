import {
  Component,
  computed,
  effect,
  linkedSignal,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-linkedsignal',
  imports: [],
  templateUrl: './linkedsignal.component.html',
  styleUrl: './linkedsignal.component.css',
})
export class LinkedsignalComponent {
  title = 'Training Angular 19';

  courses = [
    {
      code: 'BEGINNERS',
      title: 'Angular for Beginners',
      defaultQuantity: 10,
    },
    {
      code: 'SIGNALS',
      title: 'Angular for Advanced',
      defaultQuantity: 20,
    },
    {
      code: 'SSR',
      title: 'Angular SSR',
      defaultQuantity: 30,
    },
  ];

  selectedCourse = signal<string | null>('BEGINNER');
  quantity = linkedSignal({
    source: () => ({ courseCode: this.selectedCourse }),
    computation: (source, previous) => {
      console.log('Computing quantity for course', source.courseCode());
      console.log('Previous quantity was', previous);
      const course = this.courses.find((c) => c.code === source.courseCode());
      return course?.defaultQuantity ?? 1;
    },
  });

  constructor() {}

  onArticleAdded() {
    alert(
      `Course ${this.selectedCourse()} with quantity ${this.quantity()} added to cart!`,
    );
  }

  reset() {
    this.selectedCourse.set(null);
  }
}
