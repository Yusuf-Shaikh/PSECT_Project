import { Component, OnInit } from "@angular/core";
import { GeneratorsService } from "../generators.service";

@Component({
  selector: "app-output",
  templateUrl: "./output.component.html",
  styleUrls: ["./output.component.css"],
})
export class OutputComponent implements OnInit {
  constructor(private generatorsService: GeneratorsService) {}

  chartOptions: {
    title: { text: string };
    animationEnabled: boolean;
    axisX: { title: string; interval: number };
    axisY: { title: string; includeZero: boolean };
    data: {
      type: string;
      indexLabelFontColor: string;
      color: string;
      dataPoints: { x: number; y: number; color: string }[];
    }[];
    backgroundColor: string;
  };
  colors: string[] = [];
  flapc: {
    value: number;
    index: number;
  }[] = this.generatorsService.get_flapc();
  LegendText: string[] = [];
  generators: {
    A_parameter: number;
    B_parameter: number;
    C_parameter: number;
    Pmin: number;
    Pmax: number;
  }[] = this.generatorsService.get_generator();
  power_list: number[] = [];
  Output_list: {
    generators: string;
    Total_Pmax: number;
    Total_Pmin: number;
  }[] = [];
  priority_list: {
    value: number;
    index: number;
  }[][] = this.generatorsService.get_list();
  dps: { x: number; y: number; color: string }[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.priority_list.length; i++) {
      this.Output_list.push({
        generators: "",
        Total_Pmax: 0,
        Total_Pmin: 0,
      });
      this.LegendText.push("");
      let Maxpower = 0;
      let Minpower = 0;
      for (let j = 0; j < this.priority_list[i].length; j++) {
        let generator_id = this.priority_list[i][j].index;
        this.Output_list[i].generators += "G" + (generator_id + 1).toString();
        this.LegendText[i] += "G" + (generator_id + 1).toString();
        if (j != this.priority_list[i].length - 1) {
          this.Output_list[i].generators += "+";
          this.LegendText[i] += "+";
        }
        Maxpower += this.generators[generator_id].Pmax;
        Minpower += this.generators[generator_id].Pmin;
      }
      this.power_list.push(Maxpower);
      this.Output_list[i].Total_Pmax = Maxpower;
      this.Output_list[i].Total_Pmin = Minpower;
    }

    this.chartOptions = {
      title: { text: "" },
      animationEnabled: true,
      axisX: { title: "Load Hour", interval: 1 },
      axisY: { title: "Power (MW)", includeZero: true },
      data: this.createData(),
      backgroundColor: "#f8f4e5",
    };

    let ggColors = [
      "#fea481",
      "#7d8bff",
      "#eaa6fd",
      "#b9ffc3",
      "#fc7474",
      "#fcf581",
    ];
    for (let i = 0; i < this.power_list.length; i++) {
      if (i < ggColors.length) {
        this.colors.push(ggColors[i]);
      } else {
        this.colors.push(this.getRandomColor());
      }
    }

    let dataSeries = this.chartOptions.data[0];
    for (let j = 0; j < dataSeries.dataPoints.length; j++) {
      let assign = false;
      for (let k = this.power_list.length - 1; k >= 0; k--) {
        if (dataSeries.dataPoints[j].y <= this.power_list[k]) {
          dataSeries.dataPoints[j].color = this.colors[k];
          assign = true;
          break;
        }
      }
      if (!assign) {
        dataSeries.dataPoints[j].color = this.colors[0];
      }
    }
  }

  createData() {
    let data: {
      type: string;
      indexLabelFontColor: string;
      color: string;
      dataPoints: { x: number; y: number; color: string }[];
    }[] = [];

    data.push({
      type: "column",
      indexLabelFontColor: "#5A5757",
      color: this.colors[0],
      dataPoints: this.createDataset(),
    });

    for (let i = 1; i < this.colors.length; i++) {
      let temp: string = "Slab" + (i + 1).toString();
      data.push({
        type: "column",
        indexLabelFontColor: "#5A5757",
        color: this.colors[i],
        dataPoints: [],
      });
    }

    return data;
  }

  createDataset() {
    let loads: number[] = this.generatorsService.get_load();
    console.log(loads);
    for (let i = 0; i < loads.length; i++) {
      this.dps.push({
        x: i + 1,
        y: loads[i],
        color: "rgb(90, 220, 0)",
      });
    }
    return this.dps;
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }
}
