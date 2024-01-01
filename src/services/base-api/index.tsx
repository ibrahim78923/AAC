import { BASE_URL } from '@/config';
import { RootState } from '@/redux/store';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'Organization',
  'SettingSalesProductCategories',
  'SettingLifeCycleStage',
  'SettingContactStatus',
  'INVENTORY_ACTIVITY',
  'EXPENSE',
  'WORKLOAD',
  'DROPDOWNS',
  'INVENTORY_EXPENSE',
  'TICKETS',
  'TASKS',
  'ASSETS_INVENTORY',
  'MyDocuments',
  'CLOSURE_ROLE',
  'LOCATION',
  'VENDOR_LIST',
  'PRODUCT_CATALOG',
  'CANNED_RESPONSES',
  'RESPONSES_LIST',
  'BUSINESS_HOUR',
  'BUSINESS_HOUR_BY_ID',
  'HOLIDAYS',
  'DROPDOWN_ASSET_TYPE_LIST',
  'DEPARTMENT',
  'TICKET_ASSOCIATES_ASSETS',
  'DROPDOWN_DEPARTMENT',
  'DROPDOWN_AGENT',
  'DROPDOWN_REQUESTER',
  'RELATED_TICKETS',
  'ACTIVITY_LOG',
  'VENDOR_DETAIL_OVERVIEW',
  'ASSET_TYPE',
  'DROPDOWN_ASSOCIATE_ASSET',
  'DROPDOWN_CATEGORIES',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;

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
