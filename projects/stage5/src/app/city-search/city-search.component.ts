import { Component, OnInit } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css',
})
export class CitySearchComponent implements OnInit {
  search = new FormControl<string>('')
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.search.valueChanges.subscribe((searchValue) => {
      if (searchValue) {
        const userInput = searchValue.split(',').map((s) => s.trim())
        const result = this.weatherService.getCurrentWeather(
          userInput[0],
          userInput.length > 1 ? userInput[1] : undefined
        )
        result.subscribe()
      }
    })
  }
}
