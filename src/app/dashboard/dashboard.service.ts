import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private apollo: Apollo) {}

  /** For main account (admin) */
  getRequests(status?: string): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          query GetRequests($status: String) {
            getRequests(status: $status) {
              id
              type
              status
              userId
              parentId
              year
              month
              data
            }
          }
        `,
        variables: { status },
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(map((res: any) => res.data.getRequests));
  }

  /** For sub-account (member) */
  getMyRequests(): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          query GetMyRequests {
            getMyRequests {
              id
              type
              status
              year
              month
              data
            }
          }
        `,
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(map((res: any) => res.data.getMyRequests));
  }

  createRequest(type: string, year: number, month: string, data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateRequest($type: String!, $year: Int!, $month: String!, $data: JSON!) {
          createRequest(type: $type, year: $year, month: $month, data: $data) {
            id
            type
            status
            year
            month
          }
        }
      `,
      variables: { type, year, month, data },
    });
  }

  approveRequest(requestId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ApproveRequest($requestId: ID!) {
          approveRequest(requestId: $requestId) {
            id
            status
          }
        }
      `,
      variables: { requestId },
    });
  }

  rejectRequest(requestId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation RejectRequest($requestId: ID!) {
          rejectRequest(requestId: $requestId) {
            id
            status
          }
        }
      `,
      variables: { requestId },
    });
  }
}
