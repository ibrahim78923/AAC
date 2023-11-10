import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJjMTQ0MzkwZi1iNjcwLTRmYTQtODYwMy1hMmM1ZTkwNmYzYTMiLCJldmVudF9pZCI6ImY1OWVkMGM3LWEwNTgtNDQ0NC1iODc1LTEzNjQ4YWU0ZWNlZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk1ODczMTMsImV4cCI6MTY5OTY3MzcxMywiaWF0IjoxNjk5NTg3MzEzLCJqdGkiOiIxZmZjYWVkMS0zODA0LTRjNzctOGJiOS0xMzMzOGM2ZmI3ODQiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.XuoUcyxHKEZBC8kFCtAx0k6mFkTvfk9c4Y0dafmgbrQs9g3JAv-l8d-iOy2fduyJD3QN-FjgT2E_34Z1Vr2GypTIuDH8YeWk3sWC2F3xgMks-RMnuaueqGjhvVVrVqxvRDYJ-L8WX5wxnuSgQ0amx5FIAmjd2B9TPPl7q660H9WZ9WK13lXSFbHUVSYw-XcLAGBgrKbla2NcWl34gQxa8Cy-weaVhVDQVeGYEE_hnLvLE4ETXekkGgVZgLBqkA34GqGK1mMobdCrYXD765_UhzA1-ugGS7AL0R5rms4FFGDSd0qWZWFzLCjNuovCeH_6ZfvXwE0PndFJh_NMcSqu1Q';
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
