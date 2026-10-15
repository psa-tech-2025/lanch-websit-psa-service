import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TechRoutingModule } from './tech-routing/tech-routing.module';

import { PsaTechComponent } from './psa-tech/psa-tech.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PsaCourseComponent } from './psa-course/psa-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { PsaJobComponent } from './psa-job/psa-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { MyCommonModule } from '../common/common.module';
import { LiveRoutingModule } from '../live/live-routing.module';
@NgModule({
  declarations: [
    PsaTechComponent,
    ProductComponent,
    ProductDetailsComponent,
    PsaCourseComponent,
    CourseDetailsComponent,
    PsaJobComponent,
    JobDetailsComponent
  ],

  imports: [
    CommonModule,
  FormsModule,
 TechRoutingModule,
  TranslateModule,
  MyCommonModule

  ]
})
export class TechModule {}