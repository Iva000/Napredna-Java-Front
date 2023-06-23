import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';
import { Person } from '../model/Person';

@Injectable({
    providedIn: 'root'
})
export class personService{

    constructor(private http: HttpClient){}
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/people/all")
    }

    public addNewPerson(person: Person): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+ "/people/add", person);
    }

    public searchPeople(search: String): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+'/people/search/'+ search);
    }

    public deletePerson(jmbg: String): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/people/delete", jmbg);
    }

    public getPerson(jmbg: String): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/people/getPerson/"+jmbg);
    }

    public updatePerson(person: Person):Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/people/update", person);
    }

    public login(username: String, password:String): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/people/login/"+username+"/"+password);
    }

    public setSessionData(res:any){
        sessionStorage.setItem('user', String(res.username));
        this.setUserStatus();
    }

    public setUserStatus(){
        sessionStorage.setItem('currentUser', 'guest');
    }

    public getUserStatus(){
        return sessionStorage.getItem('currentUser');
    }

    public logOut(){
        sessionStorage.clear();
      }
}