import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';
import { Student } from '../../Model/Student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit{
  studentForm!: FormGroup;
  courses = [
    { code: 'IT', name: 'Information Technology' },
    { code: 'SE', name: 'Software Engineering' },
    { code: 'CSN', name: 'Computer Systems and Networking' },
    { code: 'IS', name: 'Information Systems' }
  ];
  isEdit: boolean = false;
  student: Student | null = null;
  submitBtnValue: string ='';
  
  constructor(private fb: FormBuilder, private studentService: StudentService, private router:Router){}
  ngOnInit(): void {
    this.studentService.data$.subscribe(data =>{
      this.isEdit = data;
    })
    this.isEdit ? this.submitBtnValue = 'Update Student' : this.submitBtnValue = 'Add Student';
    this.createForm();
    this.student = this.studentService.getStudent();
    if(this.isEdit){
      this.loadInitialData();
    }
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
      if(this.isEdit){
        this.studentService.updateStudent(this.studentForm.value).subscribe({
        next: (res: any) =>{
          alert("Student Update Successfully!");
          this.router.navigate(['/student-view']);
        }
      })
      }else{
        this.studentService.addStudent(this.studentForm.value).subscribe({
          next: (res: any) =>{
            alert("Student add Success fully!");
            this.router.navigate(['/student-view']);
          }
        })
      }
    }
  }
}
