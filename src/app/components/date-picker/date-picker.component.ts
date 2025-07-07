import { CommonModule } from "@angular/common";
import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "date-picker",
  imports: [FormsModule, CommonModule, TranslatePipe],
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"],
  outputs: ["datepickerValue"],
})
export class DatePicker {
  MONTH_NAMES = [
    "app.month.jan",
    "app.month.feb",
    "app.month.mat",
    "app.month.apr",
    "app.month.may",
    "app.month.jun",
    "app.month.jul",
    "app.month.aug",
    "app.month.sep",
    "app.month.oct",
    "app.month.nov",
    "app.month.dec",
  ];
  DAYS = [
    "app.day.sun",
    "app.day.mon",
    "app.day.tue",
    "app.day.wed",
    "app.day.thu",
    "app.day.fri",
    "app.day.sat",
  ];
  showDatepicker: boolean = false;
  datepickerValue: any = "";
  month: any = "";
  year: any = "";
  no_of_days: any = [];
  blankdays: any = [];

  private translateLocaleToJsLocale: any = {
    fr: "fr-FR",
    en: "en-US",
    de: "de-DE",
    it: "it-IT",
  };

  date = output<Date>();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(["en", "fr", "de", "it"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
    this.translate.onLangChange.subscribe((lang) => {
      this.datepickerValue = new Date(
        this.year,
        this.month,
        new Date().getDate(),
      ).toLocaleDateString(this.translateLocaleToJsLocale[lang.lang], {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    });
  }

  ngOnInit(): void {
    this.initDate();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate(),
    ).toLocaleDateString(
      this.translateLocaleToJsLocale[this.translate.currentLang],
      {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
    this.getNoOfDays();
  }

  isToday(day: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, day);
    return today.toLocaleDateString(
      this.translateLocaleToJsLocale[this.translate.currentLang],
      {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    ) ===
      d.toLocaleDateString(
        this.translateLocaleToJsLocale[this.translate.currentLang],
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      )
      ? true
      : false;
  }

  getDateValue(day: number) {
    let selectedDate = new Date(this.year, this.month, day);
    this.datepickerValue = selectedDate.toLocaleDateString(
      this.translateLocaleToJsLocale[this.translate.currentLang],
      {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
    this.date.emit(selectedDate);
    this.showDatepicker = false;
  }

  getNoOfDays() {
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }
}
