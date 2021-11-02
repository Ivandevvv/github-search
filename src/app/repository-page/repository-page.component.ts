import { Component, OnInit } from '@angular/core';
import { RepositoryPageService } from './repository-page.service';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.scss']
})
export class RepositoryPageComponent implements OnInit {

  constructor(
    public repositoryPageService: RepositoryPageService
  ) { }

  ngOnInit(): void {

  }
}
