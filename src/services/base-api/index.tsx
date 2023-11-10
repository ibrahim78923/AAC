import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIxN2E4N2RmOC1jNmM1LTQxNzYtOGFjNC1iMWE0NjE4MWMyNTMiLCJldmVudF9pZCI6ImM2MzZjODYxLTM1NGEtNGUxOC04MzU4LWQxZWE5Nzc3ZjRkYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk2MTA1NjksImV4cCI6MTY5OTY5Njk2OSwiaWF0IjoxNjk5NjEwNTY5LCJqdGkiOiJmMzY0MTIyMi1jNjQwLTQ2ZGQtODIwMS03N2RkZGQzNWZhODUiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.nYj55j4WhH9DFra3nIN7Mis_rhsf53HaBEuychE46Bz45ucRNZuxbe_PFGxNNa7jaNVce6DlJYPeO3BTWQB7HblwpOphYjYr9XXcJDAMM-J4EomgsaJkFVzYi1EVV0Zd6Rm63cSSEsBcvYtM4E9uM_I6ZcuiZNK9-YWqcMsh_tVpVoxOHry-42nb6OPr6qYPIWA6abtlgrqRDd_BN4sJYAgar4oVmOVG6A3Q3KBZQ_eCj4u8glsBkqbBBnumq-vScKT9owrKkRboBSEg-EyMvSo9Hom0xGbWSvuJ3uEwRgffWpU1aBqq8N2p3ZYVlt9xTV2W8vp7sXcuhwXes2NBow';
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
