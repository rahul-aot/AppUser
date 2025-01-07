import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenExpired$ : Subject<boolean> = new Subject<boolean>();
  tokenRecived$ : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }



}
