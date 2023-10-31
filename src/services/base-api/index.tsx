import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiNzBkMmIzMjYtYzI2MS00ZjUxLWFiYzktNGZlY2ZlYzNlOWZiIiwiZXZlbnRfaWQiOiJlYzBmMmM4Yi04ZTU0LTRiYzEtODgyZi1kYzYxMWUyNWUyNDEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NzQ0MDg0LCJleHAiOjE2OTg3NDc2ODQsImlhdCI6MTY5ODc0NDA4NCwianRpIjoiNDYxYmRlMjAtMTIwMS00MDFjLWJjMDctMDZlYTUzMDY4NjM4IiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.YHz2D9cn5rqT1GvOW2VJ-50IZPrSRVhdTtFfZwK7y9KwbOVoxygCN01NHduJBKrItxERZgvdWgu4IMN6VKw8YmgpcKw3n3f5pnW7ik5JUO484bZ1EYn9ml3N2ZqBd7Q4YGJsZFe6Rc_l0ZQFVasy061o629nbRl2n8H2Wm1JpDKR6SB5y-ef7OZJyYahbRiAqk7eJ00uIWw9_5ZsnJwJI_XthMf4pAYTxDTZVx65MYclxan3QaqydGd7Wf9G2k2mWxer7BMIFcV5N481Po66HfYkl5Hv0yzKAu2BHII2SRzM0MJI3nbGfFWtiXqMVtGSpUJsHBjRxVMqQAZnsVnqtg';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
