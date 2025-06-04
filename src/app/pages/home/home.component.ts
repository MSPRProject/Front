import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartComponent } from "../../components/chart/chart.component";
import { ApiService } from "../../services/api.service";
import { FormsModule } from "@angular/forms";
import { Pandemic } from "../../models/pandemic";
import { Subscription } from "rxjs";
import { Country } from "../../models/country";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-home",
  imports: [CommonModule, ChartComponent, FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  isDarkMode: boolean = false;
  title = "Sanalyz";
  pandemics: Pandemic[] = [];
  countries: Country[] = [];
  subscriptions$: Subscription[] = [];
  exportFormat: "csv" | "json" = "csv";

  infectionByContinentPandemic?: number;
  @ViewChild("infectionByContinentPandemicChart")
  infectionByContinentPandemicChart!: ChartComponent;

  top10CountriesByDeathCasesPandemic: number | null = null;
  top10CountriesByDeathCasesFilter: boolean = false;
  @ViewChild("top10CountriesByDeathCasesChart")
  top10CountriesByDeathCasesChart!: ChartComponent;

  newCasesDeathsOverTimePandemic?: number;
  newCasesDeathsOverTimeCountry?: number;
  @ViewChild("newCasesDeathsOverTimeChart")
  newCasesDeathsOverTimeChart!: ChartComponent;

  @ViewChild("pandemicComparisonChart")
  pandemicComparisonChart!: ChartComponent;

  private subscription!: Subscription;

  lastIaPrediction: any = null;

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.subscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark),
    );

    this.subscriptions$.push(
      this.apiService.getAllPandemics().subscribe({
        next: (pandemics) => {
          this.pandemics = pandemics;
          this.infectionByContinentPandemic = this.pandemics[0].id;
          this.infectionByContinentPandemicChart.loadData(this.pandemics[0].id);

          this.newCasesDeathsOverTimePandemic = this.pandemics[0].id;
          this.newCasesDeathsOverTimeChart.loadData([
            this.newCasesDeathsOverTimeCountry,
            this.pandemics[0].id,
          ]);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des pandémies :", err);
          alert(
            "Une erreur est survenue lors de la récupération des pandémies. Merci de contacter le support.",
          );
        },
      }),
    );

    this.subscriptions$.push(
      this.apiService.getAllCountries().subscribe({
        next: (countries) => {
          this.countries = countries;

          this.newCasesDeathsOverTimeCountry = this.countries[0].id;
          this.newCasesDeathsOverTimeChart.loadData([
            this.countries[0].id,
            this.newCasesDeathsOverTimeCountry,
          ]);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des pays :", err);
          alert(
            "Une erreur est survenue lors de la récupération des pays. Merci de contacter le support.",
          );
        },
      }),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadInfectionByContinent(id: number) {
    if (id === undefined) {
      console.log("id is undefined");
      return null;
    }

    return this.apiService.getInfectionByContinent(id);
  }

  loadTop10CountriesByDeathCases(params: [boolean, number]) {
    let [filter, id] = params;
    if (filter && id !== null) {
      return this.apiService.getTop10CountriesByDeathAndCases(id);
    } else {
      return this.apiService.getTop10CountriesByDeathAndCases();
    }
  }

  loadNewCasesDeathsOverTime(params: [number, number]) {
    let [countryId, pandemicId] = params;
    if (countryId === undefined || pandemicId === undefined) {
      console.log("countryId or pandemicId is undefined");
      return null;
    }

    return this.apiService.getNewCasesDeathOverTime(countryId, pandemicId);
  }

  export() {
    this.apiService.downloadData(this.exportFormat);
  }

  pruneCache() {
    this.subscriptions$.push(
      this.apiService.pruneChartCache().subscribe(() => {
        this.infectionByContinentPandemicChart.loadData(undefined);
        this.top10CountriesByDeathCasesChart.loadData(undefined);
        this.newCasesDeathsOverTimeChart.loadData(undefined);
        this.pandemicComparisonChart.loadData(undefined);
      }),
    );
  }
}
