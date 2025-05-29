import { CommonModule } from "@angular/common";
import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "date-picker",
  imports: [FormsModule, CommonModule],
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"],
  outputs: ["datepickerValue"],
})
export class DatePicker {
  MONTH_NAMES = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  DAYS = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  showDatepicker: boolean = false;
  datepickerValue: any = "";
  month: any = "";
  year: any = "";
  no_of_days: any = [];
  blankdays: any = [];

  date = output<Date>();

  constructor() {}

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
    ).toDateString();
    this.getNoOfDays();
  }

  isToday(day: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, day);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(day: number) {
    let selectedDate = new Date(this.year, this.month, day);
    this.datepickerValue = selectedDate.toDateString();
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
