import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { LocalStorageService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(
      public navService: NavService,
      private _localStorageService: LocalStorageService,
      private router: Router,) {}

  ngOnInit(): void {}

  logOut(){
    this._localStorageService.removeData("token");
    this.router.navigateByUrl("/authentication/login");
  }
}
