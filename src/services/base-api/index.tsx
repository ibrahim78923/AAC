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
  'SETTINGS_FAQS',
  'SETTINGS_JOBS',
  'SETTINGS_JOB_APPLICATION',
  'AIR_SALES_QUOTES',
  'SETTINGS_PRODUCT_FEATURES',
  'SETTINGS_TAX_CALCULATIONS',
  'MyDocuments',
  'CLOSURE_ROLE',
  'LOCATION',
  'VENDOR_LIST',
  'PRODUCT_CATALOG',
  'CANNED_RESPONSES',
  'DROPDOWN_ASSET_TYPE_LIST',
  'DEPARTMENT',
  'TICKET_ASSOCIATES_ASSETS',
  'DROPDOWN_DEPARTMENT',
  'DROPDOWN_AGENT',
  'DROPDOWN_REQUESTER',
  'RELATED_TICKETS',
  'ACTIVITY_LOG',
  'VENDOR_DETAIL_OVERVIEW',
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
