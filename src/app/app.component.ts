import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  ChartConfiguration
} from 'chart.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement,
  PieController,
  ArcElement
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< Updated upstream
export class AppComponent implements AfterViewInit {
  constructor(private router: Router, private http: HttpClient) {}

  title = 'Sanalyz';
  showPopup = false;
  selectedChartId = '';
  popupChart?: Chart;
  chartInstances: Chart[] = [];

  @ViewChildren('chart') chartRefs!: QueryList<ElementRef<HTMLCanvasElement>>;

  get isSwaggerRoute(): boolean {
    return this.router.url.includes('/swagger');
  }

  openPopup(chartId: string): void {
    this.selectedChartId = chartId;
    this.showPopup = true;
  
    const exampleData = {
      labels: ['A', 'B', 'C'],
      values: [10, 20, 30]
    };
  
    // Attendre un cycle de rendu pour que le canvas soit disponible dans le DOM
    setTimeout(() => {
      this.renderPopupChart(chartId, exampleData);
    }, 0);
  }
  

  renderPopupChart(chartId: string, data: { labels: string[], values: number[] }): void {
    const canvas = document.getElementById('popupChart') as HTMLCanvasElement;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Configuration du graphique en fonction du type
    let chartConfig: any;
  
    if (chartId === 'mixed') {
      chartConfig = {
        type: 'mixed',
        data: {
          labels: data.labels,
          datasets: [
            {
              type: 'bar',  // Premier dataset, type bar
              label: 'Bar Dataset',
              data: data.values,
              backgroundColor: '#3B82F6',
              borderColor: '#333',
              borderWidth: 1
            },
            {
              type: 'line', // Deuxième dataset, type line
              label: 'Line Dataset',
              data: data.values.map(value => value * 2), // On peut multiplier les valeurs pour l'exemple
              fill: false,
              borderColor: '#10B981',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    } else {
      chartConfig = {
        type: chartId as any,
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Données exemple',
            data: data.values,
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
            borderColor: '#333',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    }
  
    // Créer le graphique
    new Chart(ctx, chartConfig);
  }
  
  

  closePopup(): void {
    this.showPopup = false;
    this.popupChart?.destroy();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const chartConfigs: ChartConfiguration[] = [
        {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
              data: [65, 59, 80],
              backgroundColor: ['#60a2fa', '#f6a02d', '#f64d4d']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
        {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
              data: [30, 40, 50],
              borderColor: '#f64d4d',
              backgroundColor: 'rgba(246, 77, 77, 0.2)',
              fill: false,
              tension: 0.4,
              pointRadius: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
        {
          type: 'pie',
          data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
              data: [15, 30, 55],
              backgroundColor: ['#60a2fa', '#f6a02d', '#f64d4d']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
        {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                type: 'bar',
                label: 'Ventes',
                data: [30, 50, 40, 60, 70],
                backgroundColor: '#60a2fa',
                borderRadius: 10
              },
              {
                type: 'line',
                label: 'Tendance',
                data: [35, 45, 50, 55, 60],
                borderColor: '#f64d4d',
                backgroundColor: '#f64d4d',
                fill: false,
                tension: 0.4,
                pointRadius: 5
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      ];

      this.chartRefs.forEach((chartRef, index) => {
        const ctx = chartRef.nativeElement.getContext('2d');
        if (ctx && chartConfigs[index]) {
          const chart = new Chart(ctx, chartConfigs[index]);
          this.chartInstances.push(chart);
        }
      });
    });
=======
export class AppComponent {
  public isDarkMode: boolean = false;
  
  onThemeChanged(isDark: boolean) {
    this.isDarkMode = isDark;
>>>>>>> Stashed changes
  }
}
