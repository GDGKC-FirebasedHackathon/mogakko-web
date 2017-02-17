import {
  Directive, HostBinding, Inject, Input, OnInit, OnDestroy
} from '@angular/core';

import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '.accordion-link'
})
export class AccordionLinkDirective implements OnInit, OnDestroy {

  @Input() public group:any;
  
  @HostBinding('class.open')
  @Input()
  get open():boolean {
    return this._open;
  }

  set open(value:boolean) {
    this._open = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  protected _open:boolean;
  protected nav:AccordionDirective;

  public constructor(@Inject(AccordionDirective) nav:AccordionDirective) {
    this.nav = nav;
  }

  public ngOnInit():any {
    this.nav.addLink(this);

    if(this.group) {
      let routeUrl = this.nav.getUrl();
      let currentUrl = routeUrl.split('/');
      if(currentUrl.indexOf(this.group) > 0) this.toggle();
    } 
  }

  public ngOnDestroy():any {
    this.nav.removeGroup(this);
  }

  public toggle():any {
    this.open = !this.open;
  }
}