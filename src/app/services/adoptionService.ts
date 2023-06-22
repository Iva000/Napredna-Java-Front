import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';
import { Adoption } from '../model/Adoption';

@Injectable({
    providedIn: 'root'
})
export class adoptionService{

    constructor(private http: HttpClient){}
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/adoptions/all")
    }

    public addNewAdoption(adoption: Adoption): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+ "/adoptions/add", adoption);
    }

    public deleteAdoption(id: Number): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/adoptions/delete", id);
    }

    public getAdoption(id:Number): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/adoptions/getPerson/"+id);
    }

    public updateAdoption(adoption: Adoption):Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/adoption/update", adoption);
    }
}