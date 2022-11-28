import { Component, OnInit } from "@angular/core";
import { GeneratorsService } from "./generators.service";
import { Router } from "@angular/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [GeneratorsService],
})
export class AppComponent implements OnInit {
  constructor(
    private genratorsService: GeneratorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {}, 1000);
  }

  generatorCount: number[] = [];
  loads: number[] = [];
  generators: {
    A_parameter: number;
    B_parameter: number;
    C_parameter: number;
    Pmin: number;
    Pmax: number;
  }[] = [];
  total_time: number;
  no_of_gen: number;
  displayInitialInput = "none";
  displayGens = "none";
  displayLoads = "none";
  show_output = "none";
  displayIntro = "block";
  fileContent: string = "";
  displayAlert = "none";
  displayVideo = "block";
  displayPDF = 'none';

  UploadInputs(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      var enc = new TextDecoder("utf-8");
      if (typeof fileReader.result === "string") {
        self.fileContent = fileReader.result;
        console.log(fileReader.result);
        self.readInputfile();
      }
    };
    fileReader.readAsText(file);
  }

  readInputfile() {
    this.no_of_gen = this.genratorsService.getInitialvalue(this.fileContent);
    for (let j = 0; j < this.no_of_gen; j++) {
      this.genratorsService.addGenerator();
      this.generatorCount.push(j + 1);
    }
    this.displayIntro = "none";
    this.genratorsService.readInputfile(this.fileContent);
    this.genratorsService.calculate();
    this.router.navigate(["/output"]);
    this.ShowOutput();
  }

  EnterManually() {
    this.displayIntro = "none";
    this.displayInitialInput = "block";
  }

  InitializeValues() {
    if (!this.no_of_gen || !this.total_time) {
      this.displayAlert = "block";
    } else {
      this.displayAlert = "none";
      for (let j = 0; j < this.no_of_gen; j++) {
        this.genratorsService.addGenerator();
        this.generatorCount.push(j + 1);
      }
      for (let j = 0; j < this.total_time; j++) {
        this.loads.push(0);
      }
      this.displayInitialInput = "none";
      this.displayGens = "block";
    }
  }

  CalculateValues() {
    this.genratorsService.calculate();
    this.displayGens = "none";
    this.displayLoads = "block";
  }

  ShowOutput() {
    this.displayLoads = "none";
    this.show_output = "block";
    this.displayPDF = 'block';
  }

  openPDF(){
    let DATA: any = document.getElementById("mainBody");
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");

      let position = 0;
      var options = {
        pagesplit: true,
      };
      while (position*-1 <fileHeight) {
        PDF.addImage(
          FILEURI,
          "PNG",
          0,
          position,
          fileWidth,
          fileHeight
        );
        position = position-fileHeight*0.352778-8,
        console.log(fileHeight + "  " + position);
        if(position*-1 <fileHeight){
        PDF.addPage();
        }
      }
      PDF.save("angular-demo.pdf");
    });
  }
}
