import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkZTM3MDJmMy0yMGUwLTRjMzgtYTYwMi0xNjU0ZjIzMDZhMWUiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl8yVlE5QjdsbmciLCJjbGllbnRfaWQiOiIxZ3RrMWRwY3BrMDlyYTN1Nm9ybGJmbzM1OCIsIm9yaWdpbl9qdGkiOiIzYTY2YzIzZS00MTBmLTQ5OGYtYTg5Mi03YWM3ZjE5Y2I4N2YiLCJldmVudF9pZCI6IjU5MjAwMDM0LWM0YWQtNDM0ZC05ODJmLTRiMTUzZjE2NDZhZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg3MjU1OTksImV4cCI6MTY5ODcyOTE5OSwiaWF0IjoxNjk4NzI1NTk5LCJqdGkiOiI1Nzg3NzhhNy1lYmU5LTRkZGUtODMxOS0yMjUwYjVhODliNjQiLCJ1c2VybmFtZSI6ImRlMzcwMmYzLTIwZTAtNGMzOC1hNjAyLTE2NTRmMjMwNmExZSJ9.Nm4PddnicnPcwbHpwNeUUPKXLTGim_ggIjVRjbY4XL8hZCfSFH87m1h71OZ_WTlylBq06zfb2_z4a7sMisyKa2-HmyyTzAFwebnujb_gf6RknT221SpZCquikwe9fyAXNaTp57hd7vQvj6rgJA2K97n1NqXJuS3lAzqrhKcxI50gPvceKJXCpiENrxMR_yxWMQOHhUXhuafXgPDiWdnAYsWDP1OiMSjr-yrR5ont8tDq9k7fkFYB4-DkSH_4gKbjt90JMaHJ4AAWgGTBE6afjWKEP82Gyo23bLIRWIfx5ul3eeESspSVWVuoQCGHJHFQmhTpUE4DlmjeTlv-YQQzsw';
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
