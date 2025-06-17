import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentViewComponent } from './Components/student-view/student-view.component';
import { StudentAddComponent } from './Components/student-add/student-add.component';
import { StudentEditComponent } from './Components/student-edit/student-edit.component';

const routes: Routes = [
  {
    path:'student-view',
    component:StudentViewComponent,
  },
  {
    path:'student-add',
    component:StudentAddComponent
  },
  {
    path:'student-edit',
    component:StudentEditComponent
  },
  {
    path:'**',
    redirectTo:'/student-view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
