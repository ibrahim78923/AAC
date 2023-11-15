import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization', 'TICKETS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiZDM5MjQzZTYtNTUxMi00OTk0LWFmYjAtOTUzMjI5M2VjYmFhIiwiZXZlbnRfaWQiOiI2ZTVkYTc1Zi0xOGYyLTRmNzYtYjVlNi1iZTU4ODQxYmQwNTUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAwMDM1NTc4LCJleHAiOjE3MDAxMjE5NzgsImlhdCI6MTcwMDAzNTU3OCwianRpIjoiODIxNWI5NDctMjIxNC00YWNjLWE2OTgtMGM3ODU1MzRmYjM1IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.Y6RIBPvZWWWTSeykOp8ci096tPXNk8zFcaHLjoc-E-jrBLy6bez488HawhEILSGnFD_7q76S6VBmKOAEGJ_UzgDvCvpbI6qumuu4q-3fkXZJBQ-J7Qvf4shIMezzsYcuCAnNAA57-SJPNDuy8K67ZxWB_aXZV855s4KsERUZfWfmwrUo7xkT1ekJ6hI1Zwf0rwgo9Fj22fol47d37jSMV8U68jDoJ8eGP1N89NbyTtTlnR1eps3IO3ujC6sylhS0yMhjlSLqYo6Ipev257oD0L5CJ4WwWEC2STwWrXQyOHNFIbcvRMb84f4mjHFp-M7UlTDlBFyvKpGPjCAmkhlhPw`;

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
