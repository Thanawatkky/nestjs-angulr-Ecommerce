import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  {

  dataCategory: any = [];
  constructor(private http: HttpClient) {
    this.http.get<any>("/api/category").subscribe((res) => {
      this.dataCategory = res;
    });
  }
  title: string = "หมวดหมู่สินค้า";
  isOpen: boolean[] = Array(this.dataCategory.length).fill(false); 
  OpenDropdonw(id: number){
    this.isOpen[id] = !this.isOpen[id]
  }
  del(id: number) {
    Swal.fire({
      text: "ต้องการลบหมวดหมู่สินค้านี้ใช่ไหม?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่!",
      cancelButtonText: "ไม่ใช่!"
    }).then((result) => {
      if (result.isConfirmed) {
       this.http.delete("/api/category/"+id).subscribe((res: any) => {
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
    });
  }

}
 
