export const DATE_FORMAT = {
  UI: 'MM/DD/YYYY',
  API: 'YYYY-MM-DD',
};

export const DATE_MONTH_FORMAT = {
  API: 'MMM DD',
};

export const CALANDER_DATE_FORMAT = {
  UI: 'MMMM YYYY',
};

export const TIME_FORMAT = {
  UI: 'h:mm A',
  API: 'h:mm A',
  TIME_VALIDATION: 'hh:mm:ss',
  TH: 'HH:mm',
  HMA: 'hh:mm aa',
};

export const CALENDAR_FORMAT = {
  UI: 'D MMMM YYYY',
  API: 'YYYY MMMM D',
  YMD: 'YYYY-MM-DD',
};

export const DATE_TIME_FORMAT = {
  UI: 'dddd, MMMM D, YYYY - HH:mm',
  DMYhmma: 'D MMMM, YYYY - h:mm A',
  DMDMHA: 'ddd, D MMM h:mm A',
  MMMDDYYYY: 'MMM DD, YYYY',
  DDMYHMA: 'ddd, D MMM, YYYY h:mm A',
  DMY: 'DDMMMYYYY',
  YMDHM: 'YYYY-MM-DD, hh:mm A',
  DMYHMSA: 'ddd MM, YYYY hh:mm:ss A',
  D: 'D',
  DDDDDD: 'ddd - DD',
  DDMMYYYY: 'DD MMM, YYYY hh:MM A',
  DMMMY: 'D MMM, YYYY',
  DMDHMA: 'ddd, MMM D, YYYY, h:mm A',
  WDM: 'dddd, DD MMMM',
  MMMM: 'MMMM',
  DDMMYYY: 'DD/MM/YYYY',
  DDMMYYYYT: 'DD-MM-YYYY hh:MM A',
  ddddDDMMMYYYYhhmmA: 'dddd, DD MMM YYYY hh:mm A',
  ddddDDMMMYYYY: 'dddd, DD MMM YYYY',
  YYMMDD: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  DDMMM: 'DD MMM',
  DDMMMYYYY: 'DD MMM YYYY',
  HHMMA: 'hh:mm A',
  MMMMD: 'MMMM D[th] [at] h:mmA',
  MMM: 'MMM',
  DD: 'DD',
  DUE_DATE_TIME: 'YYYY-MM-DD hh:mm A',
  GOAL_DATE_FORMAT: 'MMM DD YYYY',
  FORMAT_24_HOUR: 'DD MMM, YYYY HH:mm',
};

export const VALIDATION_CONSTANT = {
  PHONE_NUMBER: {
    regex: /^\+44[0-9]{10}$/,
    message: 'Only UK phone number',
  },
};

export const ERROR_PAGES = {
  NOT_FOUND: '/404',
  NOT_ACCESS: '/403',
};

export const SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES = {
  PLAN_ALREADY_ASSIGNED:
    'Product Plan is Already Active! Please In-Active/Un-Assign Previous Plan First',
};

export const SUPER_ADMIN: any = {
  DASHBOARD: '/super-admin',
  USERMANAGMENT: '/super-admin/user-management',
  ADDROLE: '/super-admin/user-management/add-role',
  USERS_LIST: '/super-admin/user-management/users-list',
  BILLING_INVOICES: '/super-admin/billing-invoices',
  AIRSALES_CONTCATS_RESTORE: '/air-sales/contacts/restore',
  CONTACT_IMPORT: '/air-sales/contacts/import',
  CONTCATS_COLUMN: '/air-sales/contacts/import/import-column',
  AIRSALES_CONTCATS: '/air-sales/contacts',
  AIRSALES_IMPORTHISTORY: '/air-sales/contacts/import/import-history',
  IMPORT_RECORD:
    '/air-sales/contacts/import/import-history/import-record-created',
  IMPORTRECORD_RESTORE:
    '/air-sales/contacts/import/import-history/import-record-created/restore',
};

export const AIR_SERVICES = {
  DASHBOARD: `/air-services`,
  SINGLE_DASHBOARD: `/air-services/dashboard`,
  TICKETS: `/air-services/tickets`,
  TICKETS_LIST: `/air-services/tickets/detail`,
  CHILD_TICKETS_DETAIL: `/air-services/tickets/child-detail`,
  PURCHASE_ORDER: '/air-services/assets/purchase-orders',
  ASSETS_PURCHASE_ORDER_DETAIL: '/air-services/assets/purchase-orders/detail',
  NEW_PURCHASE_ORDER: '/air-services/assets/purchase-orders/new-purchase',
  CREATE_DASHBOARD: '/air-services/dashboard/upsert-dashboard',
  MANAGE_DASHBOARD: '/air-services/dashboard/manage-dashboard',
  KNOWLEDGE_BASE: '/air-services/knowledge-base',
  KNOWLEDGE_BASE_VIEW_ARTICLE:
    '/air-services/knowledge-base/article/view-article',
  KNOWLEDGE_BASE_UPSERT_ARTICLE:
    '/air-services/knowledge-base/article/upsert-article',
  ADD_ASSOCIATE_ASSET:
    '/air-services/assets/contracts/detail/add-associate-asset',
  ASSETS_CONTRACTS: '/air-services/assets/contracts',
  ASSETS_CONTRACTS_DETAIL: '/air-services/assets/contracts/detail',
  UPSERT_CONTRACT: `/air-services/assets/contracts/upsert-contract`,
  UPDATE_CONTRACT: `/air-services/assets/contracts/detail/update-contract`,
  ASSETS_INVENTORY: `/air-services/assets/inventory`,
  ASSETS_INVENTORY_DETAIL: `/air-services/assets/inventory/detail`,
  ASSETS_SOFTWARE: `/air-services/assets/software`,
  ASSETS_SOFTWARE_DETAIL: `/air-services/assets/software/detail`,
  ADD_INVENTORY: `/air-services/assets/inventory/add-inventory`,
  UPSERT_ARTICLE: `/air-services/knowledge-base/article/upsert-article`,
  AIRDEALS_RESTORE: '/air-sales/deals/restore',
  ACCOUNT_SETTINGS: `/air-services/settings/account-settings`,
  ACCOUNT_DETAILS_SETTINGS: `/air-services/settings/account-settings/account-details`,
  EMAIL_NOTIFICATION_SETTINGS: `/air-services/settings/account-settings/email-notification`,
  MANAGE_PORTAL_SETTINGS: `/air-services/settings/account-settings/manage-portal-settings`,
  ASSET_MANAGEMENT_SETTINGS: `/air-services/settings/asset-management`,
  ASSET_TYPE_SETTINGS: `/air-services/settings/asset-management/asset-type`,
  PRODUCT_CATALOG_SETTINGS: `/air-services/settings/asset-management/product-catalog`,
  VENDOR_SETTINGS: `/air-services/settings/asset-management/vendor`,
  VENDOR_FIELDS_SETTINGS: `/air-services/settings/asset-management/vendor-fields`,
  LOCATION_SETTINGS: `/air-services/settings/asset-management/location`,
  SERVICE_MANAGEMENT: `/air-services/settings/service-management`,
  SERVICE_CATALOG_SETTINGS: `/air-services/settings/service-management/services-catalog`,
  BUSINESS_HOURS_SETTINGS: `/air-services/settings/service-management/business-hours`,
  CLOSURE_RULE_SETTINGS: `/air-services/settings/service-management/closure-rule`,
  USER_MANAGEMENT: `/air-services/settings/user-management`,
  DEPARTMENT_SETTINGS: `/air-services/settings/user-management/departments`,
  AGENTS_SETTINGS: `/air-services/settings/user-management/agents`,
  REQUESTERS_SETTINGS: `/air-services/settings/user-management/requesters`,
  SINGLE_REQUESTERS_DETAILS: `/air-services/settings/user-management/requesters/requesters-view-details`,
  USER_ROLES_SETTINGS: `/air-services/settings/user-management/roles`,
  VENDOR_DETAIL: '/air-services/settings/asset-management/vendor/details',
  PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog`,
  UPSERT_PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog/upsert-product`,
  SINGLE_PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog/details`,
  AGENT_PERFORMANCE_MANAGEMENT_SETTINGS: `/air-services/settings/agent-performance-management`,
  CANNED_RESPONSE_SETTINGS: `/air-services/settings/agent-performance-management/canned-responses`,
  LEADER_BOARD_SETTINGS: `/air-services/settings/agent-performance-management/leader-board`,
  WORKLOAD_MANAGEMENT_SETTINGS: `/air-services/settings/agent-performance-management/workload-management`,
  USER_UPSERT_ROLES_SETTINGS: `/air-services/settings/user-management/roles/upsert-roles`,
  UPSERT_BUSINESS_HOUR: `/air-services/settings/service-management/business-hours/upsert-business-hour`,
  ADD_NEW_LOCATION: `/air-services/settings/asset-management/location/upsert-location`,
  UPSERT_INVENTORY: `/air-services/assets/inventory/upsert-inventory`,
  UPSERT_SERVICE:
    '/air-services/settings/service-management/services-catalog/upsert-service',
  SERVICE_CATALOG: '/air-services/settings/service-management/services-catalog',
  UPSERT_SOFTWARE_CONTRACT: `/air-services/assets/software/detail/create-contract`,
  UPSERT_WORKFLOW_MANAGEMENT:
    '/air-services/settings/agent-performance-management/workload-management/upsert-workflow-management',
  SINGLE_AGENT_DETAILS: `/air-services/settings/user-management/agents/details`,
  REPORTS: `/air-services/reports`,
  INVENTORY_REPORTS: `/air-services/reports/inventory`,
  TICKETS_REPORTS: `/air-services/reports/tickets`,
  CONTRACTS_REPORTS: `/air-services/reports/contracts`,
  PURCHASE_ORDER_REPORTS: `/air-services/reports/purchase-order`,
  SOFTWARE_REPORTS: `/air-services/reports/software`,
  FEEDBACK_SURVEY: `/air-services/feedback-survey`,
  UPSERT_FEEDBACK_SURVEY: `/air-services/feedback-survey/upsert-feedback-survey`,
  FEEDBACK_SURVEY_RESPONSES: `/air-services/feedback-survey/detail`,
  DEPARTMENT_FIELD: `/air-services/settings/user-management/department-field`,
  AGENT_FIELDS: `/air-services/settings/user-management/agent-fields`,
  REQUESTER_FIELDS: `/air-services/settings/user-management/requester-fields`,
  SOFTWARE_FIELDS: `/air-services/settings/asset-management/software-fields`,
  CONTRACT_TYPES: `/air-services/settings/asset-management/contract-types`,
  PURCHASE_ORDER_FIELDS: `/air-services/settings/asset-management/purchase-order-fields`,
  FIELD_MANAGER: `/air-services/settings/service-management/field-manager`,
  TICKET_FIELDS: `/air-services/settings/service-management/field-manager/ticket-fields`,
  TASK_FIELDS: `/air-services/settings/service-management/field-manager/task-fields`,
  TIME_ENTRY_FIELDS: `/air-services/settings/service-management/field-manager/time-entry-fields`,
  ASSET_TYPE_DEFAULT_FIELDS: `/air-services/settings/asset-management/asset-type/default-fields`,
  ASSET_TYPE_CREATE_FIELDS: `/air-services/settings/asset-management/asset-type/create-fields`,
  CONTACT_TYPE_CREATE_FIELDS: `/air-services/settings/asset-management/contract-types/create-fields`,
};

export const AIR_CUSTOMER_PORTAL = {
  DASHBOARD: `/air-customer-portal`,
  EDIT_PROFILE: `/air-customer-portal/edit-profile`,
  TICKETS: `/air-customer-portal/tickets`,
  SINGLE_TICKETS: `/air-customer-portal/tickets/single-ticket`,
  KNOWLEDGE_BASE: '/air-customer-portal/knowledge-base',
  KNOWLEDGE_BASE_DETAIL:
    '/air-customer-portal/knowledge-base/knowledge-base-detail',
  AIR_CUSTOMER_PORTAL_LOGIN: '/air-customer-portal/log-in',
  AIR_CUSTOMER_PORTAL_SIGN_UP: '/air-customer-portal/sign-up',
  CUSTOMER_PORTAL_VERIFICATION: '/air-customer-portal/verification',
  SINGLE_CATALOG_SERVICE_DETAILS: `/air-customer-portal/catalog/detail`,
  CATALOG_SERVICES: '/air-customer-portal/catalog',
  NON_REGISTER_DASHBOARD: '/air-customer-portal/non-register-dashboard',
  KNOWLEDGE_BASE_TICKET_DETAIL:
    '/air-customer-portal/knowledge-base/knowledge-base-detail/knowledge-base-ticket-detail',
  CUSTOMER_PORTAL_DASHBOARD: '/air-customer-portal',
  APPROVALS: '/air-customer-portal/catalog/approvals',
  APPROVALS_DETAIL: '/air-customer-portal/catalog/approvals/detail',
  UPSERT_SURVEY_RESPONSE: '/air-customer-portal/survey',
};

export const ORG_ADMIN: any = {
  DASHBOARD: '/org-admin/dashboard',
  ROLES_AND_RIGHTS: '/org-admin/roles-and-rights',
  ADD_ROLE: '/org-admin/roles-and-rights/add-role',
  PROPERTIES: '/org-admin/properties',
  MODULE_FORMS: '/org-admin/properties/module-forms',
  DYNAMIC_FIELDS: '/org-admin/properties/dynamic-fields',
};

export const AIR_OPERATIONS = {
  WORKFLOW_AUTOMATION: `/air-operations/workflow-automation`,
  SALES_WORKFLOW: `/air-operations/workflow-automation/sales-workflow`,
  UPSERT_SALES_WORKFLOW: `/air-operations/workflow-automation/sales-workflow/upsert-sales-workflow`,
  SERVICES_WORKFLOW: `/air-operations/workflow-automation/services-workflow`,
  MARKETING_WORKFLOW: `/air-operations/workflow-automation/marketing-workflow`,
  ROLES_AND_RIGHTS: `/air-operations/roles-and-right`,
  UPSERT_MARKETING_WORKFLOW: `/air-operations/workflow-automation/marketing-workflow/upsert-marketing-workflow`,
  UPSERT_SCHEDULE_WORKFLOW: `/air-operations/workflow-automation/services-workflow/upsert-schedule-workflow`,
  UPSERT_EVENT_BASED_WORKFLOW: `/air-operations/workflow-automation/services-workflow/upsert-event-based-workflow`,
  UPSERT_SUPERVISOR_RULES: `/air-operations/workflow-automation/services-workflow/upsert-supervisor-rules`,
  REPORTS: `/air-operations/reports`,
  SALES_REPORTS: `/air-operations/reports/sales-reports`,
  SERVICES_REPORTS: `/air-operations/reports/services-reports`,
  MARKETING_REPORTS: `/air-operations/reports/marketing-reports`,
  SALES_REPORTS_RESTORE: `/air-operations/reports/sales-reports/restore`,
  SERVICES_REPORTS_RESTORE: `/air-operations/reports/services-reports/restore`,
  MARKETING_REPORTS_RESTORE: `/air-operations/reports/marketing-reports/restore`,
  UPSERT_ROLES: '/air-operations/roles-and-right/upsert-roles-and-right',
  UPSERT_GENERIC_REPORTS: `/air-operations/reports/upsert-generic-reports`,
  SINGLE_GENERIC_REPORTS_DETAILS: `/air-operations/reports/single-report-view`,
};

export const AIR_CALL_CENTER = {
  CALL_DETAILS: '/air-call-center/call-metrics/call-details',
  CALL_METRICS: '/air-call-center/call-metrics',
  SETTINGS_BUSINESS_HOURS:
    '/air-call-center/settings/general-settings/business-hours',
  CREATE_SERVICES_REPORTS: `/air-operations/reports/services-reports/create-services-reports`,
};

export const AIR_LOYALTY_PROGRAM = {
  REWARDS: `/air-loyalty-program/loyalty/rewards`,
  ADD_REWARDS: `/air-loyalty-program/loyalty/rewards/add-rewards`,
  GIFT_CARDS: `/air-loyalty-program/gift-cards/gift-cards`,
  VOUCHERS: `/air-loyalty-program/loyalty/vouchers`,
  VOUCHER_REDEMPTION_LIST: `/air-loyalty-program/loyalty/vouchers/voucher-redemptions-list`,
  SINGLE_GIFT_CARD_TRANSACTION_DETAIL: `/air-loyalty-program/gift-cards/gift-cards/transaction-details`,
  DIGITAL_REWARDS_DETAIL: `/air-loyalty-program/loyalty/rewards/digital/single-digital-detail`,
  PHYSICAL_REWARDS_DETAIL: `/air-loyalty-program/loyalty/rewards/physical/single-physical-detail`,
  PHYSICAL_GIFT_CARD_DESIGN: `/air-loyalty-program/gift-cards/gift-cards/physical-card-design`,
  EDIT_PHYSICAL_GIFT_CARD_DESIGN: `/air-loyalty-program/gift-cards/gift-cards/physical-card-design/edit`,
  TOP_USER: '/',
  UPSERT_ROLES: '/air-loyalty-program/roles-and-right/upsert-roles-and-right',
  ROLES_AND_RIGHTS: '/air-loyalty-program/roles-and-right',
};

export const SOCIAL_COMPONENTS = {
  COMPANIES: `/social-components/companies`,
  VIEW_COMPANY_DETAILS: '/social-components/companies/view-details',
  MEETINGS: '/social-components/meetings',
  MEETINGS_SETTINGS: '/social-components/meetings/settings',
  SCHEDULE_MEETING: '/social-components/meetings/schedule-meetings',
  UPSERT_MEETING:
    '/social-components/meetings/schedule-meetings/upsert-meeting',
  CALENDER_VIEW: '/social-components/meetings/calendar-view',
  CREATE_MEETING_TEMPLATE:
    '/social-components/meetings/schedule-meetings/upsert-meeting/email-template/create-email-template',
  EMAIL_TEMPLATE:
    '/social-components/meetings/schedule-meetings/upsert-meeting/email-template',
};

export const AUTH = {
  FORGOT_PASSWORD: `/forget-password`,
  LOGIN: `/login`,
  SALE_SITE: 'https://airapplecart.co.uk/',
};

export const Quick_Links_Routes = {
  CALLING: '/social-components/calling',
  DOCUMENT: '/social-components/documents',
  CHAT: '/social-components/chat',
  EMAIL: '/social-components/email',
  COMPANIES: '/social-components/companies',
  MEETINGS: '/social-components/meetings',
};

export const EMAIL_SUB_ROUTES = {
  EMAIL_CONVERSATIONS: '/social-components/email/conversations',
};

export const productSuiteName = {
  crm: 'CRM',
  string: 'string',
  product: 'product',
};

export const dealStatus = {
  WON: 'Won',
  LOSS: 'Loss',
  INITIAL_NUMBER: 0,
};

export const DATE_RANGE = {
  START_DATE: 0,
  END_DATE: 1,
};

export const PLAN_CALCULATIONS = {
  PLAN_DISCOUNT: 0.2,
};

export const EQuickLinksType = {
  PRODUCT: 'PRODUCT',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ORG_ADMIN: 'ORG_ADMIN',
  COMPANY_OWNER: 'COMPANY_OWNER',
  ORG_EMPLOYEE: 'ORG_EMPLOYEE',
};

export const QUICKLINKSROLES = {
  SUPER_ADMIN: 'super-admin',
  ORG_ADMIN: 'org-admin',
};

export const DOCUMENTS_ACTION_TYPES = {
  MOVE_FOLDER: 'move-folder',
  UPDATE_FOLDER: 'update-folder',
};

export const DOCUMENTS_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
};

export const fieldName = {
  ADDRESS: 'address',
  EMAIL: 'email',
};

export const CREATE_EMAIL_TYPES = {
  NEW_EMAIL: 'new',
  FORWARD: 'forward',
  REPLY: 'reply',
  REPLY_ALL: 'reply-all',
  DRAFT: 'draft',
  TRASH: 'trash',
};

export const EMAIL_TABS_TYPES = {
  SENT: 'sent',
  DRAFT: 'draft',
  DRAFTS: 'drafts',
  INBOX: 'inbox',
  TRASH: 'trash',
  SCHEDULE: 'schedule',
};
export const OUTLOOK_EMAIL_TABS_TYPES = {
  SENT: 'Sent Items',
  DRAFT: 'draft',
  DRAFTS: 'Drafts',
  INBOX: 'Inbox',
  TRASH: 'Deleted Items',
  SCHEDULE: 'Schedule',
};

export const CHAT_MESSAGE_TYPE = {
  IMAGE: 'image',
  DOC: 'document',
  PLAIN: 'plain',
};

export const API_STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
};
export const associationCompanies = {
  existingContacts: 'Existing Contacts',
  newContacts: 'New Contact',
  existingDeals: 'Existing Deals',
  associationTypeDeals: 'deals',
  newDeal: 'New Deal',
  invalidDate: 'Invalid Date',
  zero: 0,
};

export const TASK_TYPE = {
  CREATE_TASK: 'create',
  EDIT_TASK: 'edit',
  UPDATE_TASK: 'update',
};
export const ORGANIZATION_DRAWER_TYPES = {
  EDIT: 'Edit Company',
  UPDATE: 'Update Company',
};
export const goalsStatus = {
  inProgress: 'In-Progress',
  expired: 'Expired',
};

export const createGoal = {
  setting: 'setting',
  userTeam: 'userTeam',
  team: 'TEAM',
};

export const indexNumbers = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 2,
  FOUR: 2,
};
export const TASK_TABS_TYPES = {
  PENDING: 'Pending',
  INPROGRESS: 'Inprogress',
  COMPLETE: 'Complete',
};
export const TASK_STATUS = {
  CONTACTS: 'contacts',
  COMPANIES: 'companies',
  DEALS: 'deals',
  ASSOCIATIONS: 'associations',
  TICKETS: 'tickets',
};
export const TASK_TABS = {
  CONTACTS: 'contacts',
  COMPANIES: 'companies',
  DEALS: 'deals',
  ASSOCIATIONS: 'associations',
  TICKETS: 'tickets',
};
export const TICKETS_TYPE = {
  NEW_TICKETS: 'new-ticket',
};
export const CREATE_DASHBOARD_KEYS = {
  DEALS_CREATED_VS_CLOSED: 'Deals created vs Closed Deals',
  DEAL_REPORTS: 'Deal Reports',
  MEETING_DETAILS: 'Meeting Details',
  FORECAST_CATEGORY_REPORTS: 'Forecast Category Reports',
  FORECAST_PIPELINE_REPORT: 'Forecast Pipeline Report',
  TEAM_ACTIVITIES_BY_DATE: 'Team Activities by Activity Date',
  TOTAL_DEALS_OPEN_DEALS:
    'Total Deals, Open Deals, Team Goals, Closed/Won, Published Quotes',
};

export const COMPANITES_TYPE = {
  NEW_COMPANY: 'new-Company',
  COMPANY: 'company',
  EXT_COMPANY: 'existing-company',
};

export const CONTACT_TYPE = {
  NEW_CONTACT: 'new-contact',
  EXT_CONTACT: 'existing-contact',
};

export const PRODUCTS_TYPE = {
  NEW_PRODUCT: 'new-products',
  EXT_PRODUCT: 'existing-products',
};

export const Gmail_CONST = {
  DATE: 'Date',
  FROM: 'From',
  TO: 'To',
  SUBJECT: 'Subject',
  CC: 'cc',
  BCC: 'Bcc',
  INBOX: 'INBOX',
  PHONE: 'phone',
  SENT: 'SENT',
  TRASH: 'TRASH',
  Cc: 'Cc',
  cc: 'CC',
};

export const EMAIL_ENUMS = {
  SCHEDULED: 'SCHEDULED',
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ARCHIVED: 'ARCHIVED',
  ALL: 'ALL',
};

export const REPORTS_HEADER_TITLE = {
  CREATE_REPORT: 'Create Report',
  CREATE_TABLE: 'Create Table',
  CREATE_CHART: 'Create Chart',
  CREATE_TEXT: 'Create Text',
  CREATE_COUNTER: 'Create Counter',
  CUSTOMIZE_REPORT: 'Customize Report',
  CHOOSE_TEMPLATE: 'Choose Template',
};

export const ASSOCIATIONS_API_PARAMS_FOR = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  DEALS: 'deals',
  COMPANIES: 'companies',
  CONTACTS: 'contacts',
  TICKETS: 'tickets',
  QUOTES: 'quotes',
  ASSETS: 'assets',
  PURCHASE_ORDER: 'purchase_orders',
  ATTACHMENTS: 'attachments',
};

export const MAIL_TYPES = {
  OUTLOOK: 'outlook',
  GMAIL: 'gmail',
};

export const DRAWER_TITLE = {
  VIEW: 'View',
  EDIT: 'Edit',
  ADD: 'Add',
};

export const FILE_TYPES = {
  IMAGE: 'image/',
  TEXT: 'text/',
  PDF: 'application/pdf',
  DOC: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export const TEMPLATE_CONTENT_TYPES = {
  TEXT_AREA: 'textarea',
  SPACE: 'space',
  DIVIDER: 'divider',
  BUTTON: 'button',
};
export const TEMPLATE_VIEW_TYPES = {
  MOBILE: 'mobile',
  LAPTOP: 'laptop',
};

export const EMAIL_DATE_FORMAT = {
  DATE_FORMAT: 'MMMM D, YYYY [at] h:mm:ss A',
};

export const RADIO_VALUE = {
  USER: 'USER',
  FROM: 'from',
  TO: 'to',
};
export const CHAT_MESSAGE_ROLES = {
  SENDER: 'sender',
  RECEIVER: 'receiver',
};
export const TEMPLATES_CARDS = {
  GIFT_CARD: 'GiftCard',
  LOYALTY_TOKEN: 'Loyalty Token',
  VOUCHER: 'Voucher',
  CREDITS: 'Credits',
};

export const GOALS_YEARLY_FORMAT = {
  MONTHLY: 'monthly',
  YEARLY: 'Yearly',
  QUARTERLY: 'quarterly',
  CUSTOM: 'custom',
};
export const BILLING_AND_INVOICES_TAB = {
  INVOICES: 'invoices',
  SUBSCRIPTION: 'subscription',
};

export const PLAN_PRICE_TYPE_TAGS = {
  FREE_PLAN: 'Free Plan',
  PAID_PLAN: 'Paid Plan',
  FREE: 'Free',
};
export const PLAN_PAYMENT_TYPE_TAGS = {
  PAID_MONTHLY: 'paidMonthly',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  HALF_YEARLY: 'HALF_YEARLY',
  YEARLY: 'YEARLY',
  ONE_TIME: 'ONE_TIME',
};

export const PLAN_PAYMENT = {
  FREE: 'Free',
  PAID: 'PAID',
};
export const PLAN_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'INACTIVE',
};

export const AIR_SALES_DASHBOARD_REPORTS_TYPES = {
  DEALS_CREATED_VS_CLOSED_DEALS: 'Deals_created_vs_Closed_Deals',
  MEETING_DETAILS: 'Meeting_Details',
  TEAM_ACTIVITIES_BY_ACTIVITY_DATE: 'Team_Activities_by_Activity_Date',
  TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES:
    'Total_Deals_Open_Deals_Team_Goals_Closed_Won_Published_Quotes',
  DEAL_REPORTS: 'Deal_Reports',
  FORECAST_PIPELINE_REPORT: 'Forecast_Pipeline_Report',
  FORECAST_CATEGORY_REPORTS: 'Forecast_Category_Reports',
};

export const AIR_MARKETER_DASHBOARD_REPORTS_TYPES = {
  NEW_CONTACTS_AND_CUSTOMERS: 'New_Contacts_and_Customers',
  CTA_TOTAL_VIEWS_AND_ADS_SUBMISSIONS: 'CTA_Total_Views_and_Ads_Submissions',
  TOTAL_MARKETING_EMAIL: 'Total_Marketing_Email',
  LEAD_CAPTURED_FORMS: 'Lead_Captured_Forms',
  PROFILE_STATS: 'Profile_Stats',
  SMS_MARKETING_GRAPH: 'SMS_Marketing_Graph',
  WHATSAPP_MARKETING_GRAPH: 'Whatsapp_Marketing_Graph',
};

export const AIR_MARKETER_DASHBOARD = {
  SINGLE_DASHBOARD: `/air-marketer/dashboard`,
};
export const AIR_SALES_DASHBOARD = {
  SINGLE_DASHBOARD: `/air-sales/dashboard`,
};

export const PRODUCT_LABELS = {
  AIR_SALES: 'Air Sales',
  AIR_SERVICES: 'Air Services',
  AIR_MARKETER: 'Air Marketer',
  AIR_OPERATIONS: 'Air Operations',
  LOYALTY_PROGRAM: 'Loyalty Program',
  CALL_CENTER: 'Call Center',
  CUSTOMER_PORTAL: 'Customer Portal',
  ORG_ADMIN: 'Org Admin',
  COMMON_FEATURES: 'Common Features',
};

export const AIR_SALES_GOAL_NOTIFICATION = {
  STARTED: 'goalStarted',
  EXCEEDED: 'goalExceeded',
  ACHIEVED: 'goalAchieved',
  MISSED: 'goalMissed',
};

export const CHAT_TYPES = {
  GROUP_CHAT: 'groupChat',
  PERSONAL_CHAT: 'personalChat',
  SENDER: 'sender',
  RECIEVER: 'receiver',
};

export const PROFILE_DROPDOWNS = {
  EDIT_PROFILE: 'Edit Profile',
  AIR_CUSTOMER_PORTAL: 'air-customer-portal',
  CHANGE_PASSWORD: 'Change Password',
  DELEGATE: 'Delegate',
};

export const MANAGE_ACCESS_VISIBLE = {
  EVERYONE: 'EVERYONE',
  TEAMS: 'TEAMS',
  USERS: 'USERS',
};

export const PRODUCT_EXTERNAl_LINKS = {
  AIR_SALES: 'https://airapplecart.co.uk/product/air-sales',
  AIR_SERVICES: 'https://airapplecart.co.uk/product/air-service',
  AIR_MARKETER: 'https://airapplecart.co.uk/product/air-marketer',
  AIR_OPERATIONS: 'https://airapplecart.co.uk/product/air-operation',
  LOYALTY_PROGRAM: 'https://airapplecart.co.uk/product/air-loyalty-program',
  CALL_CENTER: 'https://airapplecart.co.uk/product/air-call-center',
  CUSTOMER_PORTAL: '',
  ORG_ADMIN: '',
  COMMON_FEATURES: '',
};

export const bypassPermissionsDictionary: any = {
  'service-customer-portal-report-an-issues': true,
};
