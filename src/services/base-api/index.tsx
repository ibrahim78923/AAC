import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJmYjU3NDQ2Ny01MzNkLTRhMDYtYmM2ZS04MzZjMDhjOWI1YzQiLCJldmVudF9pZCI6ImM1Njg1YzYyLTUwZGItNDk0Zi1iZmE0LTQ5M2YzYjM3MzRjNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAxOTQxOTYsImV4cCI6MTcwMDI4MDU5NiwiaWF0IjoxNzAwMTk0MTk2LCJqdGkiOiI3MDlkYjNiMC1kMWMwLTQ0MWQtODg0ZC05OTViOTAwYzQ0OGYiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.otnVNhIxAxhl7x7r3Eh-kTrlFA0cU1sC88HCT2peWJeJKgIcnmwWUQPpICpckBvgI6p7bXc9QQtpo2BBfGsAlSvqfZBvMu5XeKq3rZjUwJbD692sz_uvhWn7F7KXNJJ6QiJGyVAAdlJY3XvNJXQs6o1lXQab1voKO-9PKqYRYH7qhAMfptuBJQLGafZpsoR_y6to_68uvON4Et3z_HZGzwYmA8nI6tC2AZx1Yx7L_Ll5yiJJa4bXO8q18WnbiL2rW6Q3RynLH2uuwPeOEgrWwmLTyjxY6LAe9cyie-DiRPClmQXXXrYsj16psXtjAvDNBtdxgLKo_5syIBd3V-ueQQ';
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
