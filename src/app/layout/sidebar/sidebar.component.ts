import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;
  isSidebarClosed: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(["en", "fr"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  disbleSidebar() {
    this.isSidebarClosed = false;
  }
}
