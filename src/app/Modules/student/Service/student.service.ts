import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentToEdit!: Student ;

  constructor(private http: HttpClient) { }

  setStudent(student: Student) {
    this.studentToEdit = student;
  }

  getStudent(): Student | null {
    return this.studentToEdit;
  }

  getAllStudent(): Observable<any>{
    return this.http.get('https://localhost:7088/api/Student');
  }

  addStudent(data: Student): Observable<any>{
    return this.http.post('https://localhost:7088/api/Student', data);
  }

  updateStudent(data: Student): Observable<any>{
    return this.http.put('https://localhost:7088/api/Student', data);
  }
}
