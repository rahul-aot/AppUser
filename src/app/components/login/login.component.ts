import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginObj: any = {
    username: '',
    password: ''
  }

  apiLoginObj: any = {
    EmailId: '',
    Password: ''
  }

  router = inject(Router)

  http = inject(HttpClient)

  onSubmit() {
    // if( this.loginObj.username == 'admin' && this.loginObj.password == 'admin') {
    //   this.router.navigate(['/home'])
    // }
    // console.log(this.loginObj);
    
    this.http.post('https://projectapi.gerasim.in/api/UserApp/login', this.apiLoginObj).subscribe((response: any) => {
      localStorage.setItem('Angular19user', response.data.token);
      this.router.navigate(['/home'])
    },Error => {
      alert("We are not allowed to login");
    })
  }
}
