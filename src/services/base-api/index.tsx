import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiYzVkNmJmYTgtYzU0NC00OTM2LWIwZDgtZjQyMzE4ODRmMjA3IiwiZXZlbnRfaWQiOiIxZTJiMTFhNi04OTk1LTQ2MTQtOThiNy0yZGEzZjliNzhjMDQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NzI4NTk2LCJleHAiOjE2OTg3MzIxOTYsImlhdCI6MTY5ODcyODU5NiwianRpIjoiNmZkZDdkYzQtMWE0OC00ZTNjLTg1ZjAtMmIwMTljNjkyZjc3IiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.llC-87Sf7o6sQQuijNw2SXzUOuS1B4I9ePpG0oJ5Ljc9ibwzW3dM6fnml8AZySe1AxqltJgE7tDlK2gQz67KMvka5Z7tM9JQpEOBjimfsQ8QNNjUv53ozzrwB1IBv3fdVT8phSD7KC8UIrZIDjOlXoEwSN-GrCi2tMRYEiu076DtcR73jZwBRKIvFvMAxAx6luiG8FJgv-xlQ_Ygdgf8dLbyDF9Mcj6LRNqLA9aLqB8h9_TDXvPKSNFzSncupK4mbGe6Y4cQ6Cxljvn9VmrzI284n0Z2WsD6wtnzQfSuT4RpaEIcZ5a5EyZueDeNn1jUe_gl0uiauuBOo6NIQGnsug';
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
