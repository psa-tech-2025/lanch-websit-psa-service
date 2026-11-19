import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PopupComponent } from './component/popup/popup.component';
import { DropdownPipelineComponent } from './drop-pipe/dropdown-pipeline/dropdown-pipeline.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FormErrorDirective } from './directive/form-error.directive';

import { ClientdetailsComponent } from
  '../client-details/clientdetails/clientdetails.component';
import { ExcelManagerComponent } from './excel-manager/excel-manager.component';
import { GrampanchayatContactComponent } from './grampanchayat-contact/grampanchayat-contact.component';

@NgModule({
  declarations: [
    PopupComponent,
    DropdownPipelineComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    FormErrorDirective,
    ClientdetailsComponent,
    ExcelManagerComponent,
    GrampanchayatContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

  ],
  exports: [
    PopupComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    FormErrorDirective,
    ClientdetailsComponent,
    RouterModule,
    TranslateModule,
    ExcelManagerComponent
  ]
})
export class MyCommonModule {}