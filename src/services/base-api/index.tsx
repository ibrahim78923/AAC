import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJkZTM5ZjdlMC00ZGMzLTQ2OWYtYmE4ZC1hNDI5ZTZkMDgzNmYiLCJldmVudF9pZCI6ImJjODI1YmYzLTIxYTEtNDBmNS05NzMzLTk2MTM1MTMyYjI2MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAwMjQyNDksImV4cCI6MTcwMDExMDY0OSwiaWF0IjoxNzAwMDI0MjQ5LCJqdGkiOiIzYTY5NTNiMS1hOGUzLTRkOTgtODM2ZS02ZmMxNTRkNWMzYTMiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.Gtrle853dywpR4BWMY-XMS6VuDmLAIpDRcmPQ7sbITrfZhL71enY4wnVO8Co5Y92gr8dj0qUr0I3ZXSsGhPadkmzVSHpA7Var48MC6t3RCshMSBjEiymEfPRtI2T2_IGrzg7WfpwiTIFQQ91bhJ9UG3PBHhC_Gf40BRnM7_wAi1Y370d-M7Y8WjQiR5hMfEDIdAX49irq4rKynyWkxzVXRG5sztSX0ogQFWQLNvgrcNpO_NNisWRQ08kiGRTpOBxwl42VK9pY5bhyzW6fMgiIf4sBNZY3hSA8LzmIzXLQUNp3zljMng5m2-xlHU11ljKsbwsEk8Wsk0GygJ20pe4TQ';

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
