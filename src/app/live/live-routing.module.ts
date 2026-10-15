import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveComponent } from './live/live.component';
import { CourseComponent } from './course/course.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
    path: '',
    component: LiveComponent
  },
    {
    path: 'courses',
    component: CourseComponent
  },
    {
    path: 'courses/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRoutingModule { }
