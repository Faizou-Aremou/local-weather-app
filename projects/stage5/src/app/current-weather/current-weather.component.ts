import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'
import { Component, DestroyRef, Input, OnDestroy, OnInit, inject } from '@angular/core'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'
import { Observable, Subject, takeUntil } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  standalone: true,
  imports: [FlexModule, DecimalPipe, DatePipe, CommonModule],
})
export class CurrentWeatherComponent implements OnInit {
  current$: Observable<ICurrentWeather> | undefined
  constructor(private weatherService: WeatherService) {}

  current!: ICurrentWeather

  ngOnInit(): void {
    this.current$ = this.weatherService.currentWeather$
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
