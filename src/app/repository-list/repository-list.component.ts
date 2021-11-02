import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { CommonApiService } from '../shared/services/common-api.service';
import { IGithubResponse, IGithubResponseItem, VisibilityEnum } from '../shared/types/github-response.interface';
import { AppService } from '../shared/services/app.service';
import { RepositoryPageService } from '../repository-page/repository-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParseRepositoryName } from '../shared/untils/parse-repository-name.util';

@UntilDestroy()
@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  data: IGithubResponse['items'] = [];
  dataOutput: IGithubResponse['items'] = [];
  searchControl = new FormControl();
  searchControlTouched: boolean | undefined;

  prop = {
    visibility: 'visibility',
    haveHovePage: 'haveHovePage'
  }
  filters: FormGroup = this.fb.group({
    [this.prop.visibility]: null,
    [this.prop.haveHovePage]: null
  });
  VisibilityEnum = VisibilityEnum;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    private commonApiService: CommonApiService,
    private repositoryPageService: RepositoryPageService
  ) {
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(300),
      filter((v) => v != null && v.trim().length),
      tap(() => {
        this.searchControlTouched = true;
        this.filters.reset();
      }),
      switchMap(v => this.commonApiService.search(v))
    ).subscribe({
      next: (data: IGithubResponse) => {
        this.data = this.dataOutput = data.items;
        console.log(data);
      }
    });
    this.filters.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe({
      next: v => {
        this.dataOutput = this.data
          .filter(p => (!!v[this.prop.visibility] ? p.visibility === v[this.prop.visibility] : true))
          .filter(p => (!!v[this.prop.haveHovePage] ? p.homepage : true));
      }
    });
  }

  goToRepository(rep: IGithubResponseItem) {
    this.repositoryPageService.repositoryValue = rep;
    this.router.navigate(
      [ ParseRepositoryName(rep.full_name) ],
      { relativeTo: this.activatedRoute }
    ).then();
  }
}
