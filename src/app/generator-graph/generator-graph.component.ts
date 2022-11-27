import { Component, Input, OnInit } from '@angular/core';
import { GeneratorsService } from '../generators.service';

@Component({
  selector: 'app-generator-graph',
  templateUrl: './generator-graph.component.html',
  styleUrls: ['./generator-graph.component.css'],
})
export class GeneratorGraphComponent implements OnInit {
  @Input() id: number = 0;
  dps: { x: number; y: number }[] = [];
  constructor(private generatorsService: GeneratorsService) {  }
  chartOptions: {
    zoomEnabled: boolean;
    exportEnabled: boolean;
    animationEnabled: boolean;
    theme: string;
    title: { text: string };
    data: { type: string; dataPoints: { x: number; y: number }[] }[];
    backgroundColor: string;
    axisX:{title:string};
    axisY:{title:string};
  };
  // generateRandomData() {
  //   let A=1;
  //   let B=1;
  //   let C=1;
  //   let Pmin=1;
  //   let Pmax=10;

  //   let temp:{ x: number; y: number }[] = []
  //   for (let i = Pmin; i <= Pmax; i++) {
  //     let y =
  //       A +
  //       B* i +
  //       C * i * i;
  //     this.dps.push({ x: i, y: y});
  //   }
  //   console.log(this.dps);
  //   return this.dps;
  // }

  ngOnInit(): void {
    this.chartOptions = {
      zoomEnabled: true,
      exportEnabled: false,
      animationEnabled:true,
      theme: 'light2',
      title: {
        text: '',
      },
      data: [
        {
          type: 'line',
          dataPoints: this.generatorsService.get_dps(this.id),
        },
      ],
      backgroundColor: "#f8f4e5",
      axisX:{
        title:"Power Generated (MW)",
       },
       axisY:{
        title:" Cost (Rs.)",
       },
    };

    console.log(this.generatorsService.get_dps(this.id));
  }
}
