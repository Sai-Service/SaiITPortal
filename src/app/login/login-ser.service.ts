import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSerService {
  headers: HttpHeaders;
  ServerUrl : string;
  constructor(private httpclient: HttpClient,private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
   }


   public login(loginName: string, password: string) {
    const body = {
      'loginName': loginName,
      'password': password,
    };
    let options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/loginDet/loginpage`;
    console.log(body);
    return this.httpclient.post(url, body, options)
  }
}