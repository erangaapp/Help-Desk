import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from "rxjs/observable/forkJoin";
import { catchError, map, tap } from 'rxjs/operators';

import { Resolution, ResolutionRead } from '../models/resolution';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ResolutionService {

  private apiUrl = 'api/resolutions';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET resolutions from the server */
  get (): Observable<ResolutionRead[]> {
    return this.http.get<ResolutionRead[]>(this.apiUrl)
      .pipe(
        tap(resolutions => this.log(`fetched resolutions`)),
        catchError(this.handleError('get', []))
      );
  }

  /** GET resolutions from the server */
  getForkJoins ():Observable<object[]> {

    return forkJoin(
      this.http.get('api/staffs').map((res:Response) => res),
      this.http.get('api/issues').map((res:Response) => res)
    );

  }

  /** GET resolution by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<ResolutionRead> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<ResolutionRead[]>(url)
      .pipe(
        map(resolutions => resolutions[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} resolution id=${id}`);
        }),
        catchError(this.handleError<ResolutionRead>(`getResolution id=${id}`))
      );
  }
 
  /** GET resolution by id. Will 404 if id not found */
  getResolution(id: number): Observable<ResolutionRead> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ResolutionRead>(url).pipe(
      tap(_ => this.log(`fetched resolution id=${id}`)),
      catchError(this.handleError<ResolutionRead>(`getResolution id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new resolution to the server */
  post (resolution: Resolution): Observable<Resolution> {
    return this.http.post<Resolution>(this.apiUrl, resolution, httpOptions).pipe(
      tap((resolution: Resolution) => this.log(`added resolution w/ id=${resolution.id}`)),
      catchError(this.handleError<Resolution>('post'))
    );
  }

  /** DELETE: delete the resolution from the server */
  delete (resolution: Resolution | number): Observable<Resolution> {
    const id = typeof resolution === 'number' ? resolution : resolution.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Resolution>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resolution id=${id}`)),
      catchError(this.handleError<Resolution>('delete'))
    );
  }

  /** PUT: update the resolution on the server */
  put (resolution: Resolution): Observable<any> {
    return this.http.put(this.apiUrl, resolution, httpOptions).pipe(
      tap(_ => this.log(`updated resolution id=${resolution.id}`)),
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

      // TODO: better job of transforming error for resolution consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ResolutionService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ResolutionService: ' + message);
  }
}
