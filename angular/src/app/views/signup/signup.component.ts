import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private http: HttpClient){}
  getValues(val:any){
    this.http.post('/api/signup',val).subscribe(function(data:any) {
        
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
        if(data.status) {
          Toast.fire({
            icon: data.type,
            title: data.msg
          }).then(()=>{
            window.location.replace('/signIn');
          });
        }else{
          Toast.fire({
            icon: data.type,
            title: data.msg
          });
        }
    });
  }
}
