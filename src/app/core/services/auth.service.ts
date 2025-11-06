import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from '../../auth/auth.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apollo: Apollo) {}

  register(name: string, email: string, password: string, parentId?: string) {
    return this.apollo
      .mutate({
        mutation: REGISTER_MUTATION,
        variables: { name, email, password, parentId },
      })
      .pipe(
        map((result: any) => {
          const token = result.data.register.token;
          localStorage.setItem('token', token);
          return result.data.register.user;
        })
      );
  }

  login(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      })
      .pipe(
        map((result: any) => {
          const token = result.data.login.token;
          localStorage.setItem('token', token);
          return result.data.login.user;
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.apollo
      .watchQuery<any>({
        query: ME_QUERY,
        fetchPolicy: 'network-only', // ensures fresh data
      })
      .valueChanges
  }
}
