import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdIconModule, MdInputModule, MdRadioModule, MdButtonModule, MdProgressBarModule, MdToolbarModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TreeModule } from 'angular2-tree-component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from "@angular/flex-layout";

import { FormRoutes } from './forms.routing';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormTreeComponent } from './form-tree/form-tree.component';
import { EditorComponent } from './editor/editor.component';
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(FormRoutes), MdCardModule,
    MdIconModule, MdInputModule, MdRadioModule, MdButtonModule,
    MdProgressBarModule, MdToolbarModule, FlexLayoutModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCA88p1A_K2Z1K0kRlLck_DHkqLDBRPPLk'}),
    NgxDatatableModule, FormsModule, ReactiveFormsModule, FileUploadModule, TreeModule],
  declarations: [FormUploadComponent, FormValidationComponent,
    FormTreeComponent, EditorComponent],
})

export class FormModule {}
