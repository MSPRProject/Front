import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Chart, ChartType, registerables } from "chart.js";
import { CommonModule } from "@angular/common";
import { Observable, Subscription } from "rxjs";
import { ThemeService } from "../../services/theme.service";

Chart.register(...registerables);

@Component({
  selector: "app-chart",
  imports: [CommonModule],
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
  private chart?: Chart;
  public status: string = "loading";

  @Input() public source!: (params: any) => Observable<any> | null;
  @Input() public name!: string;
  @Input() public sourceParams?: any;
  @Input() public width: string = "600";
  @Input() public xAxisLabel: string = "";
  @Input() public yAxisLabel: string = "";
  @Input() public isDarkMode: boolean = false;
  private subscriptions$: Subscription[] = [];

  constructor() {}
/*
  constructor(private themeService: ThemeService) {
    this.subscriptions$.push(
      this.themeService.isDarkMode$.subscribe((isDark) => {
        this.isDarkMode = isDark;
        if (this.chart) {
            // Update chart colors based on theme
            if (this.chart.options?.plugins?.title) {
            this.chart.options.plugins.title.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            }

            if (this.chart.options?.plugins?.legend?.labels) {
            this.chart.options.plugins.legend.labels.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            }

            if (this.chart.options?.scales?.["y"]) {
            this.chart.options.scales["y"].title.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            this.chart.options.scales["y"].grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            this.chart.options.scales["y"].ticks.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            }

            if (this.chart.options?.scales?.["x"]) {
            this.chart.options.scales["x"].title.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            this.chart.options.scales["x"].grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            this.chart.options.scales["x"].ticks.color = isDark ? 'rgb(236, 240, 241)' : '#333';
            }
          this.chart.update();
        }
      }),
    );
  }
    */

  ngOnInit() {
    this.loadData(undefined);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  loadData(sourceParams: any) {
    console.log("Loading data for " + this.name);
    this.status = "loading";
    const observable = this.source(
      sourceParams != undefined ? sourceParams : this.sourceParams,
    );
    if (observable) {
      this.subscriptions$.push(
        observable.subscribe((response) => {
          console.log(response);
          if (response) {
            if (response.status == "loaded") {
              let type = response.data.type;
              const labels = response.data.data.labels;
              const datasets = response.data.data.datasets;
              console.log(response.data.data);

              this.status = "loaded";
              this.createChart(type, labels, datasets);
            } else if (response.status == "loading") {
              setTimeout(
                () =>
                  this.loadData(
                    sourceParams != undefined
                      ? sourceParams
                      : this.sourceParams,
                  ),
                5000,
              );
            }
          } else {
            console.error("no response");
          }
        }),
      );
    }
  }

  createChart(type: ChartType, labels: string[], datasets: any[]) {
    const canvas = document.getElementById(this.name) as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    // Utilisez isDarkMode pour ajuster les couleurs du graphique
    const textColor = this.isDarkMode ? 'rgb(236, 240, 241)' : '#333';
    const gridColor = this.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    console.log(labels, datasets);

    this.chart = new Chart(canvas, {
      type: type,
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.name,
            color: textColor,
          },
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.yAxisLabel,
              color: textColor,
            },
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor
            }
          },
          x: {
            title: {
              display: true,
              text: this.xAxisLabel,
              color: textColor,
            },
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor
            }
          },
        },
      },
    });
  }
}
