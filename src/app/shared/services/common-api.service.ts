import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IGithubResponse } from '../types/github-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(
    private appService: AppService,
    private httpClient: HttpClient
  ) { }

  search(value: string): Observable<IGithubResponse> {
    this.appService.startLoader();
    return this.httpClient
      .get<IGithubResponse>(`https://api.github.com/search/repositories?q=${value}`)
      .pipe(finalize(() => this.appService.stopLoader()));
  }
}
