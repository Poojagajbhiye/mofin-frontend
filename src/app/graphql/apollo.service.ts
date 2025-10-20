import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const http = httpLink.create({ uri: 'http://localhost:4000/graphql' });

    const authLink = setContext((_, context: any) => {
      const token = localStorage.getItem('token');

      return {
        headers: {
          ...(context.headers || {}),
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    this.apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
