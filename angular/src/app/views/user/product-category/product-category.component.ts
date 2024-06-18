import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class ProductCategoryComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  product: any = [];
  data: any = [];
  product_cate: any = [];
  category: any
  ngOnInit(): void {
      this.category = this.route.snapshot.paramMap.get('id');
      if(this.category) {
        this.http.get<any>('/api/productCategory/'+this.category).subscribe((res) => {
          this.product = res;
        });
      }
      if(!this.category) {
        this.http.get<any>('/api/category').subscribe((res) => {
          this.data = res;
          console.log(this.data);
          
        });
      }
      if(!this.category) {
        this.http.get<any>('/api/product').subscribe((res) => {

            this.product_cate = res;
            console.log(this.product_cate);
            
        })
      }
      
  }
  sum_sale(price: number, sale: number) {
    const sum = price- ((price * sale)/100);
    const result = sum.toFixed(0);
    return result;
  }

  GotoDetail(id: number) {
    window.location.href="/user/product_details/"+id;
  }
  getProductsByCategory(categoryId: number): any[] {
    return this.product_cate.filter((product: { category: { id: number; }; }) => product.category.id === categoryId);
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
