import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { element } from 'protractor';
import { Count } from '../shared/count';
import { ReportService } from '../shared/report.service';
import { Status } from '../shared/status';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [, ,];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  labels: Status[] = [];
  data: Count[] = [];

  constructor(private reportService: ReportService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit(): void {
    this.getLabel();
    this.getData();
  }

  getLabel() {
    this.reportService.getStatusLabel().subscribe(
      (response) => {
        console.log(response);
        console.log("haiiiii");
        this.labels = response;
        this.pushStatus();

      }
    );
  }

  pushStatus() {
    this.labels.forEach(element => {
      this.pieChartLabels.push(element.status);
    });
  }

  getData() {
    this.reportService.getStatusCount().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.pushData();
      }
    );
  }

  pushData() {
    this.pieChartData = [];
    this.data.forEach(element => {
      this.pieChartData[element.statId - 1] = (element.count);
    });
  }
}
