import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIwNmRhZTJmZS0xYmJiLTQyZjAtYmZiMi1jN2Y0YjI2OWM4NWMiLCJldmVudF9pZCI6ImQ2MWFkNDVmLTA0YzgtNDk2My04NzRiLTZlZmMwNDdkNWFmMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk4NTE5NjUsImV4cCI6MTY5OTkzODM2NSwiaWF0IjoxNjk5ODUxOTY1LCJqdGkiOiIwZjFiMDQ5Mi0xZjQxLTRmYzItODYzNS00ZDQ0NzU5YzdlZjciLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.NAqZATMJM2Zx25tdsVtL8hNUd_hFVU71bmdEM9nDLU2QW0YDd2MrXlVPhqDpSrAle8o_iRzm7owYXuTXDly0JI5A_dCz7Oy0Rkb_5tMymJKdeXnDH3NeYEJE9gvG9axXE6-TomndR9P9taisfZiXHGT7D6RaggGmsEKh2Uxv3Vj-3lyQ_6bPWNLYIPi4-bcV_xwTAVdHoMkApsAh1XWREPLNHIv3RStkbGBl69m3AWNFgIt2_u_8Kev92GeZeQpc5f6WdVVSjaKGXEF9orqNP9VKGHP_s6YwDBq-k5PWu1o8A-y3kwi66k4Sce2SqbEnrmQUS3-NEH-SsWtkj4dDbA';
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
