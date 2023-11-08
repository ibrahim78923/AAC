import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI5NDk5NTVkNi1lZTkyLTQ3YjMtYjFiYy00YTk1OGY0Y2NjOTUiLCJldmVudF9pZCI6ImNiOWY4ZDZmLWZkNGYtNGRiMS1hY2U1LTA4MTJlNGRiODVhNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk0MTU3NzcsImV4cCI6MTY5OTUwMjE3NywiaWF0IjoxNjk5NDE1Nzc3LCJqdGkiOiI4ZmQ0YThmMC1mOWI3LTQ3NWUtYWRhNy1hYWZhZjYxZGNkNzkiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.FuAErhy3s5rUstBSO1LssPKzYl9BaeXktnS5qt_XPHFpj8jfF85DP74VLwiezJav6FyGDYMNJYs2ATi_11lkSDg3ZYKG16ipT0Veh3ynNoWyJ7wZO8G3SVuN6SpPTsS2s0OJCEdyCOy5IOugNGnz4IEjKdF9c5e6sFoXHN1rhcTMUhcrAH5H9h0nHDOc1AbvzV0YTLSItDVEVehGJFHFXbdzvDHNeiXaGXfJu1Q1SYfg2x1KQt3DuQTDzYvqGUD0LoqgIbvtqCkwc4jlOayZemuJMqpaHTL7JK5i05nHk7BAF8RwdUJQvSb2rFln6nqeBE0ZEcHNcd35k-1eJBIPrA';
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
