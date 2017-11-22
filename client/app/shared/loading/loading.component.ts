/* Component for the loading icon that appears when loading */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @Input() condition: boolean;
}
