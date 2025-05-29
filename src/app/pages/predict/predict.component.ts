import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Pandemic } from "../../models/pandemic";
import { Country } from "../../models/country";
import { Subscription } from "rxjs";
import { DatePicker } from "../../components/date-picker/date-picker.component";

@Component({
  selector: "app-predict",
  imports: [FormsModule, CommonModule, DatePicker],
  templateUrl: "./predict.component.html",
  styleUrl: "./predict.component.css",
})
export class PredictComponent {
  apiService: ApiService;

  pandemics: Pandemic[] = [];
  countries: Country[] = [];

  pandemicId?: number;
  countryId?: number;
  selectedDate?: Date;

  prediction: { new_cases: number; new_deaths: number } | null = null;
  $subscriptions: Subscription[] = [];

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.$subscriptions.push(
      this.apiService.getAllPandemics().subscribe((pandemics) => {
        this.pandemics = pandemics;
        if (this.pandemics.length > 0) {
          this.pandemicId = this.pandemics[0].id;
        }
      }),
    );

    this.$subscriptions.push(
      this.apiService.getAllCountries().subscribe((countries) => {
        this.countries = countries;
        if (this.countries.length > 0) {
          this.countryId = this.countries[0].id;
        }
      }),
    );
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  predict() {
    if (this.countryId && this.pandemicId && this.selectedDate) {
      const date = new Date(this.selectedDate);
      this.apiService
        .predict(this.countryId, this.pandemicId, date)
        .subscribe((prediction) => {
          this.prediction = prediction;
        });
    } else {
      this.prediction = null;
    }
  }
}
