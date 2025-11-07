import { gql } from 'apollo-angular';

export const GET_EXPENSES_QUERY = gql`
    query GetExpenses($userId: ID!, $year: Int!) {
        getExpenses(userId: $userId, year: $year) {
            userId,
            year,
            months
        }
    }
`;