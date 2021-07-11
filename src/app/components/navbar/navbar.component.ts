import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.less']
})
export class NavbarComponent implements OnInit, OnChanges {
  logado = false;
  @Input()
  pressLogin = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges() {
    // if (this.pressLogin) {
    //   this.authService.getSessao().then(
    //     (response) => {
    //       this.logado = !!response;
    //     }
    //   )
    // }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
