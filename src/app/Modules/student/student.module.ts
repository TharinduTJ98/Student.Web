import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentViewComponent } from './Components/student-view/student-view.component';
import { StudentAddComponent } from './Components/student-add/student-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentEditComponent } from './Components/student-edit/student-edit.component';


@NgModule({
  declarations: [
    StudentViewComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
