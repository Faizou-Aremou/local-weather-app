import { Component, effect, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { CitySearchComponent } from './city-search/city-search.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox'

const darkClassName = 'dark-theme'
@Component({
  selector: 'app-root',
  template: `
    <div>
      <mat-toolbar color="primary">
        <span data-testid="title">LocalCast Weather</span>
        <mat-checkbox [checked]="toggleState()" (change)="changeDarkMode($event)"
          >dark mode</mat-checkbox
        >
      </mat-toolbar>
      <div fxLayoutAlign="center">
        <div class="mat-caption v-pad">Your city, your forecast, right now!</div>
      </div>
      <div fxLayoutAlign="center">
        <app-city-search />
      </div>
      <div fxLayout="row">
        <div fxFlex></div>
        <mat-card appearance="outlined" fxFlex="300px">
          <mat-card-header>
            <mat-card-title>
              <div class="mat-headline-5">Current Weather</div>
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-current-weather></app-current-weather>
          </mat-card-content>
        </mat-card>
        <div fxFlex></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FlexModule,
    CurrentWeatherComponent,
    MatToolbarModule,
    MatCardModule,
    CitySearchComponent,
    MatCheckboxModule,
  ],
})
export class AppComponent {
  readonly toggleState = signal(localStorage.getItem(darkClassName) === 'true')
  constructor() {
    effect(() => {
      localStorage.setItem(darkClassName, this.toggleState().toString())
    })
    effect(() => {
      document.documentElement.classList.toggle(darkClassName, this.toggleState())
    })
  }
  changeDarkMode(event: MatCheckboxChange) {
    this.toggleState.set(event.checked)
  }
}
