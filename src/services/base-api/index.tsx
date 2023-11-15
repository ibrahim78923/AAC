import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIxZGY1ZWZmZC03MWUxLTRkZmMtYmI2MS04YWIyMjljYzc5YmMiLCJldmVudF9pZCI6IjUxZGE2ZTExLTZlZDctNGU2MS1iMGRjLWRkZDUxZGQ4ZTRiMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDAwMzQwMDYsImV4cCI6MTcwMDEyMDQwNSwiaWF0IjoxNzAwMDM0MDA2LCJqdGkiOiJlMWU2MDVhZS03NDQ2LTQxZDMtODNhMi05YzczNDQ4MjFjMTciLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.T8Opnbl2GS_BSCxpEohPCWDL783Ts9mmjtHRPThb34lFpE5KGnzUchB0aB2vC8NYlFxWbiuSqobRTjfY2HqN-l_cYep3S2_ruDPriWOh8-Bb0kFqoKSmjT_kOyFMXYYxPCoiRd11lSsaPAK5GVQ6Oe_JctV9uf6zVw_XeOaaicGb77l5SIA9cR-VWFaeLYbhV7v-N-TPUVN8cCEQta4kP56900sqRME9LGejTUMpy-F2UADyOqJcGkfdna4OWfBXWdMYIUhwpceK_WSDadScwQcsNPst69vaxLN5ugt3tTakHZA69EIuSc6FoP-O6Rvf7BShzA_o1H1v901lxS4Dig';
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
