import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),

  ]
})
export class HistoryComponent implements OnInit {
  dataOrder: any = [];
  countAtiveOrder:number = 0;
  countCompleteOrder:number = 0;
  countCancelOrder:number = 0;
  param: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
        if(this.route.snapshot.paramMap.get("status") === "active") {
          this.param = 1
        }
        if(this.route.snapshot.paramMap.get("status") === "complete") {
          this.param = 3
        }
        
        if(this.route.snapshot.paramMap.get("status") === "canceled") {
          this.param = 9999
        }
        
        
      
      this.http.get<any>('/api/orderUser').subscribe((res) => {
        this.dataOrder = res;
               
      })
      this.http.get<any>('/api/countActive').subscribe((res: number) => {
        this.countAtiveOrder = res;
      } )
      this.http.get<any>('/api/countComplete').subscribe((res:number) => {
        this.countCompleteOrder = res;
      })
      this.http.get<any>('/api/countCancel').subscribe((res:number) => {
        this.countCancelOrder = res;
      })
      
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
    }
  }
}
