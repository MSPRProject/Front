import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Sanalyz_front";
  constructor(private themeService: ThemeService) {
    this.themeService.initializeTheme();
  }
}
