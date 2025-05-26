import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Pandemic } from "../models/pandemic";
import { Country } from "../models/country";

interface ApiGenericResponseList {
  _embedded: { [key: string]: any };
}

interface ApiPandemicResponse {
  id: number;
  name: string;
  pathogen?: string;
  description?: string;
  notes?: string;
  start_date?: Date;
  end_date?: Date;
  _links: { self: { href: string } };
}

interface ApiCountryResponse {
  id: number;
  continent: string;
  name: string;
  iso3: string;
  population: number;
  _links: { self: { href: string } };
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:8080";
  private apiUrlPredict = "http://localhost:8081/predict";

  constructor(private http: HttpClient) {}

  PostPredict(new_cases: number, new_deaths: number, year: number): Observable<{prediction: string}> {
    return this.http.post<{prediction: string}>(this.apiUrlPredict, { new_cases, new_deaths, year });
  }
  
  getPandemicComparison(): Observable<any> {
    return this.http
      .get<
        HttpResponse<any>
      >(`${this.apiUrl}/api/charts/pandemicComparison`, { observe: "response" })
      .pipe(
        map((response: HttpResponse<any>) => this.handleResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  getInfectionByContinent(pandemicId: number): Observable<any> {
    return this.http
      .get<HttpResponse<any>>(
        `${this.apiUrl}/api/charts/infectionDistributionByContinent`,
        {
          params: {
            pandemicId,
          },
          observe: "response",
        },
      )
      .pipe(
        map((response: HttpResponse<any>) => this.handleResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  getTop10CountriesByDeathAndCases(pandemicId?: number): Observable<any> {
    let params: any = {};
    if (pandemicId !== undefined) {
      params["pandemicId"] = pandemicId;
    }

    return this.http
      .get<HttpResponse<any>>(
        `${this.apiUrl}/api/charts/top10CountriesByCasesOrDeaths`,
        {
          observe: "response",
          params,
        },
      )
      .pipe(
        map((response: HttpResponse<any>) => this.handleResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  getDeathByCountryAndPandemic(): Observable<any> {
    return this.http
      .get<
        HttpResponse<any>
      >(`${this.apiUrl}/api/charts/totalCasesDeathsByCountryAndPandemic`, { observe: "response" })
      .pipe(
        map((response: HttpResponse<any>) => this.handleResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  getNewCasesDeathOverTime(
    countryId: number,
    pandemicId: number,
  ): Observable<any> {
    return this.http
      .get<HttpResponse<any>>(
        `${this.apiUrl}/api/charts/newCasesDeathsOverTime`,
        {
          observe: "response",
          params: {
            countryId,
            pandemicId,
          },
        },
      )
      .pipe(
        map((response: HttpResponse<any>) => this.handleResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  pruneChartCache(): Observable<any> {
    return this.http.get<HttpResponse<any>>(
      `${this.apiUrl}/api/charts/pruneCaches`,
      { observe: "response" },
    );
  }

  getAllPandemics(): Observable<Pandemic[]> {
    return this.http
      .get<ApiGenericResponseList>(`${this.apiUrl}/pandemics`)
      .pipe(
        map((data) =>
          data._embedded["pandemics"].map(
            (pandemic: ApiPandemicResponse) =>
              ({
                id: pandemic.id,
                name: pandemic.name,
                pathogen: pandemic.pathogen,
                startDate: pandemic.start_date,
                endDate: pandemic.end_date,
                description: pandemic.description,
                notes: pandemic.notes,
                link: pandemic._links.self.href,
              }) as Pandemic,
          ),
        ),
      );
  }

  getAllCountries(): Observable<Country[]> {
    return this.http
      .get<ApiGenericResponseList>(`${this.apiUrl}/countries`)
      .pipe(
        map((data) =>
          data._embedded["countries"].map(
            (country: ApiCountryResponse) =>
              ({
                id: country.id,
                link: country._links.self.href,
                continent: country.continent,
                name: country.name,
                iso3: country.iso3,
                population: country.population,
              }) as Country,
          ),
        ),
      );
  }

  downloadData(format: "json" | "csv"): void {
    const headers = new HttpHeaders({
      Accept: format === "csv" ? "text/csv" : "application/json",
      "Content-Type": format === "csv" ? "text/csv" : "application/json",
    });

    this.http
      .get(`${this.apiUrl}/export`, {
        headers,
        responseType: "blob",
      })
      .subscribe(
        (response: Blob) => {
          const blob = new Blob([response], {
            type: format === "csv" ? "text/csv" : "application/json",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `data.${format}`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error("Error downloading file:", error);
        },
      );
  }

  // Fonction pour gérer les réponses de l'API
  private handleResponse(response: HttpResponse<any>): any {
    console.log(response);
    if (response.status === 200) {
      return {
        data: response.body,
        status: "loaded",
      };
    } else if (response.status === 202) {
      return {
        status: "loading",
      };
    } else {
      return {
        status: "unknown",
      };
    }
  }

  // Fonction pour gérer les erreurs
  private handleError(error: any): Observable<any> {
    console.log("test");
    console.error("Error fetching data:", error);
    return of({
      status: "error",
    });
  }
}
