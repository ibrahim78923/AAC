// ======================================================================

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// ======================================================================

const AUTH_ROOT_PAGE = '/auth';
const DASHBOARD_ROOT_PAGE = '/dashboard';
const SOCIAL_ROOT_PAGE = '/social-components';

// ======================================================================

export const PATH_AUTH = {
  root: AUTH_ROOT_PAGE,
  login: path(AUTH_ROOT_PAGE, '/login'), // /auth/login
  register: path(AUTH_ROOT_PAGE, '/register'), // /auth/register
  forgotPassword: path(AUTH_ROOT_PAGE, '/forgot-password'),
  verify: path(AUTH_ROOT_PAGE, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: DASHBOARD_ROOT_PAGE,
  user: {
    root: path(DASHBOARD_ROOT_PAGE, '/user'),
    profile: path(DASHBOARD_ROOT_PAGE, '/user/profil'),
    account: path(DASHBOARD_ROOT_PAGE, '/user/account'),
  },
};

export const SUPER_ADMIN_SETTINGS: any = {
  JOBS: '/jobs',
  JOB_APPLICATIONS: '/job-applications',
  UNIQUE_CANDIDATE: '/job-applications/get-unique-candidate',
  FAQS: '/faqs',
  TAX_CALCULATION: '/tax-calculation',
  PRODUCT_FEATURES: '/product-features',
  PRODUCTS: '/products',
};

export const SOCIAL_FEATURES = {
  calls: path(SOCIAL_ROOT_PAGE, '/calling/call'),
};

export const AIR_SALES = {
  SALES_INVOICES: '/air-sales/invoices',
  SALES_VIEW_INVOICES: '/air-sales/invoices/view-invoices',
  SALES_CREATE_INVOICES: '/air-sales/invoices/create-invoices',
};

export const SUPER_ADMIN_PLAN_MANAGEMENT: any = {
  PLAN_MANAGEMENT: '/plan',
  PLAN_TYPE_LIST: 'plan/plan-type-list',
  PRODUCT_FEATURES: 'product-features?page=1&limit=10',
  ADD_PLAN: '/super-admin/plan-management/add-plan',
};

export const orgAdminSubcriptionInvoices = {
  choose_plan: '/org-admin/subscription-and-invoices/choose-plan',
  back_subscription_invoices: '/org-admin/subscription-and-invoices',
  manage_plan: '/org-admin/subscription-and-invoices/manage-plan',
};

export const superAdminBillingInvoicesPath = {
  generate_invoice: '/super-admin/billing-invoices/generate-invoice',
};

export const airMarketingCalendar = {
  calendar: '/air-marketer/social-marketing/calender',
  create_post: '/air-marketer/social-marketing/create-post',
};

export const AIR_MARKETER = {
  SOCIAL_INBOX_SETTINGS: '/air-marketer/social-marketing/social-inbox/settings',
  SMS_MARKETING: '/air-marketer/sms-marketing',
  SMS_MARKETING_DETAILS: '/air-marketer/sms-marketing/sms-marketing-details',
  CREATE_SMS_BROADCAST: '/air-marketer/sms-marketing/create-sms-broadcast',
  VIEW_PERFORMANCE: '/air-marketer/compaigns/view-performance',
  REPORTS: '/air-marketer/reports',
  REPORTS_LEADS: '/air-marketer/reports/leads',
  REPORTS_EMAIL: '/air-marketer/reports/email-marketing',
  REPORTS_CAMPAIGNS: '/air-marketer/reports/add-campaigns',
  VIEW_PERFORMANCE: '/air-marketer/campaigns/view-performance',
};
