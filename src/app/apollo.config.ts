import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.development';
import { setContext } from '@apollo/client/link/context';

export function createApollo(): ApolloClientOptions<any> {
  const uri = environment.apiUrl;
  const httpLink = inject(HttpLink);

  const authLink: ApolloLink = setContext((_) => {
    const token = localStorage.getItem('token') || '';
    console.log("TOKEN: ", token);
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: ApolloLink.from([authLink, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [provideApollo(createApollo)],
})
export class GraphQLModule {}
