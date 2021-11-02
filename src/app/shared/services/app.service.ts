import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private showAppLoader = new BehaviorSubject<boolean>(false);
  showAppLoader$ = this.showAppLoader.asObservable();

  constructor() { }

  startLoader() {
    this.showAppLoader.next(true);
  }
  stopLoader() {
    this.showAppLoader.next(false);
  }
}
