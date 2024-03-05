export const DATE_FORMAT = {
  UI: 'MM/DD/YYYY',
  API: 'YYYY-MM-DD',
};

export const DATE_MONTH_FORMAT = {
  API: 'MMM DD',
};

export const TIME_FORMAT = {
  UI: 'h:mm A',
  API: 'h:mm A',
  TIME_VALIDATION: 'hh:mm:ss',
};

export const CALENDAR_FORMAT = {
  UI: 'D MMMM YYYY',
  API: 'YYYY MMMM D',
};

export const DATE_TIME_FORMAT = {
  UI: 'dddd, MMMM D, YYYY - HH:mm',
  DMYhmma: 'D MMMM, YYYY - h:mm A',
  DMDMHA: 'ddd, D MMM h:mm A',
  MMMDDYYYY: 'MMM DD, YYYY',
  DDMYHMA: 'ddd, D MMM, YYYY h:mm A',
  DMY: 'DDMMMYYYY',
  DMYHMSA: 'ddd MM, YYYY hh:mm:ss A',
  D: 'D',
  DDDDDD: 'ddd - DD',
  DDMMYYYY: 'DD MMM, YYYY hh:MM A',
};

export const VALIDATION_CONSTANT = {
  PHONE_NUMBER: {
    regex: /^\+44[0-9]{10}$/,
    message: 'Only UK phone number',
  },
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
  TICKETS: `/air-services/tickets`,
  TICKETS_LIST: `/air-services/tickets/detail`,
  CHILD_TICKETS_DETAIL: `/air-services/tickets/child-detail`,
  PURCHASE_ORDER: '/air-services/assets/purchase-orders',
  ASSETS_PURCHASE_ORDER_DETAIL: '/air-services/assets/purchase-orders/detail',
  NEW_PURCHASE_ORDER: '/air-services/assets/purchase-orders/new-purchase',
  CREATE_DASHBOARD: '/air-services/dashboard/create-dashboard',
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
  ADD_NEW_LOCATION: `/air-services/settings/asset-management/location/add-new-location`,
  UPSERT_INVENTORY: `/air-services/assets/inventory/upsert-inventory`,
  UPSERT_SERVICE:
    '/air-services/settings/service-management/services-catalog/upsert-service',
  SERVICE_CATALOG: '/air-services/settings/service-management/services-catalog',
  UPSERT_SOFTWARE_CONTRACT: `/air-services/assets/software/detail/create-contract`,
  UPSERT_WORKFLOW_MANAGEMENT:
    '/air-services/settings/agent-performance-management/workload-management/upsert-workflow-management',
};

export const AIR_CUSTOMER_PORTAL = {
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
};

export const ORG_ADMIN: any = {
  DASHBOARD: '/org-admin',
  ROLES_AND_RIGHTS: '/org-admin/roles-and-rights',
  ADD_ROLE: '/org-admin/roles-and-rights/add-role',
};

export const AIR_OPERATIONS = {
  WORKFLOW_AUTOMATION: `/air-operations/workflow-automation`,
  SALES_WORKFLOW: `/air-operations/workflow-automation/sales-workflow`,
  UPSERT_SALES_WORKFLOW: `/air-operations/workflow-automation/sales-workflow/upsert-sales-workflow`,
  SERVICES_WORKFLOW: `/air-operations/workflow-automation/services-workflow`,
  MARKETING_WORKFLOW: `/air-operations/workflow-automation/marketing-workflow`,
  ROLES_AND_RIGHTS: `/air-operations/role-and-right`,
  UPSERT_MARKETING_WORKFLOW: `/air-operations/workflow-automation/marketing-workflow/upsert-marketing-workflow`,
  UPSERT_SCHEDULE_WORKFLOW: `/air-operations/workflow-automation/services-workflow/upsert-schedule-workflow`,
  UPSERT_EVENT_BASED_WORKFLOW: `/air-operations/workflow-automation/services-workflow/upsert-event-based-workflow`,
  UPSERT_SUPERVISOR_RULES: `/air-operations/workflow-automation/services-workflow/upsert-supervisor-rules`,
};

export const AIR_LOYALTY_PROGRAM = {
  REWARDS: `/air-loyalty-program/loyalty/rewards`,
  ADD_REWARDS: `/air-loyalty-program/loyalty/rewards/add-rewards`,
  GIFT_CARDS: `/air-loyalty-program/gift-cards/gift-cards`,
  SINGLE_GIFT_CARD_TRANSACTION_DETAIL: `/air-loyalty-program/gift-cards/gift-cards/transaction-details`,
  DIGITAL_REWARDS_DETAIL: `/air-loyalty-program/loyalty/rewards/digital/single-digital-detail`,
  PHYSICAL_REWARDS_DETAIL: `/air-loyalty-program/loyalty/rewards/physical/single-physical-detail`,
  VOUCHERS: `/air-loyalty-program/loyalty/vouchers`,
  VOUCHER_REDEMPTION_LIST: `/air-loyalty-program/loyalty/vouchers/voucher-redemptions-list`,
  PHYSICAL_GIFT_CARD_DESIGN: `/air-loyalty-program/gift-cards/gift-cards/physical-card-design`,
  EDIT_PHYSICAL_GIFT_CARD_DESIGN: `/air-loyalty-program/gift-cards/gift-cards/physical-card-design/edit`,
};

export const SOCIAL_COMPONENTS = {
  COMPANIES: `/social-components/companies`,
  VIEW_COMPANY_DETAILS: '/social-components/companies/view-details',
};

export const AUTH = {
  FORGOT_PASSWORD: `/forget-password`,
  LOGIN: `/login`,
};
