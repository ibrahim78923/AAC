export const endpoints = {
  login: 'auth/signin',
  signup: 'auth/signup',
  verify_token: 'auth/verify-token',
  search_company: 'auth/signup',
  get_permissions: '/premissions',
  reset_password: 'auth/resetPassword',
  forgot_password: 'auth/forgot-password',
  USER_LIST: '/users',
  ADD_USER: '/users',
  ADD_USER_ACCOUNT: '/super-admin/add-accounts',
  USER_ACCOUNTS_LIST: '/super-admin/accounts-list',
  UPDATE_USER_LIST: '/users/edit',
};

export const superAdminBillingInvoices = {
  get_org_plan: '/super-admin/get-all-orgplans?',
  get_Products: '/products?status=inactive',
  get_plan_type: '/plan/plan-type-list',
  get_organizations: '/organization/get-organizations',
  post_biling_invoices: '/super-admin/assign-plan',
};
