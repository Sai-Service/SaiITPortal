import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

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
      const url = 'http://localhost:8080/Login/loginPage';
      console.log(body);
      return this.httpclient.post(url, body, options)
    }

    erplocationList(orgId: any): Observable<any> {
      return this.http.get(this.ServerUrl + `/locationMst/ErpLocations?ouId=${orgId}`);
    }

    alllocationlist(): Observable<any> {
      return this.http.get(this.ServerUrl + '/locationMst/loctn/active')
    }

    logTypeList(): Observable<any> {
      return this.http.get(this.ServerUrl + `/nhReports/getReportType?attribute1`);
    }

    
    cityList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/ouMst/Active')
    }


    
    // uploadnhreport( formdata:FormData) {
    //   const url = (this.ServerUrl + `/nhReports/uploadNhReports`);
    //   return this.http.put(url,  formdata);
    // }

    uploadFile(formData: FormData): Observable<any> {
      const url = ` http://localhost:8080/nhReports/uploadNhReports`; 
      return this.httpclient.post( 'http://localhost:8080/nhReports/uploadNhReports', formData, {
        headers: this.headers
      });
    }
    
  
}
