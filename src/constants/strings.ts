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
  SPAM: 'SPAM',
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

export const TICKET_APPROVALS = {
  RECEIVED: 'RECIEVED',
  REQUESTED: 'REQUESTED',
  APPROVE: 'APPROVED',
  REJECT: 'REJECTED',
  CANCEL: 'CANCELED',
  PENDING: 'PENDING',
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
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TICKET_TYPE = {
  INC: 'INC',
  SR: 'SR',
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
};

export const SOFTWARE_TYPE = {
  DESKTOP: 'Desktop',
  SASS: 'Sass',
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
  MAINTENANCE: 'maintenance cost',
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
  PENDING: 'Pending',
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

export const CANNED_RESPONSES = {
  AVAILABLE_FOR: 'availableFor',
  DELETE: 'delete',
  EDIT: 'edit',
  MOVE: 'move',
  SELECT_AGENTS: 'selectAgents',
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
  CLONE: 'clone',
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
};
export const TASK_STATUS = {
  TO_DO: 'Todo',
  IN_PROGRESS: 'In-Progress',
  DONE: 'Done',
};

export enum ROLES {
  ORG_REQUESTER = 'ORG_REQUESTER',
  ORG_AGENT = 'ORG_AGENT',
}

export const TICKETS_STATE = {
  NEW: 'New',
  RESPONSE_DUE: 'Response due',
  OVERDUE: 'Overdue',
};
export const ROLE = {
  ORG_REQUESTER: 'ORG_REQUESTER',
  ORG_AGENT: 'ORG_AGENT',
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
