import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI2YWQyZDNlNi0yYzQ3LTQ3NzktODZkMC04MzZhM2ExNzA2MmIiLCJldmVudF9pZCI6IjFiOTI5YmU3LTE5NWItNDBlNy04YjcwLTVmZTNiNTA4MGFiMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk0MjI4MTgsImV4cCI6MTY5OTUwOTIxOCwiaWF0IjoxNjk5NDIyODE4LCJqdGkiOiJjNWYyNGZhMS1mMmFlLTRjNzYtODZhOS03ZThhNzY3MzViMzIiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.G2fU_hs2-Tgsk466Bt22WAqRAgONt41HzD_bZtYrUBaA6jbMDZJDyiv2zmAwN8tJWw3KtJ-mEdYN2NCQThdgQu3M6Q4ubeaqJMclDpMe9ODIZ401TLbB_HcE2ECHVLu0DGYhsuKwyAUkCgNL4jYmiAUgBUKNOJZBs8phojF9PHZE1lItKKiy8KC95QaTHB6Fyh13o_kENM_6mwNLdUJsHMF-jpmjzz2pVIBE_oLwFqxKh7sMMgpAri0HFB5S5WxNK2RDtfZzeQVJ505STDdSPGbdnO7WI55i2zlwZ5Gw0RNT9Sk5GXOKUPMuOd5mrS3ome2lmNqaCKJk06HooYmZUQ';
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
