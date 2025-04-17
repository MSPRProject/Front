import { Component, OnInit, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartConfiguration, LineController, LineElement, PointElement, PieController, ArcElement, scales  } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, LineController, PointElement, PieController, ArcElement);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router){}
  title = 'Sanalyz';
  chart!: Chart;
  barchart!: Chart;
  linebar!: Chart;
  piechart!: Chart;
  comboChart!: Chart;
  isDarkMode: boolean = false;
  showPopup = false;
  selectedChartId: string = '';
  get isSwaggerRoute() {
    return this.router.url.includes('/swagger');
  }
  ngOnInit() 
  {
    const savedTheme = localStorage.getItem('theme'); 
    if (savedTheme === 'dark') {
      this.enableDarkMode();
      document.body.classList.add("dark-mode");
    }
    else {
      this.isDarkMode = false;
      document.body.classList.remove("dark-mode");
    }
  }
  enableDarkMode()
  {
    document.body.classList.add("dark-mode");
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode()
  {
    document.body.classList.remove("dark-mode");
    localStorage.setItem('theme', 'light');
  }

  toggleTheme()
  { 
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) 
    {
      this.enableDarkMode();
    }
    else
    {
      this.disableDarkMode();
    }
  }
   onCardClick() {
    console.log('Card clicked!');
  }

  openPopup(chartId: string){
    this.selectedChartId = chartId;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

    @ViewChild('chart') ChartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart2') linebarRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart3') piechartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart4') comboChartRef!: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit() {
    let barchart: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            data: [65, 59, 80],
            backgroundColor: ['#60a2fa', '#f6a02d', '#f6a02d'],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    let linebar: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            data: [65, 59, 80],
            backgroundColor: ['#60a2fa', '#f6a02d', '#f6a02d'],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    let pieChart: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            data: [65, 59, 80],
            backgroundColor: ['#60a2fa', '#f6a02d', '#f6a02d'],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    let comboChart: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril'],
        datasets: [
          {
            type: 'bar',
            label: 'Ventes',
            data: [30, 50, 40, 60],
            backgroundColor: '#60a2fa',
            borderRadius: 10
          },
          {
            type: 'line',
            label: 'Tendance',
            data: [35, 45, 50, 55],
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
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };


    if(!this.barchart){
      this.barchart = new Chart(this.ChartRef.nativeElement, barchart);
    }
    
    if(!this.linebar){
      this.linebar = new Chart(this.linebarRef.nativeElement, linebar);
    }
    if(!this.piechart){
      this.piechart = new Chart(this.piechartRef.nativeElement, pieChart);
    }

    if(!this.comboChart){
      this.comboChart = new Chart(this.comboChartRef.nativeElement, comboChart);
    }
  }
}