import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { petService } from '../services/petService';
import { typeService } from '../services/typeService';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pet } from '../model/Pet';
import { Type } from '../model/Type';
import { HttpResponse } from '../network/HttpResponse';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  public newPetForm!: FormGroup;
  //public petName!: String;
  public types!: Type[];


  constructor(private petService: petService, private typeService: typeService, private formBuilder: FormBuilder){


    this.newPetForm = formBuilder.group({
      petId: new FormControl(),
      petName: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      petGender: new FormControl('', Validators.required),
      petAge: new FormControl('', Validators.required),
      petDescription: new FormControl()
    });
  }

  ngOnInit(){
    this.typeService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.types = response.data.values as Type[];
        
      }
    })
  }

  public addPet(){
    if(!this.newPetForm.valid){
      return;
    }else{
      const pet = new Pet;

      pet.id=111;
      pet.name= this.newPetForm.get('petName')!.value;
      var type = new Type;
      this.types.forEach(element => {
        if(element.id== this.newPetForm.get('petType')!.value){
          type=element;
        }
      });
      pet.type= type;
      pet.gender= this.newPetForm.get('petGender')!.value;
      pet.description= this.newPetForm.get('petDescription')!.value;
      pet.age= Number(this.newPetForm.get('petAge')!.value);
      console.log(pet.name);
      console.log(pet.id);

      this.petService.addNew(pet).subscribe((res)=>{
        console.log(res);
      })
    }
  }
}
