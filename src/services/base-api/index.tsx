import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJiOWYxNGQyYi05ODgzLTQwOTMtYTZhZS0zNDhkODFlZTAwZTQiLCJldmVudF9pZCI6IjdkZjk2NDZjLTY4MTYtNDZlOS1hZjcyLTk0YjkxNDJkODg4MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk5NTg1NjcsImV4cCI6MTcwMDA0NDk2NiwiaWF0IjoxNjk5OTU4NTY3LCJqdGkiOiI3YzFiMjJjMC1lYzhlLTQwMjItYmFjMS1iMWJmNjExMWMyMjIiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.MNSIX8dthRcgNcKWuqOkYPyc6jrC5ijq8GOSZlkLivKNdMvO324HWBt2lhzM3PycrjET0-lCZyIXqKStwUJTfQ_8LVEV61n1YXO90WGa4mYsfttm_cZBFpJXVV94sd-az_Ovwpx1uIjsjboKNTF0VwGtrCk1R5hSyjfFjHWdXHPGh9mNRC948d-8ab3rQjUqWUOVtTGFXVPsEZ5b71ZKyR4KxI3ZXVq6TOhWclxGbsSL2bCMhurzteWgeMGuMrR7lPNu5tzLfkaR8cgRRQ0VfX-QirnhEXcHRAcbTo1dGa2MzCOwSiVQXoKzb_ZHapRwCCI7gzz6khzTBUlFe4t8SQ';
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
