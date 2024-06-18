import { Component } from '@angular/core';
import { UserNavbarComponent } from '../../components/user-navbar/user-navbar.component';
import { RouterOutlet } from '@angular/router';
import { Footer } from 'primeng/api';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserNavbarComponent, RouterOutlet, FooterComponent ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
