import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Staff } from '../models/staff';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StaffService {

  private apiUrl = 'api/staffs';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET staffs from the server */
  get (): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl)
      .pipe(
        tap(staffs => this.log(`fetched staffs`)),
        catchError(this.handleError('get', []))
      );
  }

  /** GET staff by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<Staff> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<Staff[]>(url)
      .pipe(
        map(staffs => staffs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} staff id=${id}`);
        }),
        catchError(this.handleError<Staff>(`getStaff id=${id}`))
      );
  }
 
  /** GET staff by id. Will 404 if id not found */
  getStaff(id: number): Observable<Staff> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Staff>(url).pipe(
      tap(_ => this.log(`fetched staff id=${id}`)),
      catchError(this.handleError<Staff>(`getStaff id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new staff to the server */
  post (staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff, httpOptions).pipe(
      tap((staff: Staff) => this.log(`added staff w/ id=${staff.id}`)),
      catchError(this.handleError<Staff>('post'))
    );
  }

  /** DELETE: delete the staff from the server */
  delete (staff: Staff | number): Observable<Staff> {
    const id = typeof staff === 'number' ? staff : staff.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Staff>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted staff id=${id}`)),
      catchError(this.handleError<Staff>('delete'))
    );
  }

  /** PUT: update the staff on the server */
  put (staff: Staff): Observable<any> {
    return this.http.put(this.apiUrl, staff, httpOptions).pipe(
      tap(_ => this.log(`updated staff id=${staff.id}`)),
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

      // TODO: better job of transforming error for staff consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StaffService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StaffService: ' + message);
  }
}
