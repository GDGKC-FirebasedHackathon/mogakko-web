import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from "rxjs";
import { TranslateService } from 'ng2-translate/ng2-translate';
import * as Ps from 'perfect-scrollbar';
import {AngularFire} from "angularfire2";
import {SessionService} from "../../session/session.service";

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;
  private authStatus: any;

  today: number = Date.now();
  url: string;
  showSettings: boolean = false;

  @ViewChild('sidemenu') sidemenu;

  constructor(public af: AngularFire, public menuItems: MenuItems, private router: Router,
              private translate: TranslateService, private sessionService: SessionService) {
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {

    this.af.auth.subscribe(auth => {
      this.authStatus = auth;
      console.log(auth)
    });

    let elemSidebar = <HTMLElement>document.querySelector('.sidebar-panel .md-sidenav-focus-trap .cdk-focus-trap-content');
    let elemContent = <HTMLElement>document.querySelector('.md-sidenav-content');

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      Ps.initialize(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
      Ps.initialize(elemContent, {wheelSpeed: 2, suppressScrollX: true});
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.url = event.url;
      if (this.isOver()) this.sidemenu.close();

      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) Ps.update(elemContent);
    });

  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    let elemSidebar = <HTMLElement>document.querySelector('.sidebar-panel .md-sidenav-focus-trap .cdk-focus-trap-content');
    setTimeout(() => {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) Ps.update(elemSidebar);
    }, 350);
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }

  signOut() {
    this.sessionService.signOut();
  }
}
