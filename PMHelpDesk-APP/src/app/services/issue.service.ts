import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from "rxjs/observable/forkJoin";
import { catchError, map, tap } from 'rxjs/operators';

import { Issue, IssueRead } from '../models/issue';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IssueService {

  private apiUrl = 'api/issues';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET issues from the server */
  get (): Observable<IssueRead[]> {
    return this.http.get<IssueRead[]>(this.apiUrl)
      .pipe(
        tap(issues => this.log(`fetched issues`)),
        catchError(this.handleError('get', []))
      );
  }

  /** GET issues from the server */
  getForkJoins ():Observable<object[]> {

    return forkJoin(
      this.http.get('api/users').map((res:Response) => res),
      this.http.get('api/issuetypes').map((res:Response) => res)
    );

  }

  /** GET issue by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<IssueRead> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<IssueRead[]>(url)
      .pipe(
        map(issues => issues[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} issue id=${id}`);
        }),
        catchError(this.handleError<IssueRead>(`getIssue id=${id}`))
      );
  }
 
  /** GET issue by id. Will 404 if id not found */
  getIssue(id: number): Observable<IssueRead> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IssueRead>(url).pipe(
      tap(_ => this.log(`fetched issue id=${id}`)),
      catchError(this.handleError<IssueRead>(`getIssue id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new issue to the server */
  post (issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue, httpOptions).pipe(
      tap((issue: Issue) => this.log(`added issue w/ id=${issue.id}`)),
      catchError(this.handleError<Issue>('post'))
    );
  }

  /** DELETE: delete the issue from the server */
  delete (issue: Issue | number): Observable<Issue> {
    const id = typeof issue === 'number' ? issue : issue.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Issue>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted issue id=${id}`)),
      catchError(this.handleError<Issue>('delete'))
    );
  }

  /** PUT: update the issue on the server */
  put (issue: Issue): Observable<any> {
    return this.http.put(this.apiUrl, issue, httpOptions).pipe(
      tap(_ => this.log(`updated issue id=${issue.id}`)),
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

      // TODO: better job of transforming error for issue consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a IssueService message with the MessageService */
  private log(message: string) {
    this.messageService.add('IssueService: ' + message);
  }
}
