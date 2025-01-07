import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  http = inject(HttpClient)
  userService = inject(UserService)

  constructor() {
    this.userService.tokenRecived$.subscribe((res: boolean) => {
      if(res) {
        this.getUsers();
      }
    })
   }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.http.get('https://projectapi.gerasim.in/api/UserApp/GetAllUsers').subscribe((res: any)=>{
      console.log(res.data);
    })
  }
}
