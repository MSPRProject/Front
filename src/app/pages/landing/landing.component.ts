import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
