import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { Observable } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../interfaces'

interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    },
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}
interface IWeatherRequest {
  q?: string
  zip?: number
  lat?: string
  lon?: string
  appid: string
}
interface Coordinates {
  latitude: number
  longitude: number
}
export interface IPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}
export abstract class IPostalCodeService {
  abstract resolvePostalCode(postalCode: string): Observable<IPostalCode | null>
}
export interface IWeatherService {
  getCurrentWeather(search: string, country: string): Observable<ICurrentWeather>
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>
  updateCurrentWeather(search: string, country?: string): void
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  readonly currentWeather = signal<ICurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })
  constructor(
    private httpClient: HttpClient,
    private postalCodeService: IPostalCodeService
  ) {}

  getCurrentWeather(search: string, country?: string): Observable<ICurrentWeather> {
    return this.postalCodeService.resolvePostalCode(search).pipe(
      switchMap((postalCode) => {
        if (postalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          } as Coordinates)
        } else {
          const request: Omit<IWeatherRequest, 'appid'> = {
            q: country !== undefined ? `${search},${country}` : search,
          }
          return this.getCurrentWeatherHelper(request)
        }
      })
    )
  }

  updateCurrentWeather(search: string, country?: string): void {
    this.getCurrentWeather(search, country)
      .pipe(first())
      .subscribe((weather) => this.currentWeather.set(weather))
  }
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const request = {
      lat: coords.latitude.toString(),
      lon: coords.longitude.toString(),
    }
    return this.getCurrentWeatherHelper(request)
  }
  private getCurrentWeatherHelper(
    request: Omit<IWeatherRequest, 'appid'>
  ): Observable<ICurrentWeather> {
    const apiRequest = { appid: environment.appId, ...request }
    const uriParams = (Object.keys(apiRequest) as (keyof IWeatherRequest)[]).reduce(
      (uriParams, param) => {
        const req = apiRequest[param]
        return req !== undefined ? uriParams.set(param, req) : uriParams
      },
      new HttpParams()
    )
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)))
  }
  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
}
