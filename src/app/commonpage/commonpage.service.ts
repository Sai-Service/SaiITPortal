import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonpageService {

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
      const url = this.ServerUrl+'/Login/loginPage';
      console.log(body);
      return this.httpclient.post(url, body, options)
    }


    // Uploadimage(): Observable<any> {
    //   const REQUEST_URI = this.ServerUrl + `/Img/upload`;
    //   return this.http.get(REQUEST_URI, {
    //     responseType: 'arraybuffer',
    //     headers: this.headers,
    //   });
    // }

    fileNameList(): Observable<any> {
      return this.http.get(this.ServerUrl + '/FndCmn/CmnType?cmnType=IMG');
    }

    // public upload(formdata:FormData) {
    //   const url = this.ServerUrl + '/DocUpload/ImgUpload/7';
    //   return this.http.post(url, formdata);
    // }
      
    public upload(formdata:FormData) {
    const url = (this.ServerUrl + `/DocUpload/ImgUpload/7`);
    return this.http.put(url, formdata);
    }

}
