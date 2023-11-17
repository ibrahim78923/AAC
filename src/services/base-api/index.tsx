import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJjOGZjNDVhYS0zNTRmLTQyYzItOWQ5ZS02NjBiY2RiNWEzYzAiLCJldmVudF9pZCI6ImU3NzYwZGNmLTMyZDAtNDk2Yi04ZWViLWZkNDlkYmVhZTBlNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAxOTE3NDksImV4cCI6MTcwMDI3ODE0OSwiaWF0IjoxNzAwMTkxNzQ5LCJqdGkiOiI1NTZiZGQ5ZS1mZDNlLTQ2YTItOGRlNS0wYWIwNWVkYzYyNjkiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.f4aqyvDUW_zGADQUKPx9T-r-ODDXmrLkj99qvHmGFX39mEYBcJcSbF_rp2owGLlrHdSirAVnPENCYquNdYpxtqkAMrB-soODlhqkYWNziWL-nc8DwZLUSyjfDGE0JhnkLlGqtPjE0x59OyASI6TWFF49YP5VoqSox4GWogIzPVMQ1GGrNJeUi6ayAabIm5M_v4JdQyUAUMQy2htOTEPyGc-FjKRrsHqvB8awtdwPRsOl8gXZCz1NOoCxGB3TCFnbiM1u9a_GZ_nj8ZLQG89Iph5dHL9_sYmRg_kWflt4rF1F6VDJ94cAgMIG-t_8RKJ2qvjVw4Y3kE3PaTcLzcGFaA';
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
