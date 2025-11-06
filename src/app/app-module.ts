import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { FormsModule } from '@angular/forms';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache, HttpLink } from '@apollo/client/core';
import { Dashboard } from './dashboard/dashboard';
import { GraphQLModule } from './apollo.config';

@NgModule({
  declarations: [
    App,
    Signup,
    Login,
    Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
