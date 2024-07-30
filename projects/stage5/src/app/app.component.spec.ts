import { TestBed, waitForAsync } from '@angular/core/testing'
import { getNativeElementByTestId } from 'angular-unit-test-helper'
import { MockComponents } from 'ng-mocks'

import { AppComponent } from './app.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'
import { IPostalCodeService } from './weather/weather.service'
import { PostalCodeAPI, PostalCodeService } from './postal-code.service'
import { PostalCodeAPIService } from './postal-code-api.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ...MockComponents(CurrentWeatherComponent),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: IPostalCodeService, useClass: PostalCodeService },
        {
          provide: PostalCodeAPI,
          useClass: PostalCodeAPIService,
        },
      ],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const titleElement = getNativeElementByTestId(fixture, 'title')
    expect(titleElement.textContent).toContain('LocalCast Weather')
  })
})
