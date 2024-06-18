import { NgIf, NgOptimizedImage } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  category:any = [];
    data: any = [];
    productId:any
    title:string = "แก้ไขข้อมูลสินค้า"
    constructor(
      private route: ActivatedRoute,
      private http: HttpClient
      
      ){}
    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.http.get<any>("/api/productOne/"+this.productId).subscribe((res: any) => {
          this.data = res;
        })
        this.http.get<any>("/api/category").subscribe((response)=> {
          this.category = response
        })

        
    }
    selectedFile: any

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
    
    editProduct(value: any) {
      const formData = new FormData();
      formData.append('pro_img', this.selectedFile); // Append the file to FormData
    
      // Loop through the keys of the value object
      Object.keys(value).forEach(key => {
        formData.append(key, value[key]);
      });

      
      // Perform the patch request
      this.http.patch("/api/product/" + this.productId, formData).subscribe((res: any) => {
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
        if (res.status) {
          Toast.fire({
            icon: res.type,
            title: res.msg
          }).then(() => {
            window.location.href = "/admin/manageProduct";
          });
        } else {
          Toast.fire({
            icon: res.type,
            title: res.msg
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
    
  }

