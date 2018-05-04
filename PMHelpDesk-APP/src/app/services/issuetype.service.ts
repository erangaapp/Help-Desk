import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { IssueType } from '../models/issuetype';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IssueTypeService {

  private apiUrl = 'api/issuetypes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET issuetypes from the server */
  get (): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(this.apiUrl)
      .pipe(
        tap(issuetypes => this.log(`fetched issuetypes`)),
        catchError(this.handleError('get', []))
      );
  }

  /** GET issuetype by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<IssueType> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<IssueType[]>(url)
      .pipe(
        map(issuetypes => issuetypes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} issuetype id=${id}`);
        }),
        catchError(this.handleError<IssueType>(`getIssueType id=${id}`))
      );
  }
 
  /** GET issuetype by id. Will 404 if id not found */
  getIssueType(id: number): Observable<IssueType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IssueType>(url).pipe(
      tap(_ => this.log(`fetched issuetype id=${id}`)),
      catchError(this.handleError<IssueType>(`getIssueType id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new issuetype to the server */
  post (issuetype: IssueType): Observable<IssueType> {
    return this.http.post<IssueType>(this.apiUrl, issuetype, httpOptions).pipe(
      tap((issuetype: IssueType) => this.log(`added issuetype w/ id=${issuetype.id}`)),
      catchError(this.handleError<IssueType>('post'))
    );
  }

  /** DELETE: delete the issuetype from the server */
  delete (issuetype: IssueType | number): Observable<IssueType> {
    const id = typeof issuetype === 'number' ? issuetype : issuetype.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IssueType>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted issuetype id=${id}`)),
      catchError(this.handleError<IssueType>('delete'))
    );
  }

  /** PUT: update the issuetype on the server */
  put (issuetype: IssueType): Observable<any> {
    return this.http.put(this.apiUrl, issuetype, httpOptions).pipe(
      tap(_ => this.log(`updated issuetype id=${issuetype.id}`)),
      catchError(this.handleError<any>('put'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for issuetype consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a IssueTypeService message with the MessageService */
  private log(message: string) {
    this.messageService.add('IssueTypeService: ' + message);
  }
}
