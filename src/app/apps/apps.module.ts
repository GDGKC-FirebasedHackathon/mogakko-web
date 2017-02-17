import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { CalendarModule, CalendarEventTitle, CalendarDateFormatter } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppsRoutes } from './apps.routing';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { MailComponent } from './mail/mail.component';
import { MediaComponent } from './media/media.component';
import { ChatComponent } from './chat/chat.component';
import { SocialComponent } from './social/social.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(AppsRoutes), MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule, CalendarModule, FlexLayoutModule, ChartsModule],
  declarations: [FullcalendarComponent, MailComponent, MediaComponent, ChatComponent, SocialComponent],
  providers: [
    CalendarEventTitle,
    CalendarDateFormatter
  ]
})

export class AppsModule {}