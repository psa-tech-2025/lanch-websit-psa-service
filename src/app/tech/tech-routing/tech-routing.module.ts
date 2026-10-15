  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  import { PsaTechComponent } from '../psa-tech/psa-tech.component';
  import { ProductComponent } from '../product/product.component';
  import { ProductDetailsComponent } from '../product-details/product-details.component';
  import { PsaCourseComponent } from '../psa-course/psa-course.component';
  import { CourseDetailsComponent } from '../course-details/course-details.component';
  import { PsaJobComponent } from '../psa-job/psa-job.component';
  import { JobDetailsComponent } from '../job-details/job-details.component';

  const routes: Routes = [
    {
      path: '',
      component: PsaTechComponent
    },
    {
      path: 'product',
      component: ProductComponent
    },
    {
      path: 'product/:id',
      component: ProductDetailsComponent
    },
    {
      path: 'courses',
      component: PsaCourseComponent
    },
    {
      path: 'courses/:id',
      component: CourseDetailsComponent
    },
    {
      path: 'jobs',
      component: PsaJobComponent
    },
    {
      path: 'jobs/:id',
      component: JobDetailsComponent
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class TechRoutingModule {}