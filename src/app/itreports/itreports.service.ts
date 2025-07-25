import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItreportsService {

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
      // this.ServerUrl + `/Login/loginPage`
      //http://localhost:8080/Login/loginPage
      const url = this.ServerUrl + `/Login/loginPage`;
      console.log(body);
      return this.httpclient.post(url, body, options)
    }

    
  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/ouMst/Active')
  }

  reporttype(): Observable<any> {
    return this.http.get(this.ServerUrl + '/ portalDataReports/reportRelation')
  }

  //   openDocumentFn(headerId:any,docType:any) {
  //   const REQUEST_URI = this.ServerUrl + `/Transaction/downloadfile?trlineId=${headerId}&filepath=${docType}`;
  //   return this.http.get(REQUEST_URI, {
  //     responseType: 'arraybuffer',
  //     headers: this.headers,
  //   });
  // }

  getPresentationReports(department:any): Observable<any[]> {
  const url = `${this.ServerUrl}/portalReports/presentreportPathDetails?department=${department}`;
  return this.http.get<any[]>(url);
}

downloadPresentationReport(fileName: string): string {
  return `${this.ServerUrl}/portalReports/downPresentationReport/${encodeURIComponent(fileName)}`;
}
}
