import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    provideImageKitLoader("https://nekogedgets.s3.ap-southeast-2.amazonaws.com/"),
  ]
})
export class UserDashboardComponent {
  product: any = [];
  constructor(private http: HttpClient) {
    this.http.get<any>("/api/product/").subscribe((res) => {
      this.product = res;
    });
  }
  
  public sum_sale(price: number, sale: number) {
    const sum = price- ((price * sale)/100);
    const result = sum.toFixed(0);
    return result;
  }
}
