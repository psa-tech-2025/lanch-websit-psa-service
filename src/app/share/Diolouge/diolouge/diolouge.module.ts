import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiolougeCompComponent } from './diolouge-comp/diolouge-comp.component';
import { InsertionDirective } from './insertion.directive';



@NgModule({
  declarations: [
    DiolougeCompComponent,
    InsertionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
     DiolougeCompComponent
  ]
})
export class DiolougeModule { }
