import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="page-404">
      <p class="text-404">404</p>
      <h2>Ops!</h2>
      <p>Essa página não existe.<br></p>
      <p>Volte a <a [routerLink]="['/dashboard']">página inicial</a>.<br></p>
  </div>
            `,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
