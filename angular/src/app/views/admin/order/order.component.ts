import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),

  ]
})
export class OrderComponent implements OnInit {
  data_order: any = [];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
      this.http.get<any>("/api/allorder").subscribe((res)=>{
        this.data_order = res;
        
      })
  }
  isOpen: boolean[] = Array(this.data_order.length).fill(false); 
  OpenDropdonw(id: number){
    this.isOpen[id] = !this.isOpen[id]
  }
  order_status(status: null):any {
    if(status === null) {
      return "รอคำสั่งซื้อ";
  }else if(status === 1) {
      return 'ได้รับคำสั่งซื้อแล้ว'
    }else if(status === 2) {
      return 'กำลังจัดส่ง'
    }else if(status === 3) {
      return 'จัดส่งเสร็จสิ้น'
    }else if (status === 999) {
      return 'คำสั่งซื้อถูกยกเลิก';
    }
  }
  orderUpdate(id: number) {
  this.http.patch("/api/confirmOrder/"+id,[]).subscribe(() => {
    window.location.reload();
  })  
  }
  order_send(id: number) {
    this.http.patch('/api/orderSending/'+id,[]).subscribe(() => {
      window.location.reload();
    })
  }
  order_complete(id: number) {
    this.http.patch('/api/orderComplete/'+id,[]).subscribe(() => {
      window.location.reload();
    })
  }
  order_cancel(id: number) {
    this.http.patch('/api/orderCancel/'+id,[]).subscribe(() => {
      window.location.reload();
    })
  }
  
}
