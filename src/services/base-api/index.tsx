import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiMDIxZDdjMTEtNWU1Ny00NThlLThkZjQtNmU2M2EzYjUwMmI4IiwiZXZlbnRfaWQiOiJkZDI2MTY1Yi1jNWJkLTQwYzMtOWYzOS02NjkzZDY0MzJlOWUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NzQyOTkwLCJleHAiOjE2OTg3NDY1OTAsImlhdCI6MTY5ODc0Mjk5MCwianRpIjoiMzkyYjMxYmEtY2ZkZC00Mjc0LTk0MmMtYjZlMzY1MmU3MmU1IiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.ZjRGh8v7Y1it6U0dC2PBWAEDBwtBFMf7z485khFSgoAouvx5Ajpn1Vgxa_UueNQxvqGJg8oT4a8HprvmDajU9SeOKWPg9LC1lL3Ma4bNDJC8y1QhdnvmI1kVYnTRo6flQyk3QycDpvUSla79DUm0bRh44ihwCLpLaog0hSSWjRmX2n-xOVyJe9SGG-xfYvy0VY-PyRbbnPuAzmsIPojnBhxKUVM323uaKJf-HfSc7WOcqPXlN4TsaKbZpHnnUBikyfF_6y9WXOoiIPzp3p6UHG_fSvCFZN0LS15bnYilB9AsnbHUXbLCb_833d-1ajnHFCJOn-bjrA7gU3BRXA6g0A';
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
