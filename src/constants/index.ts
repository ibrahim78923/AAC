export const DATE_FORMAT = {
  UI: 'MM/DD/YYYY',
  API: 'YYYY-MM-DD',
};

export const SUPER_ADMIN: any = {
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
  TICKETS: `/air-services/tickets`,
  TICKETS_LIST: `/air-services/tickets/detail`,
  PURCHASE_ORDER: '/air-services/assets/purchase-orders',
  ASSETS_PURCHASE_ORDER_DETAIL: '/air-services/assets/purchase-orders/detail',
  NEW_PURCHASE_ORDER: '/air-services/assets/purchase-orders/new-purchase',
  CREATE_DASHBOARD: '/air-services/dashboard/create-dashboard',
  MANAGE_DASHBOARD: '/air-services/dashboard/manage-dashboard',
  KNOWLEDGE_BASE: '/air-services/knowledge-base',
  KNOWLEDGE_BASE_VIEW_ARTICLE:
    '/air-services/knowledge-base/article/view-article',
  KNOWLEDGE_BASE_EDIT_ARTICLE:
    '/air-services/knowledge-base/article/edit-article',
  ADD_ASSOCIATE_ASSET:
    '/air-services/assets/contracts/detail/add-associate-asset',
  ASSETS_CONTRACTS: '/air-services/assets/contracts',
  ASSETS_CONTRACTS_DETAIL: '/air-services/assets/contracts/detail',
  CONTRACT_FORM: `/air-services/assets/contracts/contract-form`,
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
  USER_ROLES_SETTINGS: `/air-services/settings/user-management/roles`,
  VENDOR_DETAIL: '/air-services/settings/asset-management/vendor/details',
  PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog`,
  UPSERT_PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog/upsert-product`,
  SINGLE_PRODUCT_CATALOG: `/air-services/settings/asset-management/product-catalog/details`,
  AGENT_PERFORMANCE_MANAGEMENT_SETTINGS: `/air-services/settings/agent-performance-management`,
  CANNED_RESPONSE_SETTINGS: `/air-services/settings/agent-performance-management/canned-responses`,
  LEADER_BOARD_SETTINGS: `/air-services/settings/agent-performance-management/leader-board`,
  WORKLOAD_MANAGEMENT_SETTINGS: `/air-services/settings/agent-performance-management/workload-management`,
  USER_ADD_NEW_ROLES_SETTINGS: `/air-services/settings/user-management/roles/add-role`,
};

export const AIR_CUSTOMER_PORTAL = {
  TICKETS: `/air-customer-portal/tickets`,
  SINGLE_TICKETS: `/air-customer-portal/tickets/single-ticket`,
  KNOWLEDGE_BASE: '/air-customer-portal/knowledge-base',
  KNOWLEDGE_BASE_DETAIL:
    '/air-customer-portal/knowledge-base/knowledge-base-detail',
  AIR_CUSTOMER_PORTAL_LOGIN: '/air-customer-portal/log-in',
  AIR_CUSTOMER_PORTAL_SIGN_UP: '/air-customer-portal/sign-up',
  AIR_CUSTOMER_PORTAL_CREATE_PASSWORD: '/air-customer-portal/create-password',
  AIR_CUSTOMER_PORTAL_FORGET: '/air-customer-portal/forget-password',
  SINGLE_CATALOG_SERVICE_DETAILS: `/air-customer-portal/catalog/detail`,
  CATALOG_SERVICES: '/air-customer-portal/catalog',
};

export const ORG_ADMIN: any = {
  ROLES_AND_RIGHTS: '/org-admin/roles-and-rights',
  ADD_ROLE: '/org-admin/roles-and-rights/add-role',
};
