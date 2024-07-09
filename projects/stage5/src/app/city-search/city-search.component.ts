import { Component, OnInit } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, filter, switchMap } from 'rxjs'
import { WeatherService } from '../weather/weather.service'
import { ErrorMinLengthPipe } from './error-min-length.pipe'

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    ErrorMinLengthPipe,
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css',
})
export class CitySearchComponent implements OnInit {
  search = new FormControl<string>('', [Validators.minLength(2)])
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .pipe(
        filter((value: null | string): value is string => value !== null),
        filter((value) => this.search.valid),
        switchMap((searchValue) => {
          const userInput = searchValue.split(',').map((s) => s.trim())
          return this.weatherService.getCurrentWeather(
            userInput[0],
            userInput.length > 1 ? userInput[1] : undefined
          )
        })
      )
      .subscribe()
  }
}
