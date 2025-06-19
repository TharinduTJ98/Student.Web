import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { Student } from '../../Model/Student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit{
  courses = [
    { code: 'IT', name: 'Information Technology' },
    { code: 'SE', name: 'Software Engineering' },
    { code: 'CSN', name: 'Computer Systems and Networking' },
    { code: 'IS', name: 'Information Systems' }
  ];
  student: Student | null = null;
  studentForm!: FormGroup;
  constructor(private studentService: StudentService, private fb: FormBuilder, private router: Router){}
  ngOnInit(): void {
    this.createForm();
    this.student = this.studentService.getStudent();
    this.loadInitialData();
  }

  createForm(): void{
      this.studentForm = this.fb.group({
        StudentId:[''],
        FirstName:['', Validators.required],
        LastName:['', Validators.required],
        Email:['', [Validators.required, Validators.email]],
        Phone:['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        Course:['', Validators.required],
      });
    }

  loadInitialData(): void {
    if (this.student) {
      this.studentForm.get('StudentId')?.setValue(this.student.id);
      this.studentForm.get('FirstName')?.setValue(this.student.firstName);
      this.studentForm.get('LastName')?.setValue(this.student.lastName);
      this.studentForm.get('Email')?.setValue(this.student.email);
      this.studentForm.get('Phone')?.setValue(this.student.phone);
      this.studentForm.get('Course')?.setValue(this.student.currentCourse);
    }
  }

  onSubmit(): void{
    if(this.studentForm.valid){
      console.log("asdsad", this.studentForm.value)
      this.studentService.updateStudent(this.studentForm.value).subscribe({
        next: (res: any) =>{
          alert("Student Update Successfully!");
          this.router.navigate(['/student-view']);
        }
      }
      )
    }
  }

}
