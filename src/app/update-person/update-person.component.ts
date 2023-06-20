import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from '../model/City';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { personService } from '../services/personService';
import { cityService } from '../services/cityService';
import { Person } from '../model/Person';
import { HttpResponse } from '../network/HttpResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent {

  public updatePersonForm!: FormGroup;
  public cities!: City[];
  receivedInput!: String;
  public person1!: Person;
  //object!: Object[];
  

  constructor(private route: ActivatedRoute,private personService: personService, private cityService: cityService, private formBuilder: FormBuilder){
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
      });
  
      this.cityService.getAll().subscribe({
        next:(response: HttpResponse)=>{
  
          this.cities = response.data.values as City[];
          
        }
      })
  
      this.personService.getPerson(this.receivedInput).subscribe((response)=>{
          console.log(response);
          //  const geted= response.data.values;
          //  console.log(geted);
          //  console.log(String(geted[0]));
          //  console.log({{ geted[0] }});
            
           //this.person.jmbg = Person(geted);
           //this.person= String(this.object[0].data);
           
      });
   
    this.updatePersonForm = formBuilder.group({
      personJmbg: new FormControl(),
      personName: new FormControl('', Validators.required),
      personSurname: new FormControl('', Validators.required),
      personYear: new FormControl('', Validators.required),
      personPhone: new FormControl('', Validators.required),
      personCity: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    

    
  }

  updatePerson(){
    if(!this.updatePersonForm.valid){
      return;
    }else{
      const person = new Person;

      person.jmbg = this.receivedInput;
      person.name = this.updatePersonForm.get('personName')!.value;
      person.surname = this.updatePersonForm.get('personSurname')!.value;
      person.phone_number = this.updatePersonForm.get('personPhone')!.value;
      person.year_of_birth = this.updatePersonForm.get('personYear')!.value;

      var city!: City;

      this.cities.forEach(element => {
        if(element.id==this.updatePersonForm.get('personCity')!.value){
          city=element;
        }
        
      });
      person.city = city;

      this.personService.updatePerson(person).subscribe((res)=>{
        console.log(res);
      })
    }
  }
}
