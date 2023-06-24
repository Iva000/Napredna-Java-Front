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
    this.adoptionService.getAdoptionStatus(1).subscribe({
      next:(response: HttpResponse)=>{
        this.adoptions = response.data.values as Adoption[];
      }
    })
  }

  delete(a: Adoption){
    this.adoptionService.deleteAdoption(a.adoptionId).subscribe((res)=>{
      console.log(res);
      alert([res.message]);

      this.adoptions.forEach((element,index)=>{
          if(element.adoptionId==a.adoptionId) this.adoptions.splice(index,1);
       
    })
  })
  }

  update(id:Number){
    // this.router.navigate(['/update_pet', id]);
  }
}
