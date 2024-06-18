import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  id: any
  data: any = [];
  constructor(private http: HttpClient,
    private route: ActivatedRoute
  ) {
   this.id = this.route.snapshot.paramMap.get('id');
   this.http.get<any>("/api/category/"+this.id).subscribe((res) => {
    this.data = res;
  });
  }

  editCategory(value: any) {  
    this.http.patch("/api/category/"+this.id,value).subscribe((res: any) => {
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
      if(res.status){
        Toast.fire({
          icon: res.type,
          title: res.msg
        }).then(()=>{
          window.location.href="/admin/category";
        });
      }else{
        Toast.fire({
          icon: res.type,
          title: res.msg
        }).then(() => {
          window.location.reload();
        }) ;
      }
    });
  }
  title = "แก้ไขหมวดหมู่สินค้า";

}
