import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',

})
export class SidebarComponent {
  IsClass = "text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75";
}
