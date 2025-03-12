export const TICKET_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESOLVED: 'RESOLVED',
  PENDING: 'PENDING',
  SPAM: 'SPAMS',
  SHARE_WITH_ME: 'SHARE_WITH_ME',
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

export const TICKET_SOURCE = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  PORTAL: 'PORTAL',
  CHAT: 'CHAT',
};

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
  RENEW: 'renew',
  EXTEND: 'extend',
};

export const LICENSE_TYPE = {
  VOLUME: 'VOLUME',
  ENTERPRISE: 'ENTERPRISE',
  TRIAL: 'TRAIL',
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

export const CONTRACT_REPORT_STATUS = {
  ALL: 'All',
  LEASE: 'Lease',
  MAINTENANCE: 'Maintenance',
  SOFTWARE: 'Software',
  WARRANTY: 'Warranty',
};

export const SOFTWARE_TYPE = {
  DESKTOP: 'Desktop',
  SAAS: 'Saas',
  MOBILE: 'Mobile',
};

export const EXPENSE_TYPE = {
  PURCHASE: 'Purchase Cost',
  MAINTENANCE: 'Maintenance Cost',
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

export const TICKET_SELECTION_TYPE = {
  REQUESTER: 'REQUESTER',
  SUBJECT: 'SUBJECT',
  ID: 'ID',
};

export const TICKET_GRAPH_TYPES = {
  STATUS: 'status',
  PRIORITY: 'pirority',
};

export const AGENT_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  PROFESSIONAL: 'professional',
  EXPERT: 'expert',
  MASTER: 'master',
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

export const SERVICE_CATALOG_STATUSES = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
};

export const TIME_ENTRIES_TICKETS_TIMES = {
  INITIAL_SECOND: 0,
  INITIAL_MINUTE: 0,
  INITIAL_HOUR: 0,
  PREVIOUS_SECOND: 59,
  PREVIOUS_MINUTE: 59,
};

export const TICKET_CONVERSATIONS_CONTENT_TYPE = {
  LINK: 'LINK',
  CONTENT: 'CONTENT',
};

export const TICKET_CONVERSATIONS_TYPE = {
  REPLY: 'REPLY',
  FORWARD: 'FORWARD',
  NOTE: 'NOTE',
  DISCUSS: 'DISCUSS',
};

export const ARTICLE_STATUS = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
};

export const FEEDBACK_SURVEY_TYPES = {
  CUSTOMER_SATISFACTION: 'customerSatisfaction',
  CUSTOMER_SUPPORT: 'customerSupport',
};

export const FEEDBACK_SURVEY_QUESTION_LINEAR_SCALE = {
  STRONGLY_AGREE: 'Strongly Agree 😇',
  AGREE: 'Agree 😊',
  NEUTRAL: 'Neutral 😐',
  DISAGREE: 'Disagree 😑',
  STRONGLY_DISAGREE: 'Strongly Disagree 😠',
};

export const CUSTOMER_SURVEY_TICKET_STATUS_BASED = {
  AFTER_TICKET_CLOSED: 'afterTicketClosed',
  AFTER_TICKET_RESOLVED: 'afterTicketResolved',
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
