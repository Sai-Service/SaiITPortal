import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConst } from '../app-const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErpIssueService {

   headers: HttpHeaders;
    ServerUrl : string;
    constructor(private httpclient: HttpClient,private http: HttpClient) {
      this.headers = new HttpHeaders();
      // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
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
      // const url = 'http://localhost:8080/Login/loginPage';
      console.log(body);
      return this.httpclient.post(url, body, options)
    }


    erplocationList(orgId: any): Observable<any> {
      return this.http.get(this.ServerUrl + `/locationMst/ErpLocations?ouId=${orgId}`);
    }

    alllocationlist(): Observable<any> {
      return this.http.get(this.ServerUrl + '/locationMst/loctn/active')
    }
    
    priorityList(): Observable<any> {
      return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=PRIORITY`);
    }
  //localhost:8080/FndCmn/CmnType?cmnType=PRIORITY

  issueTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=ISSUETYPE`);
  }

  departmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=DEPT`);
  }
  // /FndCmn/CmnType?cmnType=DEPT
  ModuletList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=MODULE`);
  }
  // /FndCmn/CmnType?cmnType=MODULE
  issuediscList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=ISSUEDESC`);
  }

  filetypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=FILETYPE`);
  }

  supportdtls(): Observable<any> {
    return this.http.get(this.ServerUrl + `/Login/derina`);
  }

  issuestatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/FndCmn/CmnType?cmnType=STATUS`);
  }

  itsupportList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/FndCmn/CmnType?cmnType=ITSUPPORT');
  }

  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/ouMst/Active')
  }

  UserissuesSearch(issueNo:any,ouId:any,locId:any,deptId:any,sts:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Transaction/AllIssues?issueNo=${issueNo}&ouId=${ouId}&locationId=${locId}&deptId=${deptId}&status=${sts}`);
  }

  ErpissuesSearch(issueNo:any,ouId:any,locId:any,deptId:any,sts:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Transaction/AllIssues?issueNo=${issueNo}&ouId=${ouId}&locationId=${locId}&deptId=${deptId}&status=${sts}`)
  }
 
  IssueNoFindFN(issueNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Transaction/getIssue/${issueNo}`);
  }

  viewIssueTrnslnFn(issueNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Transaction/getIssue/${issueNo}`);
  }
  

  public IssuelogSubmit(formdata:FormData) {
    // formdata.append('file',file);
    // formdata.append('objhdMst',issuelogpg); 'application/json; charset=utf-8'
    // const options = {
    //   // headers:  this.headers.set('Content-Type', 'multipart/form-data'),
    //   headers: this.headers.set('Content-Type', 'application/json; charset=utf-8')
    // };
    const url = this.ServerUrl + '/Transaction/addIssue';
    return this.http.post(url, formdata);
  }
 
  updateUserIssueLinefn(UpdateCounterSaleInvRecord:FormData,issueNo:any) {
    // const options = {
    //   headers: this.headers
    // };
    const url = (this.ServerUrl + `/Transaction/updateIssue?issueNo=${issueNo}`);
    return this.http.put(url, UpdateCounterSaleInvRecord);
  }

  updateUserIssueLinefn2(UpdateCounterSaleInvRecord:FormData,issueNo:any) {
    // const options = {
    //   headers: this.headers
    // };
    const url = (this.ServerUrl + `/Transaction/updateIssuebyuser?issueNo=${issueNo}`);
    return this.http.put(url, UpdateCounterSaleInvRecord);
  }

  openDocumentFn(headerId:any,docType:any) {
    const REQUEST_URI = this.ServerUrl + `/Transaction/downloadfile?trlineId=${headerId}&filepath=${docType}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  // openDocumentFn(headerId:any,docType:any): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/Transaction/downloadfile?trlineId=${headerId}&filepath=${docType}`);
  // }
    imagemainget(): Observable<any> {
      return this.http.get(this.ServerUrl + ``);
    }

  }