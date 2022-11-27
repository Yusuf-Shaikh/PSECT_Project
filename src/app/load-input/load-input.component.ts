import { Component, Input, OnInit } from '@angular/core';
import { GeneratorsService } from '../generators.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-load-input',
  templateUrl: './load-input.component.html',
  styleUrls: ['./load-input.component.css']
})
export class LoadInputComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() id: number;
  constructor( private generatorsService: GeneratorsService){}

  Load:number

  change(){
    this.generatorsService.updateIndLoad(this.id, this.Load);
  }

}
