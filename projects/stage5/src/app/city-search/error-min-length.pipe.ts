import { Pipe, PipeTransform } from '@angular/core'
import { FormControl } from '@angular/forms'

@Pipe({
  name: 'errorMinLength',
  standalone: true,
  pure: false,
})
export class ErrorMinLengthPipe implements PipeTransform {
  transform<T>(control: FormControl<T>): string {
    return control.hasError('minlength') ? 'Type more than one character to search' : ''
  }
}
