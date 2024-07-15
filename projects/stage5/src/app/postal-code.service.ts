import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IPostalCode, IPostalCodeService } from './weather/weather.service'

export abstract class PostalCodeAPI {
  abstract resolvePostalCode(postalCode: string): Observable<IPostalCode | null>
}

@Injectable()
export class PostalCodeService implements IPostalCodeService {
  constructor(private postalCodeAPI: PostalCodeAPI) {}
  resolvePostalCode(postalCode: string): Observable<IPostalCode | null> {
    return this.postalCodeAPI.resolvePostalCode(postalCode)
  }
}
