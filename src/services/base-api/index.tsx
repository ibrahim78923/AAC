import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIxNThjMjU3Yi01MmYwLTQ5OTUtOWNiZi1jMmRjZDJjZTMwYTEiLCJldmVudF9pZCI6ImEyMzkyOGNmLTBkOWEtNGFkZC1hYzc5LTY3ZDg0NDliZmNlNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAwNTQ0NjcsImV4cCI6MTcwMDE0MDg2NywiaWF0IjoxNzAwMDU0NDY3LCJqdGkiOiJiYzM4ODNhMy0xZjgwLTRkNTYtOGQ1Zi0yN2I2YzJkMWE5MmEiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.C64sS_hxgl__MCpqFFIhv24eSMdpYr2oRL4mvhf_2JFrw4E3HSYhRJ6LOqJ2dQZyBGsSUpyAHdIY75nj-UTJ9j5VJcJW6sRVwNHL_9nkI3yaSMymqqf5KTajiXOJt_vp_Fu2jV5-C6b7ASwuPP5yXj4qCxwYu1PDQgEBSONXskDYpHuwxMl0_YtnIS39ULK9y0D-30yc92aTS7FFnK6hDx1mEI9EuhUuYKN_vh160DmrSMzFanVKEfR4j7HYv-DOCekB_d7XXucjQp7F-Ay4gdvMj3rIGiKLx2z3ZwrWZQnJrjF1QQ3oeJSDZWkYSC0RN61j67iPOhEg-Lu72KguKg';
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
