// ======================================================================

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// ======================================================================

const AUTH_ROOT_PAGE = '/auth';
const DASHBOARD_ROOT_PAGE = '/dashboard';
const SOCIAL_ROOT_PAGE = '/social-components';
const AIR_SOCIAL_PAGE = '/air-social';
const AIR_SALES_PAGE = '/air-sales';

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

export const AIR_SOCIAL = {
  CONTACTS: `${AIR_SOCIAL_PAGE}/contacts`,
  CONTACTS_VIEW_DETAILS: `${AIR_SOCIAL_PAGE}/contacts/view-details`,
  CONTACTS_RESTORE: `${AIR_SOCIAL_PAGE}/contacts/restore`,
  CONTACTS_IMPORT: `${AIR_SOCIAL_PAGE}/contacts/import`,
};

export const AIR_SALES = {
  root: AIR_SALES_PAGE,
  QUOTES: path(AIR_SALES_PAGE, '/quotes'),
  CREATE_QUOTES: path(AIR_SALES_PAGE, '/quotes/create-quote'),
  UPDATE_QUOTE: path(AIR_SALES_PAGE, '/quotes/update-quote'),
  VIEW_QUOTE: path(AIR_SALES_PAGE, '/quotes/view-quote'),
  SALES_INVOICES: '/air-sales/invoices',
  SALES_VIEW_INVOICES: '/air-sales/invoices/view-invoices',
  SALES_CREATE_INVOICES: '/air-sales/invoices/create-invoices',
  DEAL: '/air-sales/deals',
  CONTACTS: '/air-sales/contacts/view-details',
  VIEW_DETAILS: '/air-sales/deals/view-details',
  DEAL_LIST_VIEW: '/deals/get-deals-list-view',
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

const AIR_MARKETING_PAGE = '/air-marketer';
export const AIR_MARKETER = {
  root: path(AIR_MARKETING_PAGE, '/dashboard'),
  PAID_ADS: path(AIR_MARKETING_PAGE, '/paid-ads'),
  CREATE_AD: path(AIR_MARKETING_PAGE, '/paid-ads/create-ad'),
  ENGAGEMENT_ADS: path(
    AIR_MARKETING_PAGE,
    '/paid-ads/create-ad/engagement-ads',
  ),
  EMAIL_MARKETING: path(AIR_MARKETING_PAGE, '/email-marketing'),
  EMAIL_TEMPLATES: path(AIR_MARKETING_PAGE, '/email-marketing/email-templates'),
  CREATE_EMAIL_TEMPLATES: path(
    AIR_MARKETING_PAGE,
    '/email-marketing/email-templates/create-template',
  ),
  EMAIL_FOLDER: path(AIR_MARKETING_PAGE, '/email-marketing/email-folder'),
  EMAIL_REPORTS: path(AIR_MARKETING_PAGE, '/email-marketing/email-reports'),
  SOCIAL_MARKETING: path(AIR_MARKETING_PAGE, '/social-marketing'),
  SOCIAL_INBOX: path(AIR_MARKETING_PAGE, '/social-marketing/social-inbox'),
  SMS_MARKETING: path(AIR_MARKETING_PAGE, '/sms-marketing'),
  WHATSAPP_MARKETING: path(AIR_MARKETING_PAGE, '/whatsapp-marketing'),
  LEAD_CAPTURE: path(AIR_MARKETING_PAGE, '/lead-capture'),
  LEAD_CAPTURE_CTA: path(AIR_MARKETING_PAGE, '/lead-capture/cta'),
  LEAD_CAPTURE_FORMS: path(AIR_MARKETING_PAGE, '/lead-capture/forms'),
  REPORTS: path(AIR_MARKETING_PAGE, '/reports'),
  REPORTS_LEADS: path(AIR_MARKETING_PAGE, '/reports/leads'),
  REPORTS_EMAIL: path(AIR_MARKETING_PAGE, '/reports/email-marketing'),
  REPORTS_CAMPAIGNS: path(AIR_MARKETING_PAGE, '/reports/add-campaigns'),
  CAMPAIGNS: path(AIR_MARKETING_PAGE, '/campaigns'),
  TASK_CARD: path(AIR_MARKETING_PAGE, '/campaigns/task-card'),
  SETTINGS: path(AIR_MARKETING_PAGE, '/settings'),
  CREATE_TEMPLATE: path(AIR_MARKETING_PAGE, '/sms-marketing/create-template'),
  VERIFY_EMAIL: path(AIR_MARKETING_PAGE, '/lead-capture/verify-email'),
  CREATE_FORM: path(AIR_MARKETING_PAGE, '/lead-capture/create-form'),
  ALL_TABLE: path(AIR_MARKETING_PAGE, '/lead-capture/forms'),
  CREATE_NEW_EMAIL: path(
    AIR_MARKETING_PAGE,
    '/email-marketing/create-new-email',
  ),
  COMPARE_EMAIL: path(AIR_MARKETING_PAGE, '/email-marketing/compare-email'),

  SOCIAL_INBOX_SETTINGS: path(
    AIR_MARKETING_PAGE,
    '/social-marketing/social-inbox/settings',
  ),
  SMS_MARKETING_DETAILS: path(
    AIR_MARKETING_PAGE,
    '/sms-marketing/sms-marketing-details',
  ),
  CREATE_SMS_BROADCAST: path(
    AIR_MARKETING_PAGE,
    '/sms-marketing/create-sms-broadcast',
  ),
  WHATSAPP_MERKETING: path(AIR_MARKETING_PAGE, '/whatsapp-marketing'),
  WHATSAPP_MERKETING_CREATE_BROADCAST: path(
    AIR_MARKETING_PAGE,
    '/whatsapp-marketing/create-broadcast',
  ),
  WHATSAPP_MERKETING_UPDATE_BROADCAST: path(
    AIR_MARKETING_PAGE,
    '/whatsapp-marketing/update-broadcast',
  ),

  VIEW_PERFORMANCE: path(AIR_MARKETING_PAGE, '/campaigns/view-performance'),
  ALL_VIEW: path(AIR_MARKETING_PAGE, '/campaigns/all-view'),
  COMMON_DOCUMENTS: path(AIR_MARKETING_PAGE, '/my-documents'),
  COMMON_DOCUMENTS_FOLDER: path(AIR_MARKETING_PAGE, '/my-documents/my-folders'),
};

const AIR_OPERATIONS_PAGE = '/air-operations';
export const AIR_OPERATION = {
  root: AIR_OPERATIONS_PAGE,
  WORK_FLOW: path(AIR_OPERATIONS_PAGE, '/workflow-automation'),
  DATA_MANAGEMENT: path(AIR_OPERATIONS_PAGE, '/data-management'),
  INTEGRATIONS: path(AIR_OPERATIONS_PAGE, '/integrations'),
  REPORTS: path(AIR_OPERATIONS_PAGE, '/reports'),
  ROLE_AND_RIGHT: path(AIR_OPERATIONS_PAGE, '/roles-and-right'),
  USER_MANAGEMENT: path(AIR_OPERATIONS_PAGE, '/user-management'),
};

const LOYALTY_PROGRAM_PAGE = '/air-loyalty-program';
export const LOYALTY_PROGRAM = {
  root: LOYALTY_PROGRAM_PAGE,
  LOYALTY_REWARD: path(LOYALTY_PROGRAM_PAGE, '/loyalty/rewards'),
  LOYALTY_TRANSACTIONS: path(LOYALTY_PROGRAM_PAGE, '/loyalty/transactions'),
  LOYALTY_RULES_TIERS: path(LOYALTY_PROGRAM_PAGE, '/loyalty/rules-and-tiers'),
  LOYALTY_RULES_VOUCHERS: path(LOYALTY_PROGRAM_PAGE, '/loyalty/vouchers'),
  GIFT_CARDS: path(LOYALTY_PROGRAM_PAGE, '/gift-cards'),
  GIFT_CARDS_TRANSACTIONS: path(
    LOYALTY_PROGRAM_PAGE,
    '/gift-cards/transactions',
  ),
  GIFT_CARDS_SETTLEMENTS: path(LOYALTY_PROGRAM_PAGE, '/gift-cards/settlements'),
  GIFT_CARDS_SETTLED: path(LOYALTY_PROGRAM_PAGE, '/gift-cards/settled'),
  PREPARED_FUNDS_TRANSACTIONS: path(
    LOYALTY_PROGRAM_PAGE,
    '/prepaid/funds-transactions',
  ),
  SETTINGS: path(LOYALTY_PROGRAM_PAGE, '/settings'),
};

export const ORG_ADMIN = {
  DASHBOARD_EDIT_PROFILE: '/org-admin/dashboard/edit-profile',
};

export const SOCIAL_FEATURES_CHAT = {
  CHAT: 'chat/',
  CHAT_LIST: 'chat/list/',
  UPDATE_CHAT: 'chat/',
  UPLOAD_ATTACHMENT_CHAT: 'chat/message',
  CREATE_GROUP: 'chat/create-group',
};
export const CHAT_SOCKETS = {
  ON_STATUS_CHANGE: 'on-status-change',
  ON_GROUP_CREATE: 'on-group-create',
  ADD_MESSAGE: 'add-message',
  ON_NEW_CHAT: 'on-new-chat',
  SOCKET_ERROR_OCCURED: 'socket-error-occured',
  ON_MESSAGE_RECEIVED: 'on-message-received',
  UPDATE_MESSAGE: 'update-message',
  ON_MESSAGE_UPDATE: 'on-message-update',
  ON_TYPING_START: 'on-typing-start',
  ON_TYPING_STOP: 'on-typing-stop',
};
