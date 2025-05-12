import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: true,
  imports: [CommonModule],
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  htmlElement: HTMLElement = document.documentElement;

  ngOnInit() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    this.htmlElement.classList.add("dark"); // ← remplace 'dark-mode' par 'dark'
    localStorage.setItem("theme", "dark");
    this.isDarkMode = true;
  }

  disableDarkMode() {
    this.htmlElement.classList.remove("dark"); // ← remplace 'dark-mode' par 'dark'
    localStorage.setItem("theme", "light");
    this.isDarkMode = false;
  }

  toggleTheme() {
    this.isDarkMode ? this.disableDarkMode() : this.enableDarkMode();
  }
}