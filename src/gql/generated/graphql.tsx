import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  profile?: Maybe<Profile>;
  resendConfirmation?: Maybe<TmpEmailResponse>;
  forgotPassword?: Maybe<TmpEmailResponse>;
};


export type QueryResendConfirmationArgs = {
  email: Scalars['String'];
};


export type QueryForgotPasswordArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<RegisteredUser>;
  login?: Maybe<AccessToken>;
  confirm?: Maybe<Scalars['Boolean']>;
  refresh?: Maybe<AccessToken>;
  resetPassword?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmation: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationConfirmArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  confirmation: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  ukey?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};

export type RegisteredUser = {
  __typename?: 'RegisteredUser';
  ukey?: Maybe<Scalars['ID']>;
  tmp_confirm_token?: Maybe<Scalars['ID']>;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  ukey?: Maybe<Scalars['ID']>;
  access_token?: Maybe<Scalars['ID']>;
};

export type TmpEmailResponse = {
  __typename?: 'TmpEmailResponse';
  tmp_email_token?: Maybe<Scalars['ID']>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  confirmation: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'RegisteredUser' }
    & Pick<RegisteredUser, 'ukey' | 'tmp_confirm_token'>
  )> }
);

export type ConfirmMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ConfirmMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirm'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AccessToken' }
    & Pick<AccessToken, 'ukey' | 'access_token'>
  )> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'email'>
  )> }
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $confirmation: String!) {
  register(email: $email, password: $password, confirmation: $confirmation) {
    ukey
    tmp_confirm_token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmation: // value for 'confirmation'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ConfirmDocument = gql`
    mutation Confirm($email: String!) {
  confirm(email: $email)
}
    `;
export type ConfirmMutationFn = Apollo.MutationFunction<ConfirmMutation, ConfirmMutationVariables>;

/**
 * __useConfirmMutation__
 *
 * To run a mutation, you first call `useConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmMutation, { data, loading, error }] = useConfirmMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmMutation, ConfirmMutationVariables>) {
        return Apollo.useMutation<ConfirmMutation, ConfirmMutationVariables>(ConfirmDocument, baseOptions);
      }
export type ConfirmMutationHookResult = ReturnType<typeof useConfirmMutation>;
export type ConfirmMutationResult = Apollo.MutationResult<ConfirmMutation>;
export type ConfirmMutationOptions = Apollo.BaseMutationOptions<ConfirmMutation, ConfirmMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ukey
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    email
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;