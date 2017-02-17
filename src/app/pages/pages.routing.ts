import { Routes } from "@angular/router";

import { BlankComponent } from './blank/blank.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EditComponent } from './edit/edit.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'blank',
      component: BlankComponent
    }, {
      path: 'invoice',
      component: InvoiceComponent
    }, {
      path: 'timeline',
      component: TimelineComponent
    }, {
      path: 'user',
      component: EditComponent
    }]
  }
];
