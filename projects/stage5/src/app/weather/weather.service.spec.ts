import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { IPostalCodeService, WeatherService } from './weather.service'
import { PostalCodeAPI, PostalCodeService } from '../postal-code.service'
import { PostalCodeAPIService } from '../postal-code-api.service'

describe('WeatherService', () => {
  let service: WeatherService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: IPostalCodeService, useClass: PostalCodeService },
        {
          provide: PostalCodeAPI,
          useClass: PostalCodeAPIService,
        },
      ],
    })
    service = TestBed.inject(WeatherService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
