import { DatePipe, DecimalPipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { FlexModule } from '@ngbracket/ngx-layout/flex'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  standalone: true,
  imports: [FlexModule, DecimalPipe, DatePipe],
})
export class CurrentWeatherComponent {
  @Input() current!: ICurrentWeather
  constructor(private weatherService: WeatherService) {}
  //current!: ICurrentWeather

  // ngOnInit(): void {
  //   this.weatherService
  //     .getCurrentWeather('Bethesda', 'US')
  //     .subscribe((data) => (this.current = data))
  // }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
