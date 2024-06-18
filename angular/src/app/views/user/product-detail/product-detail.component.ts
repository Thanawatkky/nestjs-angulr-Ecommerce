import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css', 
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class ProductDetailComponent implements OnInit {
  data: any = [];
  pro_id: any;
  constructor(
    private http: HttpClient,
    private url: ActivatedRoute
  ) {}
  ngOnInit(): void {
      this.pro_id = this.url.snapshot.paramMap.get('id');
      this.http.get<any>("/api/productOne/"+this.pro_id).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        
      })
  }
   sum_sale(price: number, sale: number) {
    const sum = price- ((price * sale)/100);
    const result = sum.toFixed(0);
    return result;
  }

  add_cart(id: number) {
    this.http.post("/api/cart",{pro_id: id}).subscribe((res: any) => {
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
      if(res.status) {
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
        });
      }
    });
  }
}
