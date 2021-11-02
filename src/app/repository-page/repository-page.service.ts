import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IRepositoryItem } from '../shared/types/github-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositoryPageService {
  private repository = new BehaviorSubject<IRepositoryItem | null>(null);
  repository$ = this.repository.asObservable().pipe(filter(v => !!v));

  constructor() { }

  set repositoryValue(value: any) {
    this.repository.next(value);
  }
}
