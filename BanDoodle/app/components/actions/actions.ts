import {Component} from '@angular/core';

/*
  Generated class for the Actions component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'actions',
  templateUrl: 'build/components/actions/actions.html'
})
export class Actions {
  text:string;
  constructor() {
    this.text = 'Hello World';
  }
}
