import { Component } from '@angular/core';
import { Person } from '../model/Person';
import { personService } from '../services/personService';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-people',
  templateUrl: './all-people.component.html',
  styleUrls: ['./all-people.component.css']
})
export class AllPeopleComponent {

  public people!: Person[];
  public filteredPeople: Person[] =[];

  constructor(private personService: personService, private router: Router){}

  ngOnInit(){
    this.personService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.people = response.data.values as Person[];
        this.filteredPeople = this.people;
      }
    })
  }

  delete(jmbg: String){
    console.log(jmbg);
    this.personService.deletePerson(jmbg).subscribe((res)=>{
      console.log(res);
    })
  }

  update(jmbg: String){
    this.router.navigate(['/update_person', jmbg]);
  }

  onSearch(search: String){
    if(!search){
      this.filteredPeople=this.people;
    }else{
      this.personService.searchPeople(search).subscribe((res)=>{
        this.filteredPeople = res.data.values as Person[];
      })
    }
  }

}
