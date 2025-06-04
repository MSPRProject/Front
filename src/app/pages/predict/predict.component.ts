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
      this.apiService.getAllPandemics().subscribe({
        next: (pandemics) => {
          this.pandemics = pandemics;
          if (this.pandemics.length > 0) {
            this.pandemicId = this.pandemics[0].id;
          }
        },

        error: (err) => {
          console.error("Erreur lors de la récupération des pandémies :", err);
          alert(
            "Une erreur est survenue lors de la récupération des pandémies. Merci de contacter le support.",
          );
        },
      }),
    );

    this.$subscriptions.push(
      this.apiService.getAllCountries().subscribe({
        next: (countries) => {
          this.countries = countries;
          if (this.countries.length > 0) {
            this.countryId = this.countries[0].id;
          }
        },

        error: (err) => {
          console.error("Erreur lors de la récupération des pays :", err);
          alert(
            "Une erreur est survenue lors de la récupération des pays. Merci de contacter le support.",
          );
        },
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
    if (this.countryId && this.pandemicId && this.selectedDate) {
      // Appel à l'API IA
      this.$subscriptions.push(
        this.apiService
          .predict(this.countryId, this.pandemicId, this.selectedDate)
          .subscribe({
            next: (result) => {
              // L'API IA retourne déjà { new_cases, new_deaths }
              this.prediction = result;
            },
            error: (err) => {
              this.prediction = null;
              console.error("Erreur lors de la prédiction d'un rapport: ", err);
              alert(
                "Une erreur est survenue pendant la génération du rapport. Merci de contacter le support.",
              );
            },
          }),
      );
    } else {
      this.prediction = null;
    }
  }
}
