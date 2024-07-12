import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, filter, tap } from 'rxjs'
import { WeatherService } from '../weather/weather.service'
import { ErrorMinLengthPipe } from './error-min-length.pipe'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
export class CitySearchComponent {
  @Output() searchEvent = new EventEmitter<string>()
  search = new FormControl<string>('', [Validators.minLength(2)])
  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe()
      .pipe(
        filter((value: null | string): value is string => value !== null),
        filter(() => this.search.valid),
        debounceTime(1000),
        tap((searchValue: string) => this.doSearch(searchValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }
  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }
}
