import { NgOptimizedImage, provideImageKitLoader, provideImgixLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,HttpClientModule, NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class ProductComponent {
  dataProduct: any = [];
  category: any = [];
  
  constructor(private http: HttpClient) {
    this.http.get<any>("/api/Product").subscribe((res: any) => {
      this.dataProduct = res;
    });
  }
  add_page(){
    window.location.href="/admin/addProduct"
  }
  isOpen: boolean[] = Array(this.dataProduct.length).fill(false); 
  OpenDropdonw(id: number){
    this.isOpen[id] = !this.isOpen[id]
  }
  EditProduct(id: number) {
    window.location.href="/admin/editProduct/"+ id;
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
       this.http.delete("/api/product/"+id).subscribe((res: any) => {
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
    });
  }
  title = "จัดการรายการสินค้า";
}
