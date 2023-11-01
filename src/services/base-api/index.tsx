import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJiMDc2MDE1YS1lM2M1LTRiOGUtODA2ZS0yYzMzZmEyM2E0ODIiLCJldmVudF9pZCI6ImM1YzdjZjIyLTY0MmQtNDhjYy1iNjM4LTM3YmZhNjE0Mzk0MiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg4MzMyNDgsImV4cCI6MTY5ODkxOTY0OCwiaWF0IjoxNjk4ODMzMjQ4LCJqdGkiOiI1MTBlZjMxNS1jYWM0LTQ5NWItYWNkZS1hOTRkY2YzOGRjYmYiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.fYuhUQ-70Vnv-lI1MNPpj-L9RlDzqarq5EJ9cffz0spum2125JhBIDzLKNsgl7UxS5X-ge087vA5EyH_3RP7e7sFg0Y4lfr1TE7LACZ3JwyLzc_tRc3I8p-jjg6BFKwa3YzkngWTqlLdKtbQhJFpiEs5hLgDjtsERZKAr8Y2S2eEIvF4D1OiO7MaaZ7HwQad-oyVNCMVxZy3CiP7kJ1gndiE1TPTORdgwuoCzH706S1_9YpfrH7VIkVsKqXPvAOgpEkQakCTzGp5x6FDVMuT36zMVs7Q6tQJH3_CodlZw_uSFchX-3QgU31DTwDyrFlgHo7QhhNneNiRXeX6XqJ9nA';
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
