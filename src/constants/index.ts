export const SUPER_ADMIN: any = {
  USERMANAGMENT: '/super-admin/user-management',
  ADDROLE: '/super-admin/user-management/add-role',
  USERS_LIST: '/super-admin/user-management/users-list',
  BILLING_INVOICES: '/super-admin/billing-invoices',
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
};

export const AIR_CUSTOMER_PORTAL = {
  TICKETS: `/air-customer-portal/tickets`,
  SINGLE_TICKETS: `/air-customer-portal/tickets/single-ticket`,
  KNOWLEDGE_BASE: '/air-customer-portal/knowledge-base',
  KNOWLEDGE_BASE_DETAIL:
    '/air-customer-portal/knowledge-base/knowledge-base-detail',
};

export const ORG_ADMIN: any = {
  ROLES_AND_RIGHTS: '/org-admin/roles-and-rights',
  ADD_ROLE: '/org-admin/roles-and-rights/add-role',
};
