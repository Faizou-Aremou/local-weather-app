import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { PostalCodeAPIService } from './postal-code-api.service'
import { PostalCodeAPI, PostalCodeService } from './postal-code.service'
import { IPostalCodeService } from './weather/weather.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: IPostalCodeService, useClass: PostalCodeService },
    {
      provide: PostalCodeAPI,
      useClass: PostalCodeAPIService,
    },
  ],
}
