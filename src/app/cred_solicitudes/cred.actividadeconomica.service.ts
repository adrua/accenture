import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { CRED_ActividadEconomicaModel } from './cred.actividadeconomica.model';
import { CRED_SolicitudesModel } from './cred.solicitudes.model';


const httpOptions = {
  params: null,
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
//    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class CREDActividadEconomicaService {
    private CREDActividadEconomicaUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.CREDActividadEconomicaUrl = `${environment.dataServiceUrl}/CRED_SolicitudesDataServices_2346_ACCBOG/CREDActividadEconomicaDataServices_2346_ACCBOG`;
    }

    getCRED_ActividadEconomica(row: CRED_SolicitudesModel): Observable<CRED_ActividadEconomicaModel> {
        const params = {
            compania: row.compania.toString(),
            credSolicitudId: row.credSolicitudId.toString()
        };

        return this.http.get<CRED_ActividadEconomicaModel>(this.CREDActividadEconomicaUrl, { params }).pipe(
            retry(3),
            tap(() => this.log('fetched CRED_ActividadEconomica')),
            catchError((error) => this.handleError('getCRED_ActividadEconomica', error))
        );
    }

    getCRED_ActividadEconomicaList(
                row: CRED_SolicitudesModel,
                pageSize: number = 10,
                pageIndex: number = 0,
                sortExpr: string = ''): Observable<any> {
        const params: any = {
            compania: row.compania.toString(),
            credSolicitudId: row.credSolicitudId.toString(),
            pageSize: pageSize.toString(),
            pageIndex: pageIndex.toString()
        };

        if (sortExpr) {
              params.sort = sortExpr;
        }

        const sUrl = `${this.CREDActividadEconomicaUrl}/Gets`;

        return this.http.get<CRED_ActividadEconomicaModel[]>(sUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched CRED_ActividadEconomica')),
            catchError((error) => this.handleError('getCRED_ActividadEconomicaList', error))
        );
    }

    addCRED_ActividadEconomica(row: CRED_ActividadEconomicaModel): Observable<CRED_ActividadEconomicaModel> {
        return this.http.post<CRED_ActividadEconomicaModel>(this.CREDActividadEconomicaUrl, row, httpOptions).pipe(
            retry(3),
            tap((rrow: CRED_ActividadEconomicaModel) => this.log(`added CRED_ActividadEconomica w/ id=${rrow.credSolicitudId}`)),
            catchError((error) => this.handleError('addCRED_ActividadEconomica', error))
        );
    }

    updateCRED_ActividadEconomica(row: CRED_ActividadEconomicaModel): Observable<CRED_ActividadEconomicaModel> {
        // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<CRED_ActividadEconomicaModel>(this.CREDActividadEconomicaUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update CRED_ActividadEconomica id=${row.credSolicitudId}`)),
            catchError((error) => this.handleError('updateCRED_ActividadEconomica', error))
        );
    }

    saveCRED_ActividadEconomica(row: CRED_ActividadEconomicaModel): Observable<CRED_ActividadEconomicaModel> {
        if (row.estado === 'N') {
            return this.addCRED_ActividadEconomica(row);
        } else {
            return this.updateCRED_ActividadEconomica(row);
        }
    }

    deleteCRED_ActividadEconomica(row: CRED_ActividadEconomicaModel): Observable<CRED_ActividadEconomicaModel> {
        const sUrl = `${this.CREDActividadEconomicaUrl}/${row.compania}/${row.credSolicitudId}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter CRED_ActividadEconomica id=${row.credSolicitudId}`)),
            catchError((error) => this.handleError('deleteCRED_ActividadEconomica', error))
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

    /** Log a CRED_ActividadEconomicaService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`CRED_ActividadEconomicaService: ${message}`);
        console.log(`CRED_ActividadEconomicaService: ${message}`);
    }

}
