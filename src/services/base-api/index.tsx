import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI5Y2UxNjcxOC1kODAwLTRkMWEtOTY3Mi1hMGI0YWFiYjdlZGQiLCJldmVudF9pZCI6IjlkMmZmNjQ5LWZlY2UtNDQ5NS1iYjVjLWMzZjRmOWE3ODdmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAxMTU5OTYsImV4cCI6MTcwMDIwMjM5NiwiaWF0IjoxNzAwMTE1OTk2LCJqdGkiOiI5NDViNWI1Zi1kMGNjLTQwOTgtOGQ5Ny1jMTI4NzRmZDMxNDAiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.jnFUrzBmvPEC_XvoKV-qC2D1El61hbsz06idk7B_A3rTni0UN8ee4zA3Gaa_ex3e9v9-3fPYAwF-AwiAUx0dQqXvqrxZmaPR7qt6hC5RMLgU_Yn6aXOTLRSQazeDxqFxa-x60NxpcxFS6W-8c2gJMv1Xqaf5V3UMkVf0XGY3iprxU7uEe8uiix6SnBYiju-mJpiuDWYsU9S6dI2HH4139a9SjnFKIQUaY8suGjzUWh4uN2aL3H7pY7q0KUZhUY7VZcROoahAofs1T0QF4cQdhSAnkiIJa1tmJeiOYHKMd9uekdR-Lc93FtqoykRk2D97mCS0UMSPk-h6KgypZY8CWw';
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
