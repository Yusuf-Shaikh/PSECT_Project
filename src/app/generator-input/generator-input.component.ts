import { Component, Input, OnInit } from '@angular/core';
import { GeneratorsService } from '../generators.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator-input',
  templateUrl: './generator-input.component.html',
  styleUrls: ['./generator-input.component.css']
})
export class GeneratorInputComponent {

  @Input() id: number;
  constructor( private generatorsService: GeneratorsService){}

  A_parameter:number ;
  B_parameter:number ;
  C_parameter:number ;
  Pmin:number ;
  Pmax:number ;
  F:number ;
  displayAlert = 'none';

  change(){
    this.generatorsService.updateGenerator(this.id, this.A_parameter, this.B_parameter, this.C_parameter, this.Pmin, this.Pmax, this.F);
  }
}
