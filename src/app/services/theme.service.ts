import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false); // Initial state : light mode
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  setDarkMode(isDark: boolean) {
    this.isDarkModeSubject.next(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }
}
