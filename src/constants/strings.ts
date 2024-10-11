export const BILLING_CYCLE = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  ANNUAL: 'YEARLY',
  HALF_YEARLY: 'HALF_YEARLY',
  ONE_TIME: 'ONE_TIME',
};

export const TIME_PERIODS = {
  NONE: 'NONE',
  ALL_TIME: 'ALL_TIME',
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  PREVIOUS_WEEK: 'PREVIOUS_WEEK',
  PREVIOUS_MONTH: 'PREVIOUS_MONTH',
  NEXT_WEEK: 'NEXT_WEEK',
  NEXT_MONTH: 'NEXT_MONTH',
  TODAYS: 'Today',
  YESTERDAYS: 'Yesterday',
  SEVEN_DAYS: 'Last 7 Days',
  THIRTY_DAYS: 'Last 30 Days',
  CUSTOM_RANGE: 'Custom Range',
};

export const EXPORT_TYPE = {
  CSV: 'CSV',
  XLS: 'XLS',
  PDF: 'PDF',
};

export const TICKET_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESOLVED: 'RESOLVED',
  PENDING: 'PENDING',
  SPAM: 'SPAMS',
  SHARE_WITH_ME: 'SHARE_WITH_ME',
};

export const SOCKETS_EVENTS = {
  NOTIFICATION_EVENT: 'NOTIFICATION_EVENT',
};

export const TICKET_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};
export const TICKET_CATEGORY = {
  SOFTWARE: 'SOFTWARE',
  HARDWARE: 'HARDWARE',
  NETWORK: 'NETWORK',
  OFFICE_APPLICATION: 'OFFICE_APPLICATION',
  OFFICE_FURNITURE: 'OFFICE_FURNITURE',
};

export const TICKET_IMPACT = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};
export const IMPORT_ACTIONS = {
  CANCEL: 'CANCEL',
  NEXT: 'NEXT',
  BACK: 'BACK',
  IMPORT: 'IMPORT',
};
export const IMPORT_ACTIONS_STEPS = {
  STEP_ONE: 0,
  STEP_TWO: 1,
  STEP_THREE: 2,
};

export const PHONE_NUMBER_TYPE = {
  MASK_NUMBER: 'maskNumber',
};
export const TICKET_APPROVALS = {
  ALL: 'ALL',
  RECEIVED: 'RECIEVED',
  REQUESTED: 'REQUESTED',
  APPROVE: 'APPROVED',
  REJECT: 'REJECTED',
  CANCEL: 'CANCELED',
  PENDING: 'PENDING',
  REMINDER: 'REMINDER',
};

export const CONTRACT_TYPES = {
  LEASE: 'LEASE',
  MAINTENANCE: 'MAINTENANCE',
  SOFTWARE_LICENSE: 'SOFTWARE_LICENCE',
  WARRANTY: 'WARRANTY',
};

export const CONTRACT_STATUS = {
  APPROVED: 'APPROVED',
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REJECTED: 'REJECTED',
  TERMINATED: 'TERMINATED',
};

export const LICENSE_TYPE = {
  VOLUME: 'VOLUME',
  ENTERPRISE: 'ENTERPRISE',
  TRIAL: 'TRIAL',
  OPEN_SOURCE: 'OPEN_SOURCE',
  FREE: 'FREE',
};

export const PURCHASE_ORDER_STATUS = {
  ORDERED: 'ORDERED',
  OPEN: 'OPEN',
  CANCELLED: 'CANCELLED',
  RECEIVED: 'RECEIVED',
  PARTLY_RECEIVED: 'PARTLY_RECEIVED',
  APPROVED: 'APPROVED',
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  CLOSED: 'CLOSED',
  REJECTED: 'REJECTED',
};

export const ASSET_IMPACT = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const ASSET_IMPACT_FILTER = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TICKET_TYPE = {
  INC: 'INC',
  SR: 'SR',
  EQ: 'EQ',
};

export const ASSET_TYPE = {
  SERVICES: 'services',
  HARDWARE: 'hardware',
  SOFTWARE: 'software',
  HARDWARE_CONSUMABLE: 'HardWare/Consumable',
};

export const SOFTWARE_STATUS = {
  RESTRICTED: 'Restricted',
  IGNORED: 'Ignored',
  MANAGED: 'Managed',
  DISABLED: 'Disabled',
  IN_REVIEW: 'InReview',
  ALL_SOFTWARE: 'All Software',
};

export const expande_status = {
  List_View: 'List View',
  Broad_List: 'Board List',
  Create_Deal: 'Create Deal',
  Import_Deals: 'Import Deals',
};

export const SOFTWARE_TYPE = {
  DESKTOP: 'Desktop',
  SAAS: 'Saas',
  MOBILE: 'Mobile',
};

export const AIR_CUSTOMER_PORTAL_TICKET = {
  CLOSED: 'Closed',
  PROCESSING: 'Processing',
};

export const NOTISTACK_VARIANTS: {
  SUCCESS: 'success';
  ERROR: 'error';
  WARNING: 'warning';
  INFO: 'info';
} = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const ALERT_MODALS_TYPE = {
  DELETE: 'delete',
  WARNING: 'warning',
  INFO: 'Information',
  RESTORE: 'Restore',
  REMINDER: 'reminder',
};

export const CATALOG_SERVICE_TYPES = {
  ALL: 'ALL Services',
  HARDWARE: 'Hardware',
  SOFTWARE_INSTALLATION: 'Software Installation',
  PM_TOOLS: 'PM Tools',
};

export const CATALOG_SERVICE = {
  DATA_BACKUP: 'Data Backup',
};

export const TICKETS_CONVERSATION_TYPE = {
  REPLY: 'Reply',
  FORWARD: 'Forward',
  DISCUSS: 'Discuss',
  NOTE: 'Note',
};

export const TICKETS_CONVERSATION_VALUE = {
  FILE: 'file',
  DESCRIPTION: 'description',
};

export const TICKETS_CONVERSATION_Description_Type = {
  REPLY: 'replyDescription',
  FORWARD: 'forwardDescription',
  NOTE: 'noteDescription',
};
export const TICKETS_CONVERSATION_MODAL_TYPE = {
  CANNED: 'Add Canned Response',
  ARTICLE: 'Add New Article',
};
export const EXPORT_FILE_TYPE: any = {
  [EXPORT_TYPE?.CSV]: 'text/csv',
  [EXPORT_TYPE?.XLS]:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [EXPORT_TYPE?.PDF]: 'application/pdf',
};

export const VIEW_TYPES = {
  TABLE: 'table',
  BOARD: 'board',
};

export const EXPENSE_TYPE = {
  PURCHASE: 'Purchase Cost',
  MAINTENANCE: 'Maintenance Cost',
};

export const TICKETS_ISSUES_TYPE = {
  SERVICES: 'Services',
  INCIDENT: 'Incident',
};
export const TICKET_TYPES = {
  ALL_TICKETS: 'All Tickets',
  URGENT_AND_HIGH_PRIORITY: 'Urgent and High Priority',
  MY_OVERDUE_TICKETS: 'My Overdue Tickets',
  MY_OPEN_AND_PENDING_TICKETS: 'My Open and Pending Tickets',
  NEW_AND_MY_OPEN_TICKETS: 'New & My Open Tickets',
  OPEN_TICKETS_IN_MY_GROUP: 'Open Tickets in My Groups',
  SPAM_TICKETS: 'Spam Tickets',
  UNRESOLVED_TICKETS: 'All Unresolved Tickets',
  INCIDENTS: 'Incidents',
  SERVICE_REQUEST: 'Service Requests',
  TICKETS_I_REQUESTED: 'Tickets I Requested',
  SHARED_WITH_ME: 'Shared with me',
};

export const PRODUCT_CATALOG_STATUS = {
  IN_PRODUCTION: 'IN_PRODUCTION',
  PIPELINE: 'PIPELINE',
  RETIRED: 'RETIRED',
};

export const MODE_OF_PROCUREMENT = {
  BUY: 'BUY',
  LEASE: 'LEASE',
  BOTH: 'BOTH',
};

export const MESSAGE_EXPORT_FILE_TYPE: any = {
  [EXPORT_TYPE?.CSV]: 'csv',
  [EXPORT_TYPE?.XLS]: 'excel',
};

export const AGENT_REQUEST_STATUS = {
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const SETTINGS_ADD_ROLE = {
  VIEW_TICKET: 'viewTickets',
  EDIT_TASKS: 'createEditTasks',
  ANNOUNCEMENTS: 'announcements',
  EDIT_NOTES: 'editNotes',
  INVENTORY_ASSET: 'viewAsset',
  CONTRACT_ASSET: 'viewContracts',
  PURCHASE_ASSET: 'viewPurchase',
  TICKET_SOLUTIONS: 'solutions',
  DEPARTMENT_HEAD: 'Department Head',
  ADD_ROLE: 'Add Role',
  EDIT: 'Edit',
  DELETE: 'Delete',
};
export const REQUESTORS_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const REQUESTORS_ASSIGNED_STATUS = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  RESOLVED: 'Resolved',
};

export const CALENDAR_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const CANNED_RESPONSES = {
  AVAILABLE_FOR: 'availableFor',
  DELETE: 'delete',
  EDIT: 'edit',
  MOVE: 'move',
  SELECT_AGENTS: 'SELECTED',
  ALL_AGENTS: 'ALL_AGENTS',
  MY_SELF: 'MY_SELF',
  AGENTS: 'agents',
};

export const ROLES_ACTION_CONSTANTS = {
  EDIT: 'Edit',
  VIEW: 'View',
  DELETE: 'Delete',
  ADD_NEW_ROLE: 'Add New Role',
  SAVE: 'Save',
  ADD: 'Add',
  VIEW_ID: 'Id',
};
export const ROLES_ACTION_CONSTANTS_DRAWER_ACTION = {
  ADD_ROLE: 'Add Roles',
};
export const ROLES_ACCORDION_DETAILS = {
  ALL: 'all',
};

export const DASHBOARD = {
  EDIT: 'edit',
};
export const ACTION_STATUS_OPTIONS = {
  OPEN: 'Open',
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
  CLOSE: 'Close',
};
export const USER_MANAGEMENT = {
  USERVIEW: 'User View',
  EDIT: 'Edit',
  BACK: 'Back',
  CANCEL: 'Cancel',
  EDIT_TEAM: 'Edit Team',
};
export const ACTIONS_TYPES = {
  DELETE: 'delete',
  EDIT: 'edit',
  ADD: 'add',
  CLONE: 'clone',
  VIEW: 'view',
};
export const AGENTS = {
  INVITE_AGENT: 'Invite Agent',
  UPDATE_AGENT: 'Update Agent',
};
export const SOFTWARE_USER_ACTIONS_TYPES = {
  ALLOCATE: 'Allocate',
  DEALLOCATE: 'Deallocate',
  REMOVE: 'Remove',
};

export const SOFTWARE_USER_ACTIONS_CLICK = {
  CLOSE_MENU: 'closeMenu',
  ADD_DEVICE: 'Add Device',
  DEALLOCATE_CONTRACT: 'Deallocate Contract',
  REMOVE_CONTRACT: 'Remove Contract',
};
export const TASK_STATUS = {
  TO_DO: 'Todo',
  IN_PROGRESS: 'In-Progress',
  DONE: 'Done',
};
export const CONTRACT_ACTION = {
  RENEW: 'renew',
  EXTEND: 'extend',
};

export const SMS_BROADCAST_CONSTANTS = {
  RECIPIENTS: 'recipients',
  DETAILS: 'detail',
  ATTACHMENT: 'attachment',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export enum ROLES {
  ORG_REQUESTER = 'ORG_REQUESTER',
  ORG_AGENT = 'ORG_AGENT',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_EMPLOYEE = 'ORG_EMPLOYEE',
  ORG_ADMIN = 'ORG_ADMIN',
}

export const TICKETS_STATE = {
  NEW: 'New',
  RESPONSE_DUE: 'Response due',
  OVERDUE: 'Overdue',
  PENDING: 'PENDING',
  OVERDUES: 'OVERDUE',
  PAID: 'PAID',
};

export const ROLE = {
  ORG_REQUESTER: 'ORG_REQUESTER',
  ORG_AGENT: 'ORG_EMPLOYEE',
};

export const WORKLOAD_SCHEDULE = {
  CREATE: 'Create',
  EDIT: 'Edit',
  SAVE: 'Save',
  UPDATE: 'Update',
};

export const ARTICLE_STATUS = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
};
export const MODULE_TYPE = {
  INVENTORIES: 'INVENTORIES',
  TICKETS: 'TICKETS',
  USERS: 'USERS',
  FILES: 'FILES',
  FEATURES: 'FEATURES',
  EXPENSES: 'EXPENSES',
  AWARD_POINTS: 'AWARD_POINTS',
  WORK_SCHEDULE: 'WORK_SCHEDULE',
  ASSET_TYPE: 'ASSET_TYPE',
  DEPARTMENT: 'DEPARTMENT',
  ROLE_RIGHTS: 'ROLE_RIGHTS',
  JOBS: 'JOBS',
  OPERATIONS: 'OPERATIONS',
  ATTACHMENTS: 'ATTACHMENTS',
  CONTRACTS: 'CONTRACTS',
  CONTRACT: 'CONTRACT',
  SERVICE_CATALOG: 'SERVICE_CATALOG',
  PRODUCT_CATALOG: 'PRODUCT_CATALOG',
  ARTICLES: 'ARTICLES',
  LOCATION: 'LOCATION',
  ASSETS: 'ASSETS',
  TICKET: 'TICKET',
  CUSTOMER_PORTAL: 'CUSTOMER_PORTAL',
  SOFTWARE: 'SOFTWARE',
  PURCHASE_ORDER: 'PURCHASE_ORDER',
  INVENTORY: 'INVENTORY',
};
export const TICKET_SELECTION_TYPE = {
  REQUESTER: 'REQUESTER',
  SUBJECT: 'SUBJECT',
  ID: 'ID',
};
export const TICKET_GRAPH_TYPES = {
  STATUS: 'status',
  PRIORITY: 'pirority',
};

export const TICKET_SOURCE = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  PORTAL: 'PORTAL',
  CHAT: 'CHAT',
};
export enum Ticket {
  ticketFields = 'Ticket Fields',
  assetsFields = 'Assets Fields',
  taskFields = 'Task Fields',
}

export const SCHEMA_KEYS = {
  TICKETS: 'TICKETS',
  TICKETS_TASKS: 'TICKETS_TASKS',
  ASSETS: 'ASSETS',
};
export const MODULES = {
  EVENT_BASE: 'EVENT_BASE',
  SCHEDULED: 'SCHEDULED',
  SUPERVISOR_RULES: 'SUPERVISOR_RULES',
};

export const AGENT_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  PROFESSIONAL: 'professional',
  EXPERT: 'expert',
  MASTER: 'master',
};

export const EMAIL_SENT_TYPE = {
  REPLY: 'REPLY',
  FORWARD: 'FORWARD',
  NOTE: 'NOTE',
};

export const TICKET_CONVERSATIONS_TYPE = {
  REPLY: 'REPLY',
  FORWARD: 'FORWARD',
  NOTE: 'NOTE',
  DISCUSS: 'DISCUSS',
};

export const TICKET_CONVERSATIONS_RESPONSE_TYPE = {
  ARTICLE: 'ARTICLE',
  CANNED_RESPONSES: 'CANNED RESPONSES',
};

export const TICKET_CONVERSATIONS_CONTENT_TYPE = {
  LINK: 'LINK',
  CONTENT: 'CONTENT',
};
export const WORKFLOW_CONDITION_TYPE = {
  AND: 'AND',
  OR: 'OR',
};

export const LOYALTY_TRANSACTIONS_TYPE = {
  PHYSICAL_REWARD: 'PHYSICAL_REWARD',
  DIGITAL_REWARD: 'DIGITAL_REWARD',
};

export const LOYALTY_TRANSACTIONS_CHANNEL = {
  BUSINESS_DASHBOARD: 'THROUGH_BUISNESS_DASHBOARD',
};

export const IMPORT_ACTION_TYPE = {
  INVENTORIES: 'inventories',
  PRODUCT_CATALOG: 'productCatalog',
  VENDORS: 'vendors',
  DEALS: 'DEALS',
  TASKS: 'TASKS',
  PRODUCT: 'product',
  Sales: 'Sales',
  Services: 'Services',
};

export const OBJECT_URL_IMPORT = {
  USERS_ATTACHMENT: 'users/attachment',
};

export const AUTH_TOKEN_BYPASS_API = {
  UPLOAD_FILE_TO_S3_USING_SIGNED_URL: 'uploadFileTos3UsingSignedUrl',
};
export const WORKFLOW_TYPE = {
  SAVED: 'SAVED',
  CREATED: 'CREATED',
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
};

export const LOYALTY_RULES_ATTRIBUTES = {
  PURCHASE_AMOUNT: 'PURCHASE_AMOUNT',
  ACCOUNT_CREATION: 'ACCOUNT_CREATION',
  PRODUCT_QTY: 'PRODUCT_QTY',
  NO_OF_VISITS: 'NO_OF_VISITS',
  BIRTHDAY: 'BIRTHDAY',
  FIRST_PURCHASE: 'FIRST_PURCHASE',
  MONEY_OFF: 'MONEY_OFF',
  FREE_SHIPPING: 'FREE_SHIPPING',
};

export const OPERATORS = {
  LESS_THEN: 'LESS_THEN',
  GREATER_THAN: 'GREATER_THAN',
  EQUAL_TO: 'EQUAL_TO',
  LESS_THEN_OR_EQUAL_TO: 'LESS_THEN_OR_EQUAL_TO',
  GREATER_THEN_AND_EQUAL_TO: 'GREATER_THEN_AND_EQUAL_TO',
};

export const LOYALTY_REWARDS_TYPE = {
  ALL: 'ALL',
  PHYSICAL_REWARD: 'PHYSICAL_REWARDS',
  DIGITAL_REWARD: 'DIGITAL_REWARDS',
};

export const RULES_BENEFIT_TYPE = {
  DISCOUNT: 'DISCOUNT',
  AWARD: 'AWARD',
};

export const MEETINGS_DETAILS_TYPE = {
  ALL: 'allMeetings',
  UPCOMING: 'upComming',
  COMPLETED: 'completed',
  ALL_MEETINGS: 'All',
  UPCOMING_MEETINGS: 'Upcoming',
  COMPLETED_MEETINGS: 'Completed',
};
export const MEETINGS_ACTION_TYPE = {
  CREATED: 'created',
  UPDATES: 'updated',
  DELETED: 'deleted',
};

export const CALENDER_TYPES = {
  DAY_VIEW_CALENDER: 'timeGridDay',
  WEEK_VIEW_CALENDER: 'timeGridWeek',
  MONTH_VIEW_CALENDER: 'dayGridMonth',
  YEAR_VIEW_CALENDER: 'multiMonthYear',
};

export const DRAWER_TYPES = {
  EDIT: 'edit',
  ADD: 'add',
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
};

export const CAMPAIGNS_TASKS_CONSTANTS = {
  GRID_VIEW: 'gridView',
  LIST_VIEW: 'listView',
};

export const ROLES_AND_RIGHTS_CONST = {
  PERMISSIONS: 'permissions',
};

export const CONTACTS_CONSTANTS = {
  WHATSAPP_NUMBER: 'whatsAppNumber',
  PHONE_NUMBER: 'phoneNumber',
};

export const CAMPAIGNS_CONSTANTS = {
  TASKS: 'tasks',
  COMMENTS: 'comments',
  CALENDAR: 'calander',
};

export const STATICTICS_STATUS = {
  RECIEVED: 'Received',
  SENT: 'Sent',
  FAILED: 'Failed',
};

export const SMS_MARKETING_CONSTANTS = {
  ALL: 'all',
  GROUP: 'groups',
  DETAIL: 'detail',
  NAME: 'name',
  ATTACHMENT: 'attachment',
};

export const DRAWER_TITLES = {
  EDIT: 'Edit User',
  ADD: 'Add User',
};
export const DRAWER_ACTIONS_TITLES = {
  EDIT: 'Edit',
  ADD: 'ADD',
  VIEW: 'View',
};

export const LOYALTY_SHOP_TYPE = {
  ON_SITE: 'ONSITE',
  DEPARTMENT: 'DEPARTMENT',
  HEADQUARTERS: 'HEADQUARTERS',
  POINT_OF_SALE: 'POINT_OF_SALES',
  WEB_SHOP: 'WEBSHOP',
};

export const LOGICS = {
  AND: 'AND',
  OR: 'OR',
};
export const LOYALTY_REWARDS_STATUS = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
};

export const FIELD_TYPES = {
  MANDATORY_FIELD: 'Mandatory Field',
  OPTIONAL_FIELD: 'Optional Field',
};

export const UPSERT_SHOP_FORM_CONSTANT = {
  EDIT: 'Edit',
  SUBMIT: 'Submit',
  UPDATE_SHOP: 'Update Shop',
  NEW_SHOP: 'New Shop',
};

export const TIME_UNITS = {
  MS: 1000,
  SEC_PER_HOUR: 3600,
  HOURS_PER_DAY: 24,
  MS_PER_MINUTE: 60000,
  SEC_PER_MINUTE: 60,
};

export const LOYALTY_REWARDS_CLASS = {
  RULES: 'RULES',
  TIERS: 'TIERS',
};
export const VOUCHERS_STATUS = {
  ACTIVE: 'Active',
  DEACTIVATE: 'Deactivate',
  EXPIRED: 'Expired',
};
export const DATA_TYPES = {
  NULL: null,
  UNDEFINED: undefined,
  OBJECT: 'object',
  STRING: 'string',
};

export const LOYALTY_TIERS_REWARD_TYPE = {
  FIXED_DISCOUNT: 'FIXED_DISCOUNT',
  FLAT_DISCOUNT: 'FLAT_DISCOUNT',
  POINTS: 'POINTS',
};

export const CALL_TYPES = {
  MISSED: 'Missed',
  COMPLETED: 'Completed',
  ABANDONED: 'Abandoned',
  SUCCESSFUL_CALLBACK: 'Successful Callback',
  UNSUCCESSFUL_CALLBACK: 'Unsuccessful Callback',
  ANSWERED: 'Answered',
  VOICEMAIL: 'Voicemail',
};
export const CALL_TAGS = {
  SALES: 'Sales',
  SERVICE: 'Service',
  CUSTOMER_SUPPORT: 'Customer Support',
  MARKETING: 'Marketing',
  BILLING: 'Billing',
  GENERAL: 'General',
  CALL_BACK: 'Call Back',
  FIRST_CALL: 'First Call',
};
export const CALL_DIRECTION = {
  INCOMING: 'Incoming',
  OUTGOING: 'Outgoing',
};
export const CONTRACT = {
  SAVANNAH_NGUYEN: 'Savannah Nguyen',
  JAMES_SMITH: 'James Smith',
  KRISTIN_WATSON: 'Kristin Watson',
  ANNETTE_BLACK: 'Annette Black',
  LESLIE_ALEXANDER: 'Leslie Alexander',
  JENNY_WILSON: 'Jenny Wilson',
};
export const AGENTS_LIST = {
  SAVANNAH_NGUYEN: 'Savannah Nguyen',
  JAMES_SMITH: 'James Smith',
  KRISTIN_WATSON: 'Kristin Watson',
  ANNETTE_BLACK: 'Annette Black',
  LESLIE_ALEXANDER: 'Leslie Alexander',
  JENNY_WILSON: 'Jenny Wilson',
};
export const PRODUCTS_LISTS = {
  AIR_SALES: 'Air Sales',
  AIR_SERVICES: 'Air Services',
  AIR_CUSTOMER_PORTAL: 'Customer Portal',
  AIR_OPERATIONS: 'Air Operations',
  AIR_LOYALTY_PROGRAM: 'Loyalty Program',
  AIR_MARKETER: 'Air Marketer',
};

export const RULES_TIME_SPAN = {
  THIS_WEEK: 'THIS_WEEK',
  LAST_WEEK: 'LAST_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  CUSTOM_DATE: 'CUSTOM_DATE',
};

export const RULES_OPERATORS = {
  LESS_THAN: 'less than',
  GREATER_THAN: 'greater than',
  EQUAL_TO: 'equal to',
  GREATER_THAN_OR_EQUAL_TO: 'greater than or equal to',
  LESS_THAN_OR_EQUAL_TO: 'less than or equal to',
};

export const LOYALTY_RULE_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'INACTIVE',
};

export const RULES_AUDIENCE_TYPE = {
  CUSTOMER: 'CUSTOMER',
};

export const DONE = 'done';

export const IMPORT_TABLE_NAMES = {
  INVENTORY: 'Inventory',
  VENDORS: 'vendors',
  PRODUCT_CATALOG: 'productCatalog',
};

export const IMPORT_OBJECT_TYPE = {
  TICKET: 'TICKET',
  MANAGE_PORTAL: 'MANAGE_PORTAL',
  ARTICLES: 'ARTICLES',
  CONTRACTS: 'CONTRACTS',
  SETTINGS: 'SETTINGS',
  ASSETS: 'ASSETS',
  CONTACTS: 'CONTACT',
  DEPARTMENTS: 'DEPARTMENTS',
  QUOTE: 'QUOTE',
  EMAILS: 'EMAILS',
  PHYSICAL_REWARDS: 'PHYSICAL_REWARDS',
  DIGITAL_REWARDS: 'DIGITAL_REWARDS',
  RULES_AND_TIERS: 'RULES_AND_TIERS',
  COMPANIES: 'COMPANIES',
  LOYALTY_SHOPS: 'LOYALTY_SHOPS',
};

export const IMPORT_PRODUCTS_NAME = {
  LOYALTY_PROGRAM: 'LOYALTY_PROGRAM_SERVICE',
  MARKETING: 'MARKETING_SERVICE',
  OPERATIONS: 'OPERATIONS_SERVICE',
  ORG_ADMIN: 'ORG_ADMIN_SERVICE',
  SALES: 'SALES_SERVICE',
  AIR_SERVICES: 'AIR_SERVICES_SERVICE',
  CRON: 'CRON_SERVICE',
  SUPER_ADMIN: 'SUPER_ADMIN_SERVICE',
  COMMON_FEATURE: 'COMMON_FEATURE_SERVICE',
  USER: 'USER_SERVICE',
};

export const IMPORT_FILE_TYPE = {
  CSV: 'CSV',
};

export const FEEDBACK_SURVEY_QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multipleChoice',
  CHECK_BOXES: 'checkboxes',
  SHORT_ANSWERS: 'shortAnswers',
  LINEAR_SCALE: 'linearScale',
  TEXT: 'text',
};

export const FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE = {
  EXCELLENT: 'Excellent',
  VERY_GOOD: 'Very Good',
  GOOD: 'Good',
  SATISFIED: 'Satisfied',
  UN_SATISFIED: 'Unsatisfied',
};

export const ARRAY_INDEX = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export const PRODUCT_USER_STATUS = {
  active: 'active',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const GENERIC_UPSERT_FORM_CONSTANT = {
  EDIT: 'Edit',
  SUBMIT: 'Submit',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  BACK: 'Back',
  VIEW: 'View',
  ADD: 'Add',
  NEW: 'New',
  UPDATE: 'Update',
  APPLY: 'Apply',
  CREATE: 'Create',
  USE: 'Use',
  WRITE: 'Write',
  SAVE_AS_DRAFT: 'Save as Draft',
  SEND_FOR_APPROVAL: 'Send For Approval',
  PUBLISH_NOW: 'Publish Now',
  IMPORT: 'Import',
  NEXT: 'Next',
  DRAFT: 'DRAFT',
};

export const TEXT_FORMATE: any = {
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  UNDERLINE: 'UNDERLINE',
  UPPER_CASE: 'UPPER_CASE',
  LOWER_CASE: 'LOWER_CASE',
  CAPITAL_CASE: 'CAPITAL_CASE',
  UNORDERED_LIST: 'UNORDERED_LIST',
  ORDERED_LIST: 'ORDERED_LIST',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  CHANGE_INLINE_STYLE: 'change-inline-style',
};

export const CHARTS: any = {
  BAR_CHART: 'BAR_CHART',
  HORIZONTAL_BAR_CHART: 'HORIZONTAL_BAR_CHART',
  DONUT_CHART: 'DONUT_CHART',
  PIE_CHART: 'PIE_CHART',
  TEMPLATE_BAR_CHART: 'TEMPLATE_BAR_CHART',
  TEMPLATE_HORIZONTAL_CHART: 'TEMPLATE_HORIZONTAL_CHART',
  TEMPLATE_PIE_CHART: 'TEMPLATE_PIE_CHART',
  TEMPLATE_DONUT_CHART: 'TEMPLATE_DONUT_CHART',
};

export const SELECTED_ARRAY_LENGTH = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
};

export const SCREENS: any = {
  MOBILE: 'mobile',
  LAPTOP: 'laptop',
};

export const TIME_TO_RESTORE_DELETED_RECORD = {
  REPORT_RESTORE_IN_DAYS: 90,
};

export const REPORT_TYPE = {
  TABLE: 'TABLE',
  TEXT: 'TEXT_FIELD',
  EVERYONE: 'EVERYONE',
  PRIVATE: 'PRIVATE',
  SPECIFIC_USERS: 'SPECIFIC_USERS',
  VIEW_AND_EDIT: 'VIEW_AND_EDIT',
  VIEW_ONLY: 'VIEW_ONLY',
  ADD_TO_EXISTING: 'ADD_TO_EXISTING_DASHBOARD',
  ADD_TO_NEW: 'ADD_TO_NEW_DASHBOARD',
  DO_NOT_ADD: 'DO_NOT_ADD_TO_DASHBOARD',
  ALL: 'All',
  INVENTORIES: 'INVENTORY',
  TICKETS: 'TICKETS',
  SOFTWARE: 'SOFTWARE',
  CONTRACTS: 'CONTRACT',
  PURCHASE_ORDER: 'PURCHASE_ORDER',
  DEALS: 'DEALS',
  FORECAST: 'FORECAST',
  NO_OF_RECORDS: 'NO_OF_RECORDS',
  TEMPLATE_TABLE: 'TEMPLATE_TABLE',
  TEMPLATE_TEXT: 'TEMPLATE_TEXT',
  LEADS: 'LEADS',
  CAMPAIGNS: 'CAMPAIGN',
  CHART: 'chart',
  COUNTER: 'counter',
};

export const ADD_TO = {
  ADD_TO_NEW_CONDITION_ONE: 'addToNewConditionOne',
  ADD_TO_NEW_CONDITION_TWO: 'addToNewConditionTwo',
  ADD_TO_DASHBOARD: 'addToDashboard',
  SHARED_WITH: 'sharedWith',
  SPECIFIC_USERS_CONDITION_ONE: 'specificUsersConditionOne',
  NEW_DASHBOARD_SPECIFIC_USERS_CONDITION_ONE:
    'newDashboardSpecificUsersConditionOne',
  NEW_DASHBOARD_EVERYONE_CONDITION: 'newDashboardEveryoneCondition',
  ADD_TO_EXISTING_CONDITION: 'addToExistingCondition',
  SHARED_WITH_PERMISSIONS: 'sharedWithPermissions',
  NEW_DASHBOARD_PERMISSIONS: 'newDashboardPermissions',
};

export const FIELD_TYPE = {
  STATIC: 'STATIC',
  OBJECT_ID: 'OBJECT_ID',
  STRING: 'STRING',
};

export const COLLECTION_NAME = {
  ASSET_TYPES: 'assettypes',
  LOCATION: 'locations',
  DEPARTMENT: 'departments',
  VENDORS: 'vendors',
  USERS: 'users',
  SERVICE_CATEGORIES: 'servicecategories',
  DEAL_PIPELINES: 'dealpipelines',
  SALES_PIPELINES: 'salespipeline',
  CONTRACT_TYPE: 'contracttypes',
  EVERYONE: 'everyone',
  SPECIFIC_USERS: 'specificUsers',
  ADD_TO_EXISTING: 'addToExisting',
  ADD_TO_NEW: 'addToNew',
  ALL: 'All',
  INVENTORIES: 'Inventory',
  TICKETS: 'Tickets',
  SOFTWARE: 'Software',
  CONTRACTS: 'Contract',
  PURCHASE_ORDER: 'Purchase Order',
  DEALS: 'Deals',
  FORECAST: 'Forecast',
};

export const MODAL_INITIAL_STATES: any = {
  chart: false,
  text: false,
  table: false,
  counter: false,
};

export const USER_MANAGEMENT_DRAWER_ACTION = {
  CREATE_TEAM: 'Create Team',
  EDIT_TEAM: 'Edit Team',
  VIEW_USER: 'View User',
  ADD_USER: 'Add User',
  ADD: 'Add',
  EDIT: 'Edit',
};

export const STATUS_CONTANTS = {
  COMPLETED: 'Completed',
  DRAFT: 'Draft',
  SCHEDULED: 'Scheduled',
};

export const NOTIFICATIONS_TYPES = {
  MEETING_EMAIL_REMINDER: 'meetingEmailReminder',
  MEETING_SMS_REMINDER: 'meetingSMSReminder',
  MEETING_EMAIL: 'meetingEmail',
};

export const FEEDBACK_SURVEY_TYPES = {
  CUSTOMER_SATISFACTION: 'customerSatisfaction',
  CUSTOMER_SUPPORT: 'customerSupport',
};

export const TIME_ENTRIES_TICKETS_TIMES = {
  INITIAL_SECOND: 0,
  INITIAL_MINUTE: 0,
  INITIAL_HOUR: 0,
  PREVIOUS_SECOND: 59,
  PREVIOUS_MINUTE: 59,
};

export const ATTACHMENT_FILE_TYPE = {
  PDF: 'pdf',
  XLS: 'xls',
  DOC: 'doc',
  DOCX: 'docx',
  CSV: 'csv',
};

export const DATA_TYPE = {
  object: 'object',
};

export const FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE = {
  STRONGLY_AGREE: 'Strongly Agree 😇',
  AGREE: 'Agree 😊',
  NEUTRAL: 'Neutral 😐',
  DISAGREE: 'Disagree 😑',
  STRONGLY_DISAGREE: 'Strongly Disagree 😠',
};

export const PERCENTAGES_VALUES = {
  ZERO: 0,
  TWENTY: 20,
  FORTY: 40,
  SIXTY: 60,
  EIGHTY: 80,
};

export const GENERIC_REPORT_MODULES = {
  SERVICES: 'SERVICES',
  SALES: 'SALES',
  MARKETING: 'MARKETING',
};
export const CUSTOMER_SURVEY_TICKET_STATUS_BASED = {
  AFTER_TICKET_CLOSED: 'afterTicketClosed',
  AFTER_TICKET_RESOLVED: 'afterTicketResolved',
};

export const MANAGE_ACCESS_TYPES = {
  EVERYONE: 'everyone',
  SPECIAL: 'special',
  PRIVATE: 'private',
  VIEW: 'view',
  VIEW_AND_EDIT: 'edit_&_view',
  EVERYONE_CAPITAL: 'EVERYONE',
  PRIVATE_CAPITAL: 'PRIVATE',
  SPECIFIC_USERS: 'SPECIFIC_USERS',
  VIEW_ONLY_CAPITAL: 'VIEW_ONLY',
  VIEW_AND_EDIT_CAPITAL: 'VIEW_AND_EDIT',
  SPECIAL_CAPITAL: 'SPECIAL',
};

export const REPORT_TYPES = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
};

export const FEEDBACK_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
};

export const FEEDBACK_SURVEY_PATH_TYPES = {
  CUSTOMER_SATISFACTION: 'customer-satisfaction',
  CUSTOMER_SUPPORT: 'customer-support',
};

export const FEEDBACK_SURVEY_LINK_TYPES = {
  TO_ALL_AGENTS: 'toAllAgents',
  AFTER_TICKET_CLOSE: 'afterTicketClosed',
  AFTER_TICKET_RESOLVED: 'afterTicketResolved',
};

export const PLAN_STATUS = {
  YES: 'Yes',
  NO: 'No',
};

export const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ROUTER_CONSTANTS: any = {
  ONE_TO_ONE: 'one-to-one',
  ONE_TO_ONE_MEETING: 'ONE_TO_ONE',
  GROUP: 'group',
  GROUP_MEETING: 'GROUP',
  COLLECTIVE: 'collective',
  COLLECTIVE_MEETING: 'COLLECTIVE',
};
export const DOWNLOAD_FILE_TYPE = {
  PDF: 'PDF',
  PNG: 'PNG',
};
export const WEEK_NUMBERS = [1, 2, 3, 4, 5, 6, 7];
export const WEEK_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKS = [
  '1st Week',
  '2nd Week',
  '3rd Week',
  '4th Week',
  '5th Week',
  '6th Week',
];
export const DYNAMIC_REPORTS_TYPES = {
  CUSTOM: 'CUSTOM',
  DASHBOARD: 'DASHBOARD',
};

export const SETTINGS_CONSTANTS = {
  EMAIL: 'Email',
  COMPANIES: 'Companies',
};
export const MUI_GRID_LENGTH = {
  TWELVE: 12,
  SIX: 6,
};

export const ANNOUNCEMENTS_VISIBILITY = {
  EVERYONE: 'EVERYONE',
  ALL_AGENT: 'AllAGENT',
  SPECIFIC_USERS: 'SPECIFIC_USERS',
};

export const PURCHASE_ORDER_REPORT_STATUS: any = {
  ALL: 'All Purchase Order',
  RECEIVED: 'Received',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
};
export const INVENTORY_REPORT_STATUS = {
  ALL: 'All Assets',
  HARDWARE: 'Hardware',
  CONTRACTS: 'Contracts',
  SOFTWARE: 'Backup Software',
  PURCHASE_ORDER: 'Purchase Orders',
};
export const PORTAL_TICKET_FIELDS = {
  REQUESTER: 'requester',
  SUBJECT: 'subject',
};

export const FULL_NAME_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const NUMBER_OF_DAYS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];

export const EMAIL_SUBJECT = {
  LEAD_CAPTURE_FORM: 'Lead Capture Form',
};

export const SERVICE_CATALOG_STATUSES = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
};
