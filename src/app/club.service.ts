import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Club } from './club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiURL = "http://localhost:5134/api";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //List
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/club/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
//Create
  create(post:Club): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/club/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

//Get details
  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/club/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  //Delete
delete(id:number){
  return this.httpClient.delete(this.apiURL + '/club/' + id, this.httpOptions)

  .pipe(
    catchError(this.errorHandler)
  )
}

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}


