import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
export interface IPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}

interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeServiceService {
  constructor() {}
}
