import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  router = inject(Router)

  userService = inject(UserService);

  http = inject(HttpClient)

  constructor(){
    debugger
    this.userService.tokenExpired$.subscribe((res: boolean) => {
      if(res) {
        const loggedData = JSON.parse(localStorage.getItem('Angular19user')!);
        const obj ={
          "emailId": loggedData.emailId,
          "token": loggedData.token,
          "refreshToken": loggedData.refreshToken,
        }
        debugger
        this.http.post('https://projectapi.gerasim.in/api/UserApp/login',obj).subscribe((response: any) => {
          localStorage.setItem('Angular19user',JSON.stringify(response.data));
          localStorage.setItem('angular19token',response.data.token);
          this.userService.tokenRecived$.next(true);
        })
      }
    })
  }



  onLogout(){
    console.log('logout');
    localStorage.removeItem('Angular19user');
    this.router.navigateByUrl("login");
  }
}


