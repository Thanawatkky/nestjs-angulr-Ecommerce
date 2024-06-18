import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { throwError, windowWhen } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-all',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './product-all.component.html',
  styleUrl: './product-all.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class ProductAllComponent implements OnInit {
  product:any = [];
  category: any = [];
  page: any = 1;
  activePage:number = 1;
  totalPages: number = 0;
  limit:any = 6;
  pageNumbers: any = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
   
  }

    ngOnInit(): void {
      if(this.route.snapshot.paramMap.get('page')) {
        this.page = this.route.snapshot.paramMap.get('page');
        this.activePage = parseInt(this.page);
      }
      this.http.get<any>("/api/product/"+this.page).subscribe((response) => {
        this.product = response.data;
        this.totalPages = Math.ceil(response.total / this.limit);
        this.pageNumbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
        
              
      })
    }
  GotoDetail(id: number) {
    window.location.href="/user/product_details/"+id;
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
  
previous() {
  const pageInt = parseInt(this.page)
  if(pageInt <= 1) {
    window.location.href="user/All";
  }
  window.location.href="user/All/"+(pageInt - 1);
}
next() {
  const pageInt = parseInt(this.page)
  if(pageInt >= this.totalPages) {
    window.location.href="user/All/"+this.totalPages;

  }
  window.location.href="user/All/"+(pageInt + 1);
}
}
