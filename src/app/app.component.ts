import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartConfiguration, LineController, LineElement, PointElement } from 'chart.js';
import { CommonModule } from '@angular/common';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, LineController, PointElement);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sanalyz';
  chart!: Chart;
  barchart!: Chart;
  linebar!: Chart;
  piechart!: Chart;
    @ViewChild('chart') ChartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart2') linebarRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart3') piechartRef!: ElementRef<HTMLCanvasElement>;

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
    this.barchart = new Chart(this.ChartRef.nativeElement, barchart);
    this.linebar = new Chart(this.linebarRef.nativeElement, linebar);
    this.piechart = new Chart(this.linebarRef.nativeElement, pieChart);
  }
}