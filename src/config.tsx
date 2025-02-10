// API
export const DOMAIN =
  typeof window !== 'undefined' ? window.location.origin : '';
export const BASE_URL = process?.env?.NEXT_PUBLIC_BASE_URL;
export const IMG_URL = process?.env?.NEXT_PUBLIC_IMG_URL;
export const FE_BASE_URL = process?.env?.NEXT_PUBLIC_FE_BASE_URL || DOMAIN;

//PAGINATION
export const PAGINATION = {
  PAGE_LIMIT: 10,
  OPTIONAL_PAGE_LIMIT: 5,
  ROWS_PER_PAGE: [5, 10, 15, 20],
  CURRENT_PAGE: 1,
  PAGE_COUNT: 1,
  TOTAL_RECORDS: 0,
  DROPDOWNS_RECORD_LIMIT: 50,
};

export const FILE_MAX_SIZE = {
  ATTACH_FILE_MAX_SIZE: 1024 * 1024 * 2.44,
};

export const FILE_SIZE_MESSAGES = {
  FILE_TOO_LARGE: 'file-too-large',
  TOTAL_FILE_SIZE: 'total-size-too-large',
};

export const AUTO_REFRESH_API_POLLING_TIME = {
  DASHBOARD: 900000,
  REPORTS: 900000,
};

export const AUTO_REFRESH_API_TIME_INTERVAL = {
  DASHBOARD: 60000,
  REPORTS: 60000,
};

export const PROJECT_NAME = 'Agentic Creed';
export const PROJECT_DESCRIPTION = `${PROJECT_NAME} is a robust and adaptable CRM platform that adopts a customer-centric approach, enables businesses to attract and nurture customers through valuable content. It provides tools and resources for implementing inbound marketing strategies effectively. The platform caters to businesses of all sizes and industries, helping them centralize customer data, automate marketing and sales processes, and deliver exceptional customer experiences`;
