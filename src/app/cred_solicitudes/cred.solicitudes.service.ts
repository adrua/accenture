import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { CRED_SolicitudesModel } from './cred.solicitudes.model';


const httpOptions = {
  params: null,
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
//    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class CREDSolicitudesService {
    private CREDSolicitudesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.CREDSolicitudesUrl = `${environment.dataServiceUrl}/CREDSolicitudesDataServices_2346_ACCBOG`;
    }

    getCRED_Solicitudes(row: CRED_SolicitudesModel): Observable<CRED_SolicitudesModel> {
        const params = {
            compania: row.compania.toString(),
            credSolicitudId: row.credSolicitudId.toString()
        };

        return this.http.get<CRED_SolicitudesModel>(this.CREDSolicitudesUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched CRED_Solicitudes')),
            catchError((error) => this.handleError('getCRED_Solicitudes', error))
        );
    }

    getCRED_SolicitudesList(
                val: string,
                pageSize: number = 10,
                pageIndex: number = 0,
                sortExpr: string = ''): Observable<CRED_SolicitudesModel[]> {
        const params: any = {
            term: val,
            pageSize: pageSize.toString(),
            pageIndex: pageIndex.toString()
        };

        if (sortExpr) {
              params.sort = sortExpr;
        }

        const sUrl = `${this.CREDSolicitudesUrl}/Search`;

        return this.http.get<CRED_SolicitudesModel[]>(sUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched CRED_Solicitudes')),
            catchError((error) => this.handleError('getCRED_SolicitudesList', error))
        );
    }

    addCRED_Solicitudes(row: CRED_SolicitudesModel): Observable<CRED_SolicitudesModel> {
        return this.http.post<CRED_SolicitudesModel>(this.CREDSolicitudesUrl, row, httpOptions).pipe(
            retry(3),
            tap((rrow: CRED_SolicitudesModel) => this.log(`added CRED_Solicitudes w/ id=${rrow.credSolicitudId}`)),
            catchError((error) => this.handleError('addCRED_Solicitudes', error))
        );
    }

    updateCRED_Solicitudes(row: CRED_SolicitudesModel): Observable<CRED_SolicitudesModel> {
        // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<CRED_SolicitudesModel>(this.CREDSolicitudesUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update CRED_Solicitudes id=${row.credSolicitudId}`)),
            catchError((error) => this.handleError('updateCRED_Solicitudes', error))
        );
    }

    saveCRED_Solicitudes(row: CRED_SolicitudesModel): Observable<CRED_SolicitudesModel> {
        if (row.estado === 'N') {
            return this.addCRED_Solicitudes(row);
        } else {
            return this.updateCRED_Solicitudes(row);
        }
    }

    deleteCRED_Solicitudes(row: CRED_SolicitudesModel): Observable<CRED_SolicitudesModel> {
        const sUrl = `${this.CREDSolicitudesUrl}/${row.compania}/${row.credSolicitudId}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter CRED_Solicitudes id=${row.credSolicitudId}`)),
            catchError((error) => this.handleError('deleteCRED_Solicitudes', error))
        );
    }


    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${result.message}`);

          // Let the app keep running by returning an empty result.
          return of(result);
    }

    /** Log a CRED_SolicitudesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`CRED_SolicitudesService: ${message}`);
        console.log(`CRED_SolicitudesService: ${message}`);
    }

}
