import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { AppComponent } from './app.component';

import {
  CommentComponent,
  Error404Component,
  listingService,
  NavbarComponent,
  VoteComponent,
  FeedEntryListComponent,
  FeedEntryDetailsComponent,
  CommentListComponent,
  FeedEntryComponent
}
  from './index'
import { appRouts } from './routs'

@NgModule({
  declarations: [
    AppComponent,
    CommentListComponent,
    CommentComponent,
    FeedEntryListComponent,
    FeedEntryComponent,
    FeedEntryDetailsComponent,
    VoteComponent,
    Error404Component,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRouts
      , null),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    listingService],

  bootstrap: [AppComponent]
})
export class AppModule { }
