import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJkYzk2ODBjNS1mMTQ3LTRkYWItODQxNC0xMzUwYWEzZTdlZTQiLCJldmVudF9pZCI6ImNiODE0NzY0LTg5NTUtNGQ2YS1iOTA1LWE0YmVmZDUwMjA3YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk5MzM3MjYsImV4cCI6MTcwMDAyMDEyNiwiaWF0IjoxNjk5OTMzNzI2LCJqdGkiOiI0MDRjNzA1Mi00N2RkLTRiNjQtYmRlYy03NTAxNmJlMzBmM2IiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.ph-7twO7U7zq40vHWfGp6S_OAivcuzRi1A1ZBKvtsrgZJp1ww0ofH6JVP3DjLvfOy9jVcnTDzhNQ4Z65zSZOwh4cV1ugy7aqwu3W80blm4BaR58YGtzDgxEaNgfT0UmEwQuzROHSUzAaiKUhBxcL0il7lizSq2b2zWD0YSxuoKdq2gG7c3SyV1Gsy1Nh7_4tuqPGF6FhClRoDH4br7S4cl0Jeqe3OG6Ww6gd_VxIkYq5gUkjWSVdZ9E2hEZ5UY2wEOw5MO3G4sLCUfANVDPEAA07ROMpAFudG10GEUEpaNsdQ03lg65Ve8kMckiaOlfWBOkTq8y4KaC7G67UBwoQNg';

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
