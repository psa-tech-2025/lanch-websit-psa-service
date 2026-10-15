import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live/live.component';
import { CourseComponent } from './course/course.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MyCommonModule } from '../common/common.module';
import { TechRoutingModule } from '../tech/tech-routing/tech-routing.module';


@NgModule({
  declarations: [
    LiveComponent,
    CourseComponent,
    DetailsComponent
  ],
  imports: [
  CommonModule,
  FormsModule,
  LiveRoutingModule,
  TranslateModule,
  MyCommonModule
  ]
})
export class LiveModule { }
