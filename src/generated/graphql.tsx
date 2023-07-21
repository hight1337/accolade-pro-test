import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/** A `Lift` is a chairlift, gondola, tram, funicular, pulley, rope tow, or other means of ascending a mountain. */
export type Lift = {
  __typename?: 'Lift';
  /** The number of people that a `Lift` can hold */
  capacity: Scalars['Int']['output'];
  /** The number of feet in elevation that a `Lift` ascends */
  elevationGain: Scalars['Int']['output'];
  /** The unique identifier for a `Lift` (id: "panorama") */
  id: Scalars['ID']['output'];
  /** The name of a `Lift` */
  name: Scalars['String']['output'];
  /** A boolean describing whether a `Lift` is open for night skiing */
  night: Scalars['Boolean']['output'];
  /** The current status for a `Lift`: `OPEN`, `CLOSED`, `HOLD` */
  status?: Maybe<LiftStatus>;
  /** A list of trails that this `Lift` serves */
  trailAccess: Array<Trail>;
};

/** An enum describing the options for `LiftStatus`: `OPEN`, `CLOSED`, `HOLD` */
export enum LiftStatus {
  Closed = 'CLOSED',
  Hold = 'HOLD',
  Open = 'OPEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Sets a `Lift` status by sending `id` and `status` */
  setLiftStatus: Lift;
  /** Sets a `Trail` status by sending `id` and `status` */
  setTrailStatus: Trail;
};


export type MutationSetLiftStatusArgs = {
  id: Scalars['ID']['input'];
  status: LiftStatus;
};


export type MutationSetTrailStatusArgs = {
  id: Scalars['ID']['input'];
  status: TrailStatus;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a `Lift` by `id` (id: "panorama") */
  Lift: Lift;
  /** Returns a `Trail` by `id` (id: "old-witch") */
  Trail: Trail;
  /** A list of all `Lift` objects */
  allLifts: Array<Lift>;
  /** A list of all `Trail` objects */
  allTrails: Array<Trail>;
  /** Returns an `Int` of `Lift` objects with optional `LiftStatus` filter */
  liftCount: Scalars['Int']['output'];
  /** Returns a list of `SearchResult` objects based on `term` or `status` */
  search: Array<SearchResult>;
  /** Returns an `Int` of `Trail` objects with optional `TrailStatus` filter */
  trailCount: Scalars['Int']['output'];
};


export type QueryLiftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTrailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAllLiftsArgs = {
  status?: InputMaybe<LiftStatus>;
};


export type QueryAllTrailsArgs = {
  status?: InputMaybe<TrailStatus>;
};


export type QueryLiftCountArgs = {
  status?: InputMaybe<LiftStatus>;
};


export type QuerySearchArgs = {
  status?: InputMaybe<LiftStatus>;
  term?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTrailCountArgs = {
  status?: InputMaybe<TrailStatus>;
};

/** This union type returns one of two types: a `Lift` or a `Trail`. When we search for a letter, we'll return a list of either `Lift` or `Trail` objects. */
export type SearchResult = Lift | Trail;

export type Subscription = {
  __typename?: 'Subscription';
  /** Listens for changes in lift status */
  liftStatusChange?: Maybe<Lift>;
  /** Listens for changes in trail status */
  trailStatusChange?: Maybe<Trail>;
};

/** A `Trail` is a run at a ski resort */
export type Trail = {
  __typename?: 'Trail';
  /** A list of Lifts that provide access to this `Trail` */
  accessedByLifts: Array<Lift>;
  /** The difficulty rating for a `Trail` */
  difficulty: Scalars['String']['output'];
  /** A boolean describing whether or not a `Trail` is groomed */
  groomed: Scalars['Boolean']['output'];
  /** A unique identifier for a `Trail` (id: 'hemmed-slacks') */
  id: Scalars['ID']['output'];
  /** The name of a `Trail` */
  name: Scalars['String']['output'];
  /** A boolean describing whether or not a `Trail` is open for night skiing */
  night: Scalars['Boolean']['output'];
  /** The current status for a `Trail`: OPEN, CLOSED */
  status?: Maybe<TrailStatus>;
  /** A boolean describing whether or not a `Trail` has trees */
  trees: Scalars['Boolean']['output'];
};

/** An enum describing the options for `TrailStatus`: `OPEN`, `CLOSED` */
export enum TrailStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type GetAllLiftsByStatusQueryVariables = Exact<{
  status?: InputMaybe<LiftStatus>;
}>;


export type GetAllLiftsByStatusQuery = { __typename?: 'Query', allLifts: Array<{ __typename?: 'Lift', id: string, name: string, elevationGain: number, status?: LiftStatus | null }> };

export type GetLiftByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLiftByIdQuery = { __typename?: 'Query', Lift: { __typename?: 'Lift', name: string, elevationGain: number, status?: LiftStatus | null, trailAccess: Array<{ __typename?: 'Trail', name: string, status?: TrailStatus | null }> } };

export type UpdateLiftStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: LiftStatus;
}>;


export type UpdateLiftStatusMutation = { __typename?: 'Mutation', setLiftStatus: { __typename?: 'Lift', id: string, name: string, elevationGain: number, status?: LiftStatus | null } };


export const GetAllLiftsByStatusDocument = gql`
    query GetAllLiftsByStatus($status: LiftStatus) {
  allLifts(status: $status) {
    id
    name
    elevationGain
    status
  }
}
    `;

/**
 * __useGetAllLiftsByStatusQuery__
 *
 * To run a query within a React component, call `useGetAllLiftsByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLiftsByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLiftsByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetAllLiftsByStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLiftsByStatusQuery, GetAllLiftsByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLiftsByStatusQuery, GetAllLiftsByStatusQueryVariables>(GetAllLiftsByStatusDocument, options);
      }
export function useGetAllLiftsByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLiftsByStatusQuery, GetAllLiftsByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLiftsByStatusQuery, GetAllLiftsByStatusQueryVariables>(GetAllLiftsByStatusDocument, options);
        }
export type GetAllLiftsByStatusQueryHookResult = ReturnType<typeof useGetAllLiftsByStatusQuery>;
export type GetAllLiftsByStatusLazyQueryHookResult = ReturnType<typeof useGetAllLiftsByStatusLazyQuery>;
export type GetAllLiftsByStatusQueryResult = Apollo.QueryResult<GetAllLiftsByStatusQuery, GetAllLiftsByStatusQueryVariables>;
export const GetLiftByIdDocument = gql`
    query GetLiftById($id: ID!) {
  Lift(id: $id) {
    name
    elevationGain
    status
    trailAccess {
      name
      status
    }
  }
}
    `;

/**
 * __useGetLiftByIdQuery__
 *
 * To run a query within a React component, call `useGetLiftByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiftByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiftByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLiftByIdQuery(baseOptions: Apollo.QueryHookOptions<GetLiftByIdQuery, GetLiftByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiftByIdQuery, GetLiftByIdQueryVariables>(GetLiftByIdDocument, options);
      }
export function useGetLiftByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiftByIdQuery, GetLiftByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiftByIdQuery, GetLiftByIdQueryVariables>(GetLiftByIdDocument, options);
        }
export type GetLiftByIdQueryHookResult = ReturnType<typeof useGetLiftByIdQuery>;
export type GetLiftByIdLazyQueryHookResult = ReturnType<typeof useGetLiftByIdLazyQuery>;
export type GetLiftByIdQueryResult = Apollo.QueryResult<GetLiftByIdQuery, GetLiftByIdQueryVariables>;
export const UpdateLiftStatusDocument = gql`
    mutation UpdateLiftStatus($id: ID!, $status: LiftStatus!) {
  setLiftStatus(id: $id, status: $status) {
    id
    name
    elevationGain
    status
  }
}
    `;
export type UpdateLiftStatusMutationFn = Apollo.MutationFunction<UpdateLiftStatusMutation, UpdateLiftStatusMutationVariables>;

/**
 * __useUpdateLiftStatusMutation__
 *
 * To run a mutation, you first call `useUpdateLiftStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLiftStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLiftStatusMutation, { data, loading, error }] = useUpdateLiftStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateLiftStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLiftStatusMutation, UpdateLiftStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLiftStatusMutation, UpdateLiftStatusMutationVariables>(UpdateLiftStatusDocument, options);
      }
export type UpdateLiftStatusMutationHookResult = ReturnType<typeof useUpdateLiftStatusMutation>;
export type UpdateLiftStatusMutationResult = Apollo.MutationResult<UpdateLiftStatusMutation>;
export type UpdateLiftStatusMutationOptions = Apollo.BaseMutationOptions<UpdateLiftStatusMutation, UpdateLiftStatusMutationVariables>;