import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: true,
  imports: [CommonModule],
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  htmlElement: HTMLElement = document.documentElement;
  private subscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.subscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}