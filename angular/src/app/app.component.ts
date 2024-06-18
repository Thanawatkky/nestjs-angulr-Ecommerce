import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './views/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { User } from './model/user';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule,NgForOf],
  templateUrl: "./app.component.html",
  styleUrl: './app.component.css'
})

export class AppComponent {

  ngOnInit(){

  } 
  title = 'frontend';

  
}
