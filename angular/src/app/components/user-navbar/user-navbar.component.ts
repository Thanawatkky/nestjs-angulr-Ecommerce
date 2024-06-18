import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [NgStyle, HttpClientModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements OnInit  {
  items: any = [];
 showCate = false;
 constructor(private http: HttpClient) {}
 ngOnInit(): void {
     this.http.get<any>("/api/category").subscribe((res) => {
        this.items = res;
     });
 }

 onMouseEnter() {
    this.showCate = true;
}

onMouseLeave() {
    this.showCate = false;
}

Logout() {
  Swal.fire({
    title: "คุณต้องการออกจากระบบใช่ไหม?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่!",
    cancelButtonText: "ไม่ใช่!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.get<any>("/api/logout").subscribe((res) => {
        if(res.status) {
          window.location.href="/";
        }else{
          console.log(res);
          
        }
      });
    }
  });
 
}
}
