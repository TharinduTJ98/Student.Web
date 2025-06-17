import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { Student } from '../../Model/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit{
  students: Student[] = [];

  constructor(private studentService: StudentService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllStudentData()
  }

  getAllStudentData(): void{
    this.studentService.getAllStudent().subscribe(
      (res:any) => {
        this.students = res;
      }
    )
  }

  editStudent(student: Student) {
    this.studentService.setStudent(student);
    this.router.navigate(['/student-edit']);
  }
}
