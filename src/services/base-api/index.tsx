import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJmZTQxZTc1MC00ZGEwLTRiYzUtOTBkMC1lZjRjYjk3OTA0OGUiLCJldmVudF9pZCI6IjU1MTQxMzczLWJhNzMtNGY2Yy05MzU3LWMyMjlmZjQwNWMxOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg4OTgxNjYsImV4cCI6MTY5ODk4NDU2NiwiaWF0IjoxNjk4ODk4MTY2LCJqdGkiOiIwNTY1Y2Q1Yi1mNTQ4LTQxNDUtYWZmNi1kMzZkNzcyOTUyMjQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.Ka7M9khk8NT46wVmSR_gpsURkoeXyLmm7jYbvzCY-XfHFfdI335ge3ix7JxNjCS-GERcTwshFwftorWdQw2sgf3uk1iVDWRSx2MRRnm4A0XLYsLwr4_5ISC3C0KzFh7gTsZ8u8LF-Svtrj_BuspxA9C3eHKZjFGYK2f94oe2YPUAB_l8D2D17ZS8kaB8_31iJYmnp95AeVarsqGptPSyKagUELd_KqDKbRYkfhDOkoUlfFM5djJoLsL3BDJZmnAX9uLwcollRNQIFQHG5mIG31WBwnbG80Sn9reFM4G7DUdkRT6t3urxMMxuAW8JEMwTEd99AEGoE_vvhZl7ZUJjqA';
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
