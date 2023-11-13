import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI5MWRkNjU2ZS05MzM2LTQzZTItOTcxOC1hNjQ2MDNhNmNhODIiLCJldmVudF9pZCI6ImE0OGM0ODliLTI5YzgtNDY5Mi05Njg3LWMwM2YwZjkxZjdlMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk4NDUzMjMsImV4cCI6MTY5OTkzMTcyMywiaWF0IjoxNjk5ODQ1MzIzLCJqdGkiOiIyZDVkMDAyNi1hMDhkLTRmNzAtOWQ1NC01YTZlNWY2YTI2Y2MiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.J1bHCapRnkvrzgOGH-c7ZF3sJaiA6f6lTNs45Eq2TSzGJlXdJ_zKoXT5Wsr3hG62V7Q2rXnKcaABQ8tAY4v97GdYFuRpJQsKLi6KRKuXjC4NBZXitRQMElaLgYoeNKl3nBkriQaUKklfdysJc78V22-orgo_C06BXVnyIfO0vO_CIRpr08UjO8DDLsAiNrZ2tm2yOD53xsA-SsrigI1vNgAW0jMyYhxTU09Fi2hemlNgRklZmS8OrGIbQYMVmZcY87c41AVhmah5O2xvDVZczt-8XKCQJJLcXHBbumh3jjiUTlaWxyBv8mKAB-zCylSrXvtZL7ozGU36veradjIWWg';
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
