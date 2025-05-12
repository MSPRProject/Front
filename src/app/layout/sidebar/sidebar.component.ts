import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;
  isSidebarClosed: boolean = false;

  toggleSidebar()
  {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  disbleSidebar() 
  {
    this.isSidebarClosed = false; 
  }
}