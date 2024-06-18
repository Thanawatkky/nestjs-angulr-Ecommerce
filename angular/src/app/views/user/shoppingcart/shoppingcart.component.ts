import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class ShoppingcartComponent implements OnInit {
  items:any = [];
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;
   constructor(
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.http.get<any[]>("/api/cart").subscribe((res) => {
      this.items = res;
      for (let item of this.items) {
        this.subtotal += item.ca_product.pro_price  * item.ca_qty;
        this.discount += item.ca_product.pro_sale;
        this.total += (item.ca_product.pro_price - (item.ca_product.pro_price * (item.ca_product.pro_sale / 100))) * item.ca_qty;
    } 
    });
  }
  removeQty(id: any) {
    this.http.patch("/api/cart", { id: id }).subscribe((res: any) => {
      if(res.status) {
        window.location.reload();
      }else{ 
        console.log(res);
        
      }
      
    });
  }
 addQty(id: any) {
    this.http.patch("/api/addQty", { id: id }).subscribe((res: any) => {
      if(res.status) {
        window.location.reload();
      }else{
        console.log(res);
        
      }
      
    });
  }
 sum_sale(price: number, sale: number) {
    const sum = price- ((price * sale)/100);
    const result = sum.toFixed(0);
    return result;

  }
  removeCart(id: number) {
    this.http.delete("/api/cart/"+id).subscribe((res: any) =>{
      if(res.status) {
        window.location.reload();
      }else{
        console.log(res);
        
      }
    })
  }

  confirmOrder(total: number) {
    this.http.post("/api/order",{ total_price: total}).subscribe((res: any) => {
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
          window.location.href="/user";
        });
      }else{
        console.log(res);
        
      }
    });
  }

  
}
