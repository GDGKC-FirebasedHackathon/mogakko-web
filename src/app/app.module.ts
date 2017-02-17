import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { JazzDialog } from './material/dialog/dialog.component';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule }       from './shared/shared.module';
import {AngularFireModule} from "angularfire2";
import {SessionService} from "./session/session.service";
import {profileEditorDialog} from "./apps/social/social.component";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export const firebaseConfig = {
  apiKey: "AIzaSyCA88p1A_K2Z1K0kRlLck_DHkqLDBRPPLk",
  authDomain: "mogakko-f050a.firebaseapp.com",
  databaseURL: "https://mogakko-f050a.firebaseio.com",
  storageBucket: "mogakko-f050a.appspot.com",
  messagingSenderId: "693576137753"
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    JazzDialog,
    profileEditorDialog
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [SessionService],
  entryComponents: [ JazzDialog, profileEditorDialog ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//
// // Must export the config

//
// @NgModule({
//   imports: [
//     BrowserModule,
//
//   ],
//   declarations: [ AppComponent ],
//   bootstrap: [ AppComponent ]
// })
