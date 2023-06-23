import { Component } from '@angular/core';
import { Adoption } from '../model/Adoption';
import { adoptionService } from '../services/adoptionService';
import { Router } from '@angular/router';
import { HttpResponse } from '../network/HttpResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-adoptions',
  templateUrl: './all-adoptions.component.html',
  styleUrls: ['./all-adoptions.component.css']
})
export class AllAdoptionsComponent {
  public adoptions!: Adoption[];
  

  constructor(private adoptionService: adoptionService, private router: Router){}

  ngOnInit(){
    this.adoptionService.getAll().subscribe({
      next:(response: HttpResponse)=>{
        this.adoptions = response.data.values as Adoption[];
      }
    })
  }

  delete(id: Number){
    console.log(id);
    this.adoptionService.deleteAdoption(id).subscribe((res)=>{
      console.log(res);
    })
  }

  update(id:Number){
    // this.router.navigate(['/update_pet', id]);
  }
}
