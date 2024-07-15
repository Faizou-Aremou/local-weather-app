import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, defaultIfEmpty, mergeMap } from 'rxjs'
import { environment } from '../environments/environment'
import { PostalCodeAPI } from './postal-code.service'
import { IPostalCode } from './weather/weather.service'

export interface IPostalCodeData {
  postalCodes: [IPostalCode]
}

@Injectable()
export class PostalCodeAPIService implements PostalCodeAPI {
  constructor(private httpClient: HttpClient) {}
  resolvePostalCode(postalcode: string): Observable<IPostalCode | null> {
    const apiRequest = { maxRows: '1', username: 'localcast', postalcode }
    const uriParams = (
      Object.keys(apiRequest) as (keyof {
        maxRows: string
        username: string
        postalcode: string
      })[]
    ).reduce((uriParams, param) => {
      const req = apiRequest[param]
      return uriParams.set(param, req)
    }, new HttpParams())

    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      )
  }
}
