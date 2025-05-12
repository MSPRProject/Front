<<<<<<< Updated upstream
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
=======
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
>>>>>>> Stashed changes

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterOutlet],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() themeChanged = new EventEmitter<boolean>();
  isDarkMode = false;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem('theme', 'dark');
    this.isDarkMode = true;
    this.themeChanged.emit(this.isDarkMode);
  }

  disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem('theme', 'light');
    this.isDarkMode = false;
    this.themeChanged.emit(this.isDarkMode);
  }

  toggleTheme() {
    this.isDarkMode ? this.disableDarkMode() : this.enableDarkMode();
  }
}
