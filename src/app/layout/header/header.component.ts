import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

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

  localeIcon = "/images/flag-en.png";

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
  ) {
    this.translate.addLangs(["en", "fr"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

  ngOnInit() {
    this.subscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark),
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

  toggleLocale() {
    const langs = this.translate.getLangs().sort();
    let currentIndex = langs.findIndex(
      (lang) => lang === this.translate.currentLang,
    );
    let nextIndex = (currentIndex + 1) % langs.length;

    this.translate.use(langs[nextIndex]);
    this.localeIcon = `/images/flag-${langs[nextIndex]}.png`;
  }
}
