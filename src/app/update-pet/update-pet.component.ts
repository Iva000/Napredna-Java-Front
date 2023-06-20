import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '../model/Type';
import { ActivatedRoute } from '@angular/router';
import { petService } from '../services/petService';
import { typeService } from '../services/typeService';
import { HttpResponse } from '../network/HttpResponse';
import { Pet } from '../model/Pet';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.css']
})
export class UpdatePetComponent {

  public updatePetForm!: FormGroup;
  public types!: Type[];
  receivedInput!: Number;

  constructor(private route: ActivatedRoute,private petService: petService, private typeService: typeService, private formBuilder: FormBuilder){
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
      });
  
      this.typeService.getAll().subscribe({
        next:(response: HttpResponse)=>{
  
          this.types = response.data.values as Type[];
          
        }
      })
  
      this.petService.getPet(this.receivedInput).subscribe((response)=>{
          console.log(response);
          //  const geted= response.data.values;
          //  console.log(geted);
          //  console.log(String(geted[0]));
          //  console.log({{ geted[0] }});
            
           //this.person.jmbg = Person(geted);
           //this.person= String(this.object[0].data);
           
      });

      this.updatePetForm = formBuilder.group({
        petId: new FormControl(),
        petName: new FormControl('', Validators.required),
        petType: new FormControl('', Validators.required),
        petGender: new FormControl('', Validators.required),
        petAge: new FormControl('', Validators.required),
        petDescription: new FormControl()
      });
  }

  updatePet(){
    if(!this.updatePetForm.valid){
      return;
    }else{
      const pet = new Pet;

      pet.id=this.receivedInput;
      pet.name= this.updatePetForm.get('petName')!.value;
      var type = new Type;
      this.types.forEach(element => {
        if(element.id== this.updatePetForm.get('petType')!.value){
          type=element;
        }
      });
      pet.type= type;
      pet.gender= this.updatePetForm.get('petGender')!.value;
      pet.description= this.updatePetForm.get('petDescription')!.value;
      pet.age= Number(this.updatePetForm.get('petAge')!.value);
      console.log(pet.name);
      console.log(pet.id);

      this.petService.updatePet(pet).subscribe((res)=>{
        console.log(res);
      })
    }
    
  }
}
