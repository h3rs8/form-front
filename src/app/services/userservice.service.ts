import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private _http:HttpClient) { }

  submitApp(userData:any){
    return this._http.post(`${baseUrl}/user/`,userData,{ observe: 'response' });
  }

}
