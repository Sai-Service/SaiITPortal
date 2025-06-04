import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    headers: HttpHeaders;
    ServerUrl : string;
 
    constructor(private httpclient: HttpClient,private http: HttpClient) { 
        this.headers = new HttpHeaders();
        this.ServerUrl = AppConst.ServerUrl;
    }

    public login(loginName: string, password: string) {
      const body = {
        'userName': loginName,
        'password': password,
      };
      let options = {
        headers: this.headers
      };
      const url = this.ServerUrl + `/Login/loginPage`;
      console.log(body);
      return this.httpclient.post(url, body, options)
    }

    reporttypelist(): Observable<any> {
      return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=TypeOfReport`);
    }

    uploadtypelist(): Observable<any> {
      return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=TypeOfUpload`);
    }

    erplocationList(orgId: any): Observable<any> {
      return this.http.get(this.ServerUrl + `/locationMst/ErpLocations?ouId=${orgId}`);
    }

    cityList(): Observable<any> {
     return this.http.get(this.ServerUrl + '/ouMst/Active')
      }


    acreportsearch(city: string,reportType: string,month: string,year: string,uploadType:string): Observable<any> {
      return this.http.get(this.ServerUrl + `/documentStorage/view?city=${city}&reportType=${reportType}&month=${month}&year=${year}&uploadType=${uploadType} `)
    }

    openDocumentFn(path:string) {
      const REQUEST_URI = this.ServerUrl + `/documentStorage/download/${path}`;
      return this.http.get(REQUEST_URI, {
        responseType: 'arraybuffer',
        headers: this.headers,
      });
    }

     uploadFile(formData: FormData): Observable<any> {
      const url = this.ServerUrl + '/documentStorage/upload'; 
      return this.httpclient.post(url, formData, {
        headers: this.headers
      });
    }
}
