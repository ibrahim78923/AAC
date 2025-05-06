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

export const TICKET_TYPE = {
  INC: 'INC',
  SR: 'SR',
  EQ: 'EQ',
};

export const expande_status = {
  List_View: 'List View',
  Broad_List: 'Board List',
  Create_Deal: 'Create Deal',
  Import_Deals: 'Import Deals',
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

export const VIEW_TYPES = {
  TABLE: 'table',
  BOARD: 'board',
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
  PAYMENT_PENDING: 'PAYMENT_PENDING',
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

export const TASK_STATUS = {
  TO_DO: 'Todo',
  IN_PROGRESS: 'In-Progress',
  DONE: 'Done',
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
  AIR_SALES = 'AIR_SALES',
  AIR_SERVICES = 'AIR_SERVICES',
  AIR_OPERATIONS = 'AIR_OPERATIONS',
}

export const TICKETS_STATE = {
  NEW: 'New',
  RESPONSE_DUE: 'Response due',
  OVERDUE: 'Overdue',
  PENDING: 'PENDING',
  OVERDUES: 'OVERDUE',
  PAID: 'PAID',
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
  REGISTER_DASHBOARD: 'REGISTER_DASHBOARD',
  NON_REGISTER_DASHBOARD: 'NON_REGISTER_DASHBOARD',
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

export const WORKFLOW_CONDITION_TYPE = {
  AND: 'AND',
  OR: 'OR',
};

export const IMPORT_ACTION_TYPE = {
  INVENTORIES: 'inventories',
  PRODUCT_CATALOG: 'productCatalog',
  VENDORS: 'vendors',
  DEALS: 'deals',
  TASKS: 'tasks',
  PRODUCT: 'product',
  SALES: 'Sales',
  SERVICES: 'Services',
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

export const OPERATORS = {
  LESS_THEN: 'LESS_THEN',
  GREATER_THAN: 'GREATER_THAN',
  EQUAL_TO: 'EQUAL_TO',
  LESS_THEN_OR_EQUAL_TO: 'LESS_THEN_OR_EQUAL_TO',
  GREATER_THEN_AND_EQUAL_TO: 'GREATER_THEN_AND_EQUAL_TO',
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
  Add: 'Add',
  VIEW: 'View',
};

export const LOGICS = {
  AND: 'AND',
  OR: 'OR',
};

export const FIELD_TYPES = {
  MANDATORY_FIELD: 'Mandatory Field',
  OPTIONAL_FIELD: 'Optional Field',
};

export const TIME_UNITS = {
  MS: 1000,
  SEC_PER_HOUR: 3600,
  HOURS_PER_DAY: 24,
  MS_PER_MINUTE: 60000,
  SEC_PER_MINUTE: 60,
};

export const DATA_TYPES = {
  NULL: null,
  UNDEFINED: undefined,
  OBJECT: 'object',
  STRING: 'string',
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
  DEALS: 'DEALS',
  TASKS: 'TASKS',
};

export const IMPORT_PRODUCTS_NAME = {
  LOYALTY_PROGRAM: 'LOYALTY_PROGRAM',
  MARKETING: 'MARKETING',
  OPERATIONS: 'OPERATIONS',
  ORG_ADMIN: 'ORG_ADMIN_SERVICE',
  SALES: 'SALES',
  AIR_SERVICES: 'SERVICES',
  CRON: 'CRON_SERVICE',
  SUPER_ADMIN: 'SUPER_ADMIN_SERVICE',
  COMMON_FEATURE: 'COMMON_FEATURE_SERVICE',
  USER: 'USER_SERVICE',
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
  TEN: 10,
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
  ALL: 'All',
  INVENTORIES: 'INVENTORY',
  TICKETS: 'TICKETS',
  SOFTWARE: 'SOFTWARE',
  CONTRACTS: 'CONTRACT',
  PURCHASE_ORDER: 'PURCHASE_ORDER',
  DEALS: 'DEALS',
  FORECAST: 'FORECAST',
  TEMPLATE_TABLE: 'TEMPLATE_TABLE',
  TEMPLATE_TEXT: 'TEMPLATE_TEXT',
  LEADS: 'LEADS',
  CAMPAIGNS: 'CAMPAIGN',
  CHART: 'CHART',
  COUNTER: 'COUNTER',
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

export const SALES_WORKFLOW_TYPES = {
  DEALS: 'DEALS',
  QUOTES: 'QUOTES',
  SALES_TASKS: 'SALES_TASKS',
};

export const WORKFLOW_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const AVTIVITY_LOGS_ROLE = {
  ORG_AMDIN: 'Org Admin',
  SUPER_AMDIN: 'Super Admin',
};

export const STATUS = {
  DONE: 'Done',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
};
