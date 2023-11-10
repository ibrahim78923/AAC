import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJlOGIwMmNmYS0xYjhmLTRmNjQtOGVlMS03MWI1YTk1ZDdkNDMiLCJldmVudF9pZCI6IjU2N2RhYzFkLWJjNTEtNGRjNy1iZTAzLTA3YWUwYTJhNGI1YyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTkzMjgyMTMsImV4cCI6MTY5OTQxNDYxMywiaWF0IjoxNjk5MzI4MjEzLCJqdGkiOiI1NzY2NjAzMC00YjNhLTQwOGItYmEzOC1lMTNjZDY3N2VhYzQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.YccVOeONIp8YSc2Qupe2vv1MtMvJzRzDxW8s_3dnOPBka9HY6M5u_tszbOuYBWxjMZGaGQmZwLB-snbKLV3rO5VMU8szzqvi5pibHx-nRU8GB_b6UpgsU-kS5XCbLOmNh3BXLJyn0Shf3aKEBbNK9gC2Tvz7rH9GPg1H-ZEufrpexAFveJWUP5RN-AOLbU5tjXpM8bnCKTmw_gsqnqIgvPiI5eIZybqxstcdb6X95SrNDF0d9llk55ZIEBjHDqCSkeL8n48xbOHhJUcg7-d4jB8Na1YWFEzNZyUw7G2ozeEOwI4MK0oxRloaM5M2YOGaY2GraEqPLigBsluojq76ZA';
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
