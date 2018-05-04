import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from "rxjs/observable/forkJoin";
import { catchError, map, tap } from 'rxjs/operators';

import { IssueRelationship, IssueRelationshipRead } from '../models/issuerelationship';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IssueRelationshipService {

  private apiUrl = 'api/issuerelationships';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET issuerelationships from the server */
  get (): Observable<IssueRelationshipRead[]> {
    return this.http.get<IssueRelationshipRead[]>(this.apiUrl)
      .pipe(
        tap(issuerelationships => this.log(`fetched issuerelationships`)),
        catchError(this.handleError('get', []))
      );
  }

  /** GET issuerelationships from the server */
  getForkJoins ():Observable<object[]> {

    return forkJoin(
      this.http.get('api/issues').map((res:Response) => res)
    );

  }

  /** GET issuerelationship by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<IssueRelationshipRead> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<IssueRelationshipRead[]>(url)
      .pipe(
        map(issuerelationships => issuerelationships[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} issuerelationship id=${id}`);
        }),
        catchError(this.handleError<IssueRelationshipRead>(`getIssue id=${id}`))
      );
  }
 
  /** GET issuerelationship by id. Will 404 if id not found */
  getIssue(id: number): Observable<IssueRelationshipRead> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IssueRelationshipRead>(url).pipe(
      tap(_ => this.log(`fetched issuerelationship id=${id}`)),
      catchError(this.handleError<IssueRelationshipRead>(`getIssue id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new issuerelationship to the server */
  post (issuerelationship: IssueRelationship): Observable<IssueRelationship> {
    return this.http.post<IssueRelationship>(this.apiUrl, issuerelationship, httpOptions).pipe(
      tap((issuerelationship: IssueRelationship) => this.log(`added issuerelationship w/ id=${issuerelationship.id}`)),
      catchError(this.handleError<IssueRelationship>('post'))
    );
  }

  /** DELETE: delete the issuerelationship from the server */
  delete (issuerelationship: IssueRelationship | number): Observable<IssueRelationship> {
    const id = typeof issuerelationship === 'number' ? issuerelationship : issuerelationship.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IssueRelationship>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted issuerelationship id=${id}`)),
      catchError(this.handleError<IssueRelationship>('delete'))
    );
  }

  /** PUT: update the issuerelationship on the server */
  put (issuerelationship: IssueRelationship): Observable<any> {
    return this.http.put(this.apiUrl, issuerelationship, httpOptions).pipe(
      tap(_ => this.log(`updated issuerelationship id=${issuerelationship.id}`)),
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

      // TODO: better job of transforming error for issuerelationship consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a IssueRelationshipService message with the MessageService */
  private log(message: string) {
    this.messageService.add('IssueRelationshipService: ' + message);
  }
}
