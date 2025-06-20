import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../Model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentToEdit!: Student ;
  private isEdit = new BehaviorSubject<boolean>(false);
  data$ = this.isEdit.asObservable();
  private baseUrl = '/api'

  constructor(private http: HttpClient) { }

  setStudent(student: Student) {
    this.studentToEdit = student;
  }

  getStudent(): Student | null {
    return this.studentToEdit;
  }

  setIsEdit(value: boolean){
    this.isEdit.next(value);
  }

  getAllStudent(): Observable<any>{
    return this.http.get(`${this.baseUrl}/Student`);
  }

  addStudent(data: Student): Observable<any>{
    return this.http.post(`${this.baseUrl}/Student`, data);
  }

  updateStudent(data: Student): Observable<any>{
    return this.http.put(`${this.baseUrl}/Student`, data);
  }
}
