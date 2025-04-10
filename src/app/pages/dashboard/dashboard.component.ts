import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;

 ngAfterViewInit() {
  new Chart(this.myChartRef.nativeElement, {
    type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80],
        backgroundColor: ['#60a2fa', '#f6a02d', '#f6a02d']
      }
    ]
  }
  });
  
}}
