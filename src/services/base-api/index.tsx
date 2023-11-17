import { BASE_URL } from '@/config';
// import { RootState } from '@/redux/store';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIzY2VlY2FmYS1lNGUyLTRkYTktYWI5Mi1iMWIzZjUwODE2YjciLCJldmVudF9pZCI6IjE0MTdiZDg0LWFlOWUtNGYxNy1hYzZhLTM1ZmI3NmQ2N2JhZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAxMjY2ODgsImV4cCI6MTcwMDIxMzA4OCwiaWF0IjoxNzAwMTI2Njg4LCJqdGkiOiJhYWMxMWY2NS00OTcwLTQ3NjAtYTVjMS1mMjU2NjA4OGQxNjYiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.cFGxMvYSXLpcULxez1Xer8GLph9A8vebaikxJxnRbjmxg2KDa8t2oM049ZTl6OYmoO-1nLDn6C_AVMtH3gDKCOziN3DKYbE0fD6iWxLGYoIpNXPvoMZP5zEiYPJn3iwJZ_2MpFzsDwsOWXCsHJ_0sOn1NRVJsQmjN6HmY517axEQHtN3OVH4cdnAvUXQgsTm7u0AKLsbOUYK1uMYBPh9rcPiUSLF2VfODN9pELHX4rIjJ4dotgBdxNPUgmH_ieP8-GWZ4f6yypn98Y6X8ygRNnfKszrxFP-bC5ji1pleNv8QAm-EtFKrOaXgczBNZiYcxk814tqG_ErlE7hv_6xAhg';
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
