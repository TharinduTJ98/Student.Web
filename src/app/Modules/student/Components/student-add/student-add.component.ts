import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, private studentService: StudentService, private router:Router){}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.studentForm = this.fb.group({
      FirstName:['', Validators.required],
      LastName:['', Validators.required],
      Email:['', Validators.required],
      Phone:['', Validators.required],
      Course:['', Validators.required],
    });
  }

  onSubmit(): void{
    if(this.studentForm.valid){
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: (res: any) =>{
          alert("Student add Success fully!");
          this.router.navigate(['/student-view']);
        }
      })
    }
  }
}
