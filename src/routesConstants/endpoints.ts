export const END_POINTS = {
  LOGIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  verify_token: 'auth/verify-token',
  search_company: 'auth/signup',
  get_permissions: '/premissions',
  reset_password: 'auth/resetPassword',
  forgot_password: 'auth/forgot-password',
  ADD_USER: '/users',
  ADD_USER_ACCOUNT: '/super-admin/add-accounts',
  SUPER_ADMIN_USER_LIST: '/super-admin/user-list',
  SUPER_ADMIN_ADD_USER: '/super-admin/add-user',
  USER_ACCOUNTS_LIST: '/super-admin/accounts-list',
  UPDATE_USER_LIST: '/users/edit',
  COMPANY_CRN: '/auth/search-company',
  AUTH_SEARCH_COMPANY: 'auth/search-company',
  AUTH_IG_VERIFICATION: 'auth/ig-verification',
  VIEW_DEALS_NOTES: '/note',
  CONTACTS: '/contact',
  LIFECYCLE_STAGES: '/lifecycle-stages',
  CONTACT_STATUS: '/contact-status',
  TASK_MANAGEMENT: '/task/management',
  DEALS_ASSOCIATION: '/deals/get-associations',
};

export const superAdminBillingInvoices = {
  get_org_plan: '/super-admin/get-all-orgplans?',
  get_Products: '/products?status=active',
  get_plan_type: '/plan/plan-type-list',
  get_organizations: '/organization/get-organizations',
  post_biling_invoices: '/super-admin/assign-plan',
  get_plan_id: '/super-admin/find-plan',
  patch_assign_plan: '/super-admin/update-assign-plan',
  get_all_invoice: '/super-admin/get-all-invoice',
};

export const organization = {
  post_organization_account: '/org-company-account',
  get_organization_account_all: '/org-company-account/get-accounts',
  get_organization_account_id: '/org-company-account',
  get_main_organization: '/organization',
  update_organization_account: '/org-company-account',
  delete_organization_account: '/org-company-account',
};
