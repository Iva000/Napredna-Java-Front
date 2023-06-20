import { Component } from '@angular/core';
import { petService } from '../services/petService';
import { Pet } from '../model/Pet';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent {

  public pets!: Pet[];
  public filteredPets: Pet[] = [];

  constructor(private petService: petService, private router: Router){}

  ngOnInit(){
    this.petService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.pets = response.data.values as Pet[];
        this.filteredPets=this.pets;
      }
    })
  }

  delete(id: Number){
    console.log(id);
    this.petService.delete(id).subscribe((res)=>{
      console.log(res);
    })
  }

  update(id:Number){
    this.router.navigate(['/update_pet', id]);
  }

  onSearch(search: String){
    if(!search){
      this.filteredPets=this.pets;
    }else{
      //this.filteredPets= this.petService.searchPets(search) as Pet[];
      this.petService.searchPets(search).subscribe((res)=>{
        this.filteredPets = res.data.values as Pet[];
      })
    }
  }
}
