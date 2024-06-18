import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  category: any = [];
  title = "เพิ่มรายการสินค้า"
  constructor(private http: HttpClient) {
    this.http.get<any>("/api/category").subscribe((data) => {
      this.category = data;
    });
  }
  selectedFile: any

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}
  addProduct(value: any) {
    const formData = new FormData();
    formData.append('pro_img', this.selectedFile);
      for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      formData.append(key, value[key]);
    }
  }
    this.http.post("/api/AddProduct",formData).subscribe((response: any) => {
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
      if(response.status){
        Toast.fire({
          icon: response.type,
          title: response.msg
        }).then(()=>{
          window.location.replace('/admin/manageProduct');
        });
      }else{
        Toast.fire({
          icon: response.type,
          title: response.msg
        });
      }
    });
  }
}
