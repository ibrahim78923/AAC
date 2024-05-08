// API
export const BASE_URL = process?.env?.NEXT_PUBLIC_BASE_URL;
export const IMG_URL = process?.env?.NEXT_PUBLIC_IMG_URL;
export const FE_BASE_URL = process?.env?.NEXT_PUBLIC_FE_BASE_URL;

//PAGINATION
export const PAGINATION = {
  PAGE_LIMIT: 10,
  ROWS_PER_PAGE: [5, 10, 15, 20],
  CURRENT_PAGE: 1,
  PAGE_COUNT: 1,
  TOTAL_RECORDS: 0,
  DROPDOWNS_RECORD_LIMIT: 50,
};

export const FILE_MAX_SIZE = {
  ATTACH_FILE_MAX_SIZE: 1024 * 1024 * 2.44,
};
