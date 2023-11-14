import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJkYjkxMzgyNi1mMmU1LTRmMWUtOTg4Mi1hNjYzYTM1ZTI1MzciLCJldmVudF9pZCI6IjkyY2NmODcxLTQ4NmYtNDJlNy1iMjNjLWQzMTk4NmIyN2FkYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk5NTg0OTMsImV4cCI6MTcwMDA0NDg5MywiaWF0IjoxNjk5OTU4NDkzLCJqdGkiOiIyNWViZTYwYy1hMDY1LTRiNDYtYWU0ZC0wMDhmOTJmMmMzZjQiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.R-MGmWjjTaImXhBFIFu_SLRz2OX7E4bdevmpcP6h04x8NpTOnIX-FmuTnNfTlnv5iySqYwGyjWYfSTJ3RJOkGcELP_kP39saqTL4TPdDBImdPwsvtG5z3ZFGRIIUByrSfLas04eiFzsrbirw-LXmiZDSQwZdJiFDVdE8g1rzULEEQX0NA9rfAKwNMpl7kT9FIqBabo0ACcjcRpSFBzeKcNgL3KR_gHy7xm1GfzdRVVYTQbvVCRlzg7La8AkYSFkShmR7cDRotwQGKQhr3cOR5vddUqBy8n2AMG6Y79WyQ6R2X0INoAKze80_lDRk9TAJClGY3F49bUthQNDUQKKPfA';
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
