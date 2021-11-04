import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  constructor(public router: Router) {}
  goPage = (page: string) => {
    this.router.navigate([page]);
  };
}
