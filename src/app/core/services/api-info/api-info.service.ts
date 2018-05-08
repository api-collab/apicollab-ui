import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiInfo } from '../../models/api-info';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { UrlHandlingStrategy } from '@angular/router';
import { ApiInfoList } from '../../models/api-info-list';

import { environment } from '../../../../environments/environment';

const apiInfoUrl = `${environment.API_ROOT}/apis`;
@Injectable()
export class ApiInfoService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ApiInfoList> {
        return this.http.get<ApiInfoList>(apiInfoUrl)
        .pipe(
            tap(heroes => console.log(`fetched apis`)),
            catchError(this.handleError('getAll', new ApiInfoList()))
        );
    }


    search(term: string): Observable<ApiInfoList> {
        if (!term.trim()) {
            // if not search term, return all
            return this.http.get<ApiInfoList>(apiInfoUrl);
        }
        const url = `${apiInfoUrl}?query=${term}`;
        return this.http.get<ApiInfoList>(url)
            .pipe(
                tap(heroes => console.log(`fetched apis`)),
                catchError(this.handleError('getAll', new ApiInfoList))
            );
    }

    /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);

        };
    }

}
