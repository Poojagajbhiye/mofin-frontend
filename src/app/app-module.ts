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

@NgModule({
  declarations: [
    App,
    Signup,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideApollo(() => ({
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
      cache: new InMemoryCache(),
    })),
  ],
  bootstrap: [App]
})
export class AppModule { }
