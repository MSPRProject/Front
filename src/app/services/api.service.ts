import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { EMPTY, Observable, of } from "rxjs";
import { map, catchError, expand, reduce } from "rxjs/operators";
import { Pandemic } from "../models/pandemic";
import { Country } from "../models/country";
import { Report } from "../models/report";

interface ApiGenericResponseList {
  _embedded: { [key: string]: any };
}

interface ApiPaginatedResponse {
  _embedded: { [key: string]: any };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
  _links: {
    first?: { href: string };
    last?: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
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

  constructor(private http: HttpClient) {}

  predict(
    countryId: number,
    pandemicId: number,
    date: Date,
  ): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/api/ai/predict`, {
      params: {
        country_id: countryId,
        pandemic_id: pandemicId,
        predict_at: date.toISOString().split("T")[0],
      },
    });
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
    return this.fetchPaginatedData(`${this.apiUrl}/pandemics`).pipe(
      map((data: ApiPandemicResponse[]) =>
        data.map(
          (pandemic) =>
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
    return this.fetchPaginatedData(`${this.apiUrl}/countries`).pipe(
      map((data: ApiCountryResponse[]) =>
        data.map(
          (country) =>
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

  private fetchPaginatedData(url: string): Observable<any[]> {
    return this.http.get<ApiPaginatedResponse>(url).pipe(
      expand((response) => {
        if (response._links.next) {
          return this.http.get<ApiPaginatedResponse>(response._links.next.href);
        } else {
          return EMPTY;
        }
      }),
      map((response) => response._embedded[Object.keys(response._embedded)[0]]),
      reduce((acc: any[], data: any[], _) => [...acc, ...data], []),
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
      .subscribe({
        next: (response: Blob) => {
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
        error: (error) => {
          console.error("Error downloading file:", error);
        },
      });
  }

  /**
   * Appelle l'API IA (FastAPI) pour obtenir une prédiction.
   * @param predictData Données au format attendu par l'API IA (voir README IA)
   */
  postPredict(predictData: any): Observable<any> {
    const iaApiUrl = 'http://localhost:8000/predict';
    const token = localStorage.getItem('ia_bearer_token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(iaApiUrl, predictData, { headers });
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
