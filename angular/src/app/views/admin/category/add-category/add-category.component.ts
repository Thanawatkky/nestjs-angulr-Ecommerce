import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private http: HttpClient) {}
  title:string = "เพิ่มหมวดหมู่สินค้า";
  addCategory(value: any) {
    this.http.post("/api/addCategory",value).subscribe((res: any) => {
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
          window.location.reload();
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
}
