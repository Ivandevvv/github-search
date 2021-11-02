import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(300)
    ).subscribe({
      next: value => {}
    });
  }
}
