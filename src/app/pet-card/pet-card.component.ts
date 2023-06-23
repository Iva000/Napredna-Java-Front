import { Component, EventEmitter, Input, Output } from '@angular/core';
import { petService } from '../services/petService';
import { Router } from '@angular/router';
import { Pet } from '../model/Pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {

  @Input() pet!: Pet;
  @Output() removedPet = new EventEmitter<Pet>();

  constructor(private petService: petService, private router:Router){}

  delete(id: Number){
    // console.log(id);
    // this.petService.delete(id).subscribe((res)=>{
    //   console.log(res);
    // })
    this.removedPet.emit(this.pet);
  }

  update(id:Number){
    this.router.navigate(['/update_pet', id]);
  }
}
