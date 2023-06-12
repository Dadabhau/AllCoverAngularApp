import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private route: Router) {}
  isLoginMode = true;
  isLoading = false;
  error: string;
  errorShow = false;

  onSubmit(form: any) {
    console.log(form.value);
    this.isLoading = true;
    this.authService.signUp(form.value).subscribe(
      (response: any) => {
        if (response) {
          console.log('Login Successfully');
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          this.route.navigate(['/home']);
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.error = error;
        console.log(this.error);
      }
    );
  }
}
