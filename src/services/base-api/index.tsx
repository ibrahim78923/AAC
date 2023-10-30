import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiZjc3ZTYwOGQtOGE2ZS00MWU5LWJkNDEtMGVmNjg4MDg1N2QwIiwiZXZlbnRfaWQiOiI4M2ExMjA5Ni0yZDg1LTQ2N2ItOTljOS0xMWFlNzI1MTgzYzYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NjUxMTEzLCJleHAiOjE2OTg2NTQ3MTMsImlhdCI6MTY5ODY1MTExMywianRpIjoiZTFhOTYzMmEtOGFlMy00NDAzLWIxYTYtN2E1ZjI0ZDJmMTcwIiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.d9Yh-qyISeVqKSIFF3QiqCLq7ypSW10x-5BOWy9FxB2sKuJhM_SLd8ewU7fy1FInWcF7oVJgJWPrsVYePRPSdSFa85C9atCNj92ua4AfLPqwdescA9dlhDGo1aWRqNGgvH7Dm6uKfLSorOm5uX4eeucy-QZFktuOa61GMBW_oeBFxF0LUVUaY12shn83zDB_S1iC5Ikd5d9bne-NX48QSCT6AuWNJV4CdU5miY79uWKBqz1i2dszabuXtLp7o7OWOurJKmWtUuWr4hI7-bs3cJmaFCHglKaptQB4J-qEAOnOIe5HBBX8llNTUVfsNrz4DfXQy8qDSYSnzbHIK92s-g';
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
