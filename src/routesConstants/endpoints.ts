export const END_POINTS = {
  LOGIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  verify_token: 'auth/verify-token',
  search_company: 'auth/signup',
  get_permissions: '/premissions',
  reset_password: 'auth/resetPassword',
  forgot_password: 'auth/forgot-password',
  INVENTORY_ACTIVITY: 'assets/inventory',
  WORKLOAD: `/workload/workload-management`,
  INVENTORY_EXPENSE: 'expense/add-expense',
  GET_INVENTORY_EXPENSE: 'expense/get-expense',
  TICKET: '/ticket',
  TICKET_STATUS: '/ticket/status',
  TICKET_BULK_UPDATE: '/ticket/bulk-ticket-update',
  USER_LIST: '/users',
  ADD_USER: '/users',
  ADD_USER_ACCOUNT: '/super-admin/add-accounts',
  ORG_ADMIN_EMP_LIST: '/users/organization',
  ORG_USER_EMPLOYEE: '/users/organization',
  USER_ACCOUNTS_LIST: '/super-admin/accounts-list',
  UPDATE_USER_LIST: '/users/edit',
  COMPANY_CRN: '/auth/search-company',
  auth_search_company: 'auth/search-company',
  auth_IG_Verification: 'auth/ig-verification',
  EXPENSE: '/expense/add-expense',
  DROPDOWN_ORGANIZATIONS: '/dropdown/organizations',
  DROPDOWN_PRODUCTS: '/dropdown/products',
  AUTH_SEARCH_COMPANY: 'auth/search-company',
  AUTH_IG_VERIFICATION: 'auth/ig-verification',
  PRODUCTS: '/products',
  ORGANIZATIONS: '/organization/get-organizations',
  VIEW_DEALS_NOTES: '/note',
  CONTACTS: '/contact',
  LIFECYCLE_STAGES: '/lifecycle-stages',
  CONTACT_STATUS: '/contact-status',
  GET_PERMISSIONS_ROLES: '/permissions/role',
  TASK_MANAGEMENT: '/task/management',
  DEALS_ASSOCIATION: '/deals/get-associations',
  ENQUIRIES: '/enquiries/',
  CREATE_ASSOCIATION: '/deals/create-association',
  DELETE_ASSOCIATION: '/deals/delete-association',
  ASSETS_INVENTORY: '/assets/inventory',
  GET_COMPANY_ORGANIZATION_DROPDOWN: '/dropdown/organizations',
  GET_COMPANY_ACCOUNTS: '/company-accounts',
  SALE_PRODUCTS: '/sales-product',
  GET_PRODUCTS_PERMISSIONS: '/permissions/permissions-by-product',
};

export const superAdminBillingInvoices = {
  GET_ORG_PLAN: '/super-admin/get-all-orgplans?',
  GET_PRODUCTS: '/products?status=active',
  GET_PLAN_TYPE: '/plan/plan-type-list',
  GET_ORGANIZATION: '/organization/get-organizations',
  POST_BILING_INVOICES: '/super-admin/assign-plan',
  GET_PLAN_ID: '/super-admin/find-plan',
  PATCH_ASSIGN_PLAN: '/super-admin/update-assign-plan',
  GET_ALL_INVOICE: '/super-admin/get-all-invoice',
  UPDATE_INVOICE: '/super-admin/update-invoice',
};

export const organization = {
  POST_ORGANIZATION_ACCOUNT: '/org-company-account',
  GET_ORGANIZATION_ACCOUNT_ALL: '/org-company-account/get-accounts',
  GET_ORGANIZATION_ACCOUNT_ID: '/org-company-account',
  GET_MAIN_ORGANIZATION: '/organization',
  UPDATE_ORGANIZATION_ACCOUNT: '/org-company-account',
  UPDATE_ORGANIZATION_ACCOUNT_STATUS: '/org-company-account/update-status',
  DELETE_ORGANIZATION_ACCOUNT: '/org-company-account',
  DELETE_ORGANIZARION_MULTIPLE: '/org-company-account/delete-multiple',
};

export const settingSalesProductCategory = {
  POST_SALES_PRODUCT_CATEGORY: '/product-categories',
  GET_SALES_PRODUCT_CATEGORY: '/product-categories',
  UPDATE_SALES_PRODUCT_CATEGORY: '/product-categories',
};
export const settingLifeCycleStage = {
  POST_LIFE_CYCLE_STAGE: '/lifecycle-stages',
  GET_LIFE_CYCLE_STAGE: '/lifecycle-stages',
  GET_LIFE_CYCLE_STAGE_ID: '/lifecycle-stages',
  UPDATE_LIFE_CYCLE_STAGE: '/lifecycle-stages',
  DELETE_LIFE_CYCLE_STAGE: '/lifecycle-stages',
};

export const settingContactStatus = {
  POST_CONTACT_STATUS: '/contact-status',
  GET_CONTACT_STATUS: '/contact-status',
  GET_CONTACT_STATUS_ID: '/contact-status',
  UPDATE_CONTACT_STATUS: '/contact-status',
  DELETE_CONTACT_STATUS: '/contact-status',
};
export const ORG_ADMIN = {
  SUBSCRIPTION_AND_INVOICES: '/org-admin/subscriptions',
  GET_INVOICES: '/org-admin/invoices',
  PRODUCT_PLAN_LIST: '/plan/product-plan-list',
};

export const COMMON_DOCUMENTS = {
  POST_DOCUMENTS_FOLDER: '/documents/folder',
  POST_DOCUMENTS_FILE: '/documents/file',
  GET_DOCUMENT_FOLDER: '/documents/folders',
  GET_DOCUMENT_FILE: '/documents/files',
  PATCH_DOCUMENT_FOLDER_ID: '/documents/folders',
  PATCH_DOCUMENT_FILE_ID: '/documents/file',
  DELETE_DOCUMENT_FOLDER_ID: '/documents/folder',
  DELETE_DOCUMENT_FILE_ID: '/documents/file',
};
