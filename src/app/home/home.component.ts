import { Component, OnInit } from '@angular/core';
import { ChartType } from '../chart-card/chart-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  private lastSemester = [];
  public pieChartType: ChartType;
  public pieChartData: any;
  public pieChartOptions: any;

  public lineChartType: ChartType;
  public lineChartData: any;

  public barChartType: ChartType;
  public barChartData: any;
  public barChartOptions: any;

  public doughnutChartType: ChartType;
  public doughnutChartData: any;
  public doughnutChartOptions: any;

  constructor() { }

  ngOnInit() {

    // calc of the last 6 months
    for (let i = 6; i > 0; i -= 1) {
      const d = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
      this.lastSemester.push(this.monthNames[d.getMonth()]);
    }

    this.pieChartType = ChartType.Pie;
    this.pieChartData = {
      labels: ['Peças', 'Serviços', 'Carros'],
      datasets: [
        {
          data: [32, 6, 62],
          backgroundColor: [
            'rgba(255,99,132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)'
          ]
        }
      ]
    };
    this.pieChartOptions = {
      maintainAspectRatio: false
    };

    this.lineChartType = ChartType.Line;
    this.lineChartData = {
      labels: this.lastSemester,
      datasets: [{
        label: 'Último semestre',
        backgroundColor: 'rgba(75, 192, 192)',
        data: [5, 10, 5, 8, 20, 30, 25],
      }]
    };

    this.barChartType = ChartType.Bar;
    this.barChartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# de Vendas',
        data: [12, 19, 15, 5, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)'
        ]
      }]
    };
    this.barChartOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    this.doughnutChartType = ChartType.Doughnut;
    this.doughnutChartData = {
      labels: ['Peças', 'Serviços'],
      datasets: [
        {
          data: [32, 6],
          backgroundColor: [
            'rgba(255,99,132)',
            'rgba(54, 162, 235)'
          ]
        }
      ]
    };
    this.doughnutChartOptions = {
      maintainAspectRatio: false
    };
  }
}
