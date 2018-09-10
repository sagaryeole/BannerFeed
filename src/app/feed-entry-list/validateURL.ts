import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https://www.reddit.com/r/')
  // ||   !control.value.includes('.json') || !control.value.endsWith(".json")
 )
  {
    return { validUrl: false };
  }
  return null;
}