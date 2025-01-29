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
  ddddDDMMMYYY: 'dddd DD/MM/YYY',
  YYMMDD: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  DDMMM: 'DD MMM',
  DDMMMYYYY: 'DD MMM YYYY',
  HHMMA: 'hh:mm A',
  MMMMD: 'MMMM D[th] [at] h:mmA',
  MMM: 'MMM',
  DD: 'DD',
  DDDD: 'dddd',
  DUE_DATE_TIME: 'YYYY-MM-DD hh:mm A',
  GOAL_DATE_FORMAT: 'MMM DD YYYY',
  FORMAT_24_HOUR: 'DD MMM, YYYY HH:mm',
  MMM_DD_YYYY_hh_mm_A: 'MMM DD, YYYY - hh:mm A',
  DD_MMM_YYYY_hh_mm_A: 'DD MMM, YYYY - hh:mm A',
  DD_MM_YYYY_hh_mm_A: 'DD/MM/YYYY  hh:mm A',
  DDDD_MMMM_D_YYYY_HH_M_A: 'dddd, MMMM D, YYYY  hh:mm A',
  YYYY_MM_DDTHH_MM_SS_Z: 'YYYY-MM-DDTHH:mm:ss[Z]',
};

export const ERROR_PAGES = {
  NOT_FOUND: '/404',
  NOT_ACCESS: '/403',
  NOT_FOUND_DEFAULT: 404,
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
  REPORTS: '/super-admin/reports',
  FAQS: '/super-admin/settings/faqs',
  ENQUIRIES: '/super-admin/settings/enquiries',
  TAX_CALCULATION: '/super-admin/settings/tax-calculation',
  QUICK_LINK: '/super-admin/settings/quick-links',
  NEWS_EVENTS: '/super-admin/settings/news-and-events',
  PRODUCT_LIST: '/super-admin/settings/product-list',
  PRODUCT_FEATURES: '/super-admin/settings/product-features',
};

export const ORG_ADMIN: any = {
  DASHBOARD: '/org-admin/dashboard',
  ROLES_AND_RIGHTS: '/org-admin/roles-and-rights',
  ADD_ROLE: '/org-admin/roles-and-rights/add-role',
  PROPERTIES: '/org-admin/properties',
  MODULE_FORMS: '/org-admin/properties/module-forms',
  DYNAMIC_FIELDS: '/org-admin/properties/dynamic-fields',
  USERS: '/org-admin/users',
};

export const AIR_CALL_CENTER = {
  CALL_DETAILS: '/air-call-center/call-metrics/call-details',
  CALL_METRICS: '/air-call-center/call-metrics',
  SETTINGS_BUSINESS_HOURS:
    '/air-call-center/settings/general-settings/business-hours',
  CREATE_SERVICES_REPORTS: `/air-operations/reports/services-reports/create-services-reports`,
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
  RESET_PASSWORD: '/reset-password',
  SET_PASSWORD: '/set-password',
};

export const Quick_Links_Routes = {
  CALLING: '/social-components/calling',
  DOCUMENT: '/social-components/documents',
  CHAT: '/social-components/chat',
  EMAIL: '/social-components/email',
  COMPANIES: '/social-components/companies',
  CONTRACTS: '/air-social/contracts',
  MEETINGS: '/social-components/meetings',
  CONTACTS: '/air-social/contacts',
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
  TEN: 10,
};
export const TASK_TABS_TYPES = {
  PENDING: 'Pending',
  INPROGRESS: 'Inprogress',
  COMPLETE: 'Complete',
  InProgress: 'INPROGRESS',
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
  COMPANY: 'COMPANY',
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
export const MAIL_KEYS = {
  OUTLOOK: 'OUTLOOK',
  GMAIL: 'GMAIL',
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

  SMS_MARKETING: 'SmsMarketing',
  WHATSAPP_MARKETING: 'WhatsappMarketing',
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
  ACTIVITY_LOGS: 'Activity Logs',
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

export const ACTIVITY_STATUS_MENU = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
};

export const MODULE_NAME_FOR_MEETINGS = {
  COMPANIES: 'COMPANIES',
  DEALS: 'DEALS',
  CONTACTS: 'CONTACT',
};
export const MARKETING_REPORTS_TYPES = {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  CUSTOM: 'CUSTOM',
  TODAY: 'TODAY',
  WEEKLY: 'WEEKLY',
};

export const ALL_COMPANIES = {
  ALL_COMPANIES: 'All Companies',
};

export const CONTRACTS_STATUS = {
  DRAFT: 'DRAFT',
  SIGNED: 'SIGNED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  CHANGE_REQUEST: 'CHANGE_REQUEST',
  VIEWED: 'VIEWED',
  SENT: 'SENT',
  ALL: 'ALL',
  DEFAULT: 'DEFAULT',
};

export const CONTRACTS_STATUS_TITLES = {
  ALL_CONTRACTS: 'All Contracts',
  DRAFT: 'Draft',
  PENDING: 'Pending',
  SIGNED: 'Signed',
  REJECTED: 'Rejected',
};
export const GlobalSearchSuperAdminModules = {
  USER_MANAGEMENT: 'User_management',
  PLAN_MANAGEMENT: 'Plan_management',
  BILLING_INVOICES: 'Billing_invoices',
  REPORTS: 'Reports',
  FAQs: 'Faqs',
  ENQUIRIES: 'Enquiries',
  TAX: 'Tax',
  TAX_CALCULATION: 'Tax_calculation',
  QUICK_LINKS: 'Quick_links',
  NEWS_EVENTS: 'News_and_events',
  MODULE_CREATION: 'Module_Creation',
  PRODUCT_FEATURES: 'Product_features',
};

export const GlobalSearchOrgAdminModules = {
  USERS: 'Users',
  Organization: 'Organizations',
  Subscription_Invoice: 'Subscription & Invoices',
  Properties: 'Properties',
  Roles_Rights: 'Role and Rights',
  sales_product_categories: 'Sales Product categories',
  Life_Cycle_stages: 'Life Cycle Stage',
  Contact_Status: 'Contact Status',
  Receiver_Bank_Account: 'Receiver Bank Account',
};

export const GlobalSearchAirSalesModules = {
  Deals: 'Deals',
  Forecast: 'Forecast',
  Quotes: 'Quotes',
  Tasks: 'Tasks',
  Invoices: 'Invoices',
  Reports: 'Reports',
  Settings: 'Settings',
  Sales_Product: 'Sales Product',
  Deal_Pipelines: 'Deal Pipelines',
  Roles_Rights: 'Roles and Rights',
  User_Management: 'User Management',
  Notifications: 'Notifications',
  Setting_Forecast: 'Forecasts',
  CALLS: 'Calls',
  CONTACTS: 'Contacts',
  MEETINGS: 'Meetings',
  DOCUMENTS: 'Documents',
  CHATS: 'Chats',
  EMAILS: 'Emails',
  COMPANIES: 'Companies',
};

export const GlobalSearchAirServicesModules = {
  Tickets: 'Tickets',
  Inventory: 'INVENTORYS',
  Software: 'SOFTWARES',
  Contracts: 'CONTRACTS',
  Purchase_Orders: 'PURCHAHSE_ORDERS',
  knowledge_base: 'Knowledge Base',
  WorkLoad: 'WorkLoad',
  Feedback_Survey: 'Feedback Survey',
  Reports: 'REPORTS',
  Enquiries: 'ENQUIRIES',
  Signup_Leads: 'Signup Leads',
  Account_Settings: 'Account Settings',
  User_Management: 'User Management',
  departments: 'DEPARTMENTS',
  agents: 'AGENTS',
  AGENT_REQUESTERS: 'AGENT_REQUESTERS',
  Requesters: 'REQUESTERS',
  Roles: 'ROLES_AND_RIGHTS',
  Asset_Management: 'Asset Management',
  ASSET_TYPES: 'ASSET_TYPES',
  PRODUCT_CATALOGS: 'PRODUCT_CATALOGS',
  VENDORS: 'VENDORS',
  Agent_Productivity: 'Agent Productivity & Workload Management',
  CANNED_RESPONSES: 'CANNED_RESPONSES',
  WORKLOADS: 'WORKLOADS',
  Service_Management: 'Service Management',
  BUSINESS_HOURS: 'BUSINESS_HOURS',
  Customer_Portal: 'Customer portal',
  CATALOGS: 'CATALOGS',
  KNOWLEDGE_BASE: 'KNOWLEDGE_BASE',
};

export const GlobalSearchAirOperationModules = {
  Data_Management: 'Data Management',
  Integrations: 'Integrations',
  Workflow_Automation: 'Workflow Automation',
  Reports: 'Reports',
  Roles_Right: 'Roles and Right',
  User_Management: 'User Management',
  DEALS: 'DEALS',
  QUOTES: 'QUOTES',
  TASKS: 'TASKS',
};
