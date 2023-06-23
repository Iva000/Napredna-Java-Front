import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adoption } from '../model/Adoption';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adoption-card',
  templateUrl: './adoption-card.component.html',
  styleUrls: ['./adoption-card.component.css']
})
export class AdoptionCardComponent {

  @Input() adoption!: Adoption;
  @Output() removedAdoption = new EventEmitter<Adoption>();
  public pipe = new DatePipe('en-US');

  constructor(){}

  delete(id:Number){
    this.removedAdoption.emit(this.adoption);
    
  }
}
