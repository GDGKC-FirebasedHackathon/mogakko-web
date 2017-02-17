import { Directive } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '.accordion',
})
export class AccordionDirective {

  constructor( private router: Router) {}

  protected navlinks:Array<AccordionLinkDirective> = [];

  public closeOtherLinks(openLink:AccordionLinkDirective):void {
    this.navlinks.forEach((link:AccordionLinkDirective) => {
      if (link !== openLink) link.open = false;
    });
  }

  public addLink(link:AccordionLinkDirective):void {
    this.navlinks.push(link);
  }

  public removeGroup(link:AccordionLinkDirective):void {
    let index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  public getUrl() {
    return this.router.url;
  }
}