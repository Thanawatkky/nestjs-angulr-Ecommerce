import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import Swal from 'sweetalert2';
import { PrimeNGConfig } from 'primeng/api';
import { withDebugTracing } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CalendarModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

title = "Sign In";
  constructor(
    private http: HttpClient,
    private primengConfig: PrimeNGConfig
    ){}
    signIn(val: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    
      this.http.post("/api/signIn", val).subscribe({
        next(data: any) {

            console.log(data.status);
            if (data.status) {
              Toast.fire({
                icon: data.type,
                title: data.msg
              }).then(() => {
               if(data.role === 1) {
                window.location.href="/admin";
               }if(data.role === 2) {
                window.location.href="/user";
               }
              });
            } else {
              // Handle non-success responses (e.g., validation errors)
              Toast.fire({
                icon: 'error',
                title: data.msg || 'Login failed.'
              }).then(() => {
                window.location.reload();
              });
            }

        },
        error(err) {
          if (err.status === 401) {
            const errorMessage = err.error?.msg || 'Unauthorized Login.';
            Toast.fire({
              icon: 'error',
              title: errorMessage
            }).then(() => {
              window.location.reload();
            });;
          } else {
            // Handle other errors (network issues, unexpected server responses)
            console.error('Error during sign-in:', err);
            Toast.fire({
              icon: 'error',
              title: 'Login Error!',
              text: 'An unexpected error occurred. Please try again later.'
            });
          }
        },
      });
      
    }
    
  ngOnInit() {
    this.primengConfig.ripple = true;
}
  
}
