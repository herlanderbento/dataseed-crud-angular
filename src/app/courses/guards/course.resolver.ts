import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver {
  constructor(private service: CoursesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    if (route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: '', name: '', category: '', lessons: [] });
  }
}
