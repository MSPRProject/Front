import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
