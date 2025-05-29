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

    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  predict() {
    console.log("Predict called");
    if (this.countryId && this.pandemicId && this.selectedDate) {
      console.log("Predict called 2");
      // Récupérer les objets sélectionnés
      const country = this.countries.find((c) => c.id === this.countryId);
      const pandemic = this.pandemics.find((p) => p.id === this.pandemicId);
      if (!country || !pandemic) {
        this.prediction = null;
        return;
      }
      // Construction du body attendu par l'API IA
      const predictData: any = {
        pandemic_name: pandemic.name,
        pandemic_pathogen: pandemic.pathogen || "",
        country_iso3: country.iso3,
        continent: country.continent,
        reports: [], // À remplir si tu veux l'historique, sinon vide
        target: {
          date: this.selectedDate.toISOString().split("T")[0],
        },
      };
      // Appel à l'API IA
      this.apiService.postPredict(predictData).subscribe({
        next: (result) => {
          // L'API IA retourne déjà { new_cases, new_deaths }
          this.prediction = result;
        },
        error: (err) => {
          this.prediction = null;
        },
      });
    } else {
      this.prediction = null;
    }
  }
}
