import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiYTQyYTNhYmEtZDJhOS00N2E0LWFiYWYtZWE2YmM1MTk3MTUwIiwiZXZlbnRfaWQiOiJkYjBmODllNS1hMWFhLTQ0YTUtYmQ0Ny05ZTc4OWU4NGQ5NjUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NjQ4NDM5LCJleHAiOjE2OTg2NTIwMzksImlhdCI6MTY5ODY0ODQzOSwianRpIjoiZDI1YzllYjQtNmJhMC00Y2RmLTlmY2ItYmZiMjBlZmNjMDNkIiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.TRpdEG6pIpEnp_-x5Tf1XvI1Vjmz8jf876-GQ3xbAxzUrZgMWhu22fC45HtOdKDDsp_iBXiqZ1oxpJw8duwZ5WpSl8KVBdYCA7ZJ77uGqc7JIDjaVofMZgi9ebqawJScVnyV8SQzDFHeqqIGnUll1RCyB_J_wzAdD6A1HSwrTL7ZC0kyI7yaB6kIpXkfESozqfRMYvMzrc4MplyXeV2dfif5JLyB89rrkNVnTrr60IVCDiz2jB4FiWfw6slgXRLSDzctQ7pNQj82tNUkLGVlpDIi1l48OsaCtbgWmxZ-yrSMeVUk3tyzOgN4BzuXE82YIxXYUsGlf8BtlAK_nbb0gA';
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
