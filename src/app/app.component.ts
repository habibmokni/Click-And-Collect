import { Component } from '@angular/core';
import { StoreService} from './shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'click-and-collect';

  constructor(private storeService: StoreService){
    this.storeService.fetchStore();
    this.storeService.getStoreLocations
  }
}
