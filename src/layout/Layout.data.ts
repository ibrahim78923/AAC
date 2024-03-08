import {
  AddNewRoleSettingImage,
  AssetsImage,
  AvailableImage,
  AwayImage,
  BillingInvoiceImage,
  BreakImage,
  BuildingImage,
  BusyImage,
  CallImage,
  CampaignImage,
  CompaniesImage,
  ContactImage,
  CustomerPortalImage,
  DashboardImage,
  DataManagementImage,
  DocumentImage,
  EmailMarketingImage,
  ForecastImage,
  GiftCardImage,
  // IntegrationsImage,
  KnowledgeBaseImage,
  LeadCaptureImage,
  LoyaltyImage,
  MailImage,
  MeetingImage,
  MeetingTopImage,
  MessageImage,
  PaidAdsImage,
  PlanManagementImage,
  // PrepaidImage,
  ProfileUserImage,
  ProfileUserManagementImage,
  QuotesImage,
  ReportsImage,
  SettingImage,
  SettingQuickImage,
  SmsMarketingImage,
  SocialMarketingImage,
  TicketDiscountImage,
  UserManagementImage,
  WorkFlowAutomationImage,
  WorkLoadImage,
} from '@/assets/images';
import { Permissions } from '@/constants/permissions';
import {
  AIR_MARKETER,
  AIR_OPERATION,
  LOYALTY_PROGRAM,
  AIR_SOCIAL,
} from '@/routesConstants/paths';

type MenuItemI = {
  key: React.Key;
  icon?: any;
  label: React.ReactNode;
  role: string;
  permissions?: string[];
};

export const SuperAdminRoutes: MenuItemI[] = [
  {
    key: '/super-admin',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'super-admin',
    permissions: Permissions?.view_dashoard,
  },
  {
    key: '/super-admin/user-management',
    icon: UserManagementImage,
    label: 'User Management',
    role: 'super-admin',
    permissions: Permissions?.user_management,
  },
  {
    key: '/super-admin/plan-management',
    icon: PlanManagementImage,
    label: 'Plan Management',
    role: 'super-admin',
    permissions: Permissions?.PLAN_MANAGEMENT,
  },
  {
    key: '/super-admin/billing-invoices',
    icon: BillingInvoiceImage,
    label: 'Billing & Invoices',
    role: 'super-admin',
    permissions: [],
  },
  {
    key: '/super-admin/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'super-admin',
    permissions: [],
  },
];

export const OrgAdminRoutes: MenuItemI[] = [
  {
    key: '/org-admin/dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_DASHBOARD,
  },
  {
    key: '/org-admin/users',
    icon: UserManagementImage,
    label: 'Users',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_USER,
  },
  {
    key: '/org-admin/organization-admin',
    icon: QuotesImage,
    label: 'Organization',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_ORGANIZATION,
  },
  {
    key: '/org-admin/subscription-and-invoices',
    icon: BillingInvoiceImage,
    label: 'Subsciption & Invoices',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_SUBSCRIPTION_AND_INVOICE,
  },
  {
    key: '/org-admin/properties',
    icon: ReportsImage,
    label: 'Properties',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_USER,
  },
  {
    key: '/org-admin/roles-and-rights',
    icon: ForecastImage,
    label: 'Role and Rights',
    role: 'org-admin',
    permissions: Permissions?.ORG_ADMIN_USER,
  },
];

export const ServicesRoutes: any = [
  {
    key: '/air-services',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_VIEW_DASHBOARD,
  },
  {
    key: '/air-services/tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_TICKETS,
  },
  {
    key: '/air-services/assets/inventory',
    label: 'Assets',
    icon: AssetsImage,
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_ASSETS,
    textNames: [
      {
        key: '/air-services/assets/inventory',
        label: 'Inventory',
        permissions: Permissions?.AIR_SERVICES_ASSETS_INVENTORY,
      },
      {
        key: '/air-services/assets/software',
        label: 'Software',
        permissions: Permissions?.AIR_SERVICES_ASSETS_SOFTWARE,
      },
      {
        key: '/air-services/assets/contracts',
        label: 'Contracts',
        permissions: Permissions?.AIR_SERVICES_ASSETS_CONTRACTS_LIST_VIEW,
      },
      {
        key: '/air-services/assets/purchase-orders',
        label: 'Purchase Orders',
        permissions: Permissions?.AIR_SERVICES_ASSETS_PURCHASE_ORDER_LIST_VIEW,
      },
    ],
  },

  {
    key: '/air-services/knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE,
  },
  {
    key: '/air-services/workload',
    icon: WorkLoadImage,
    label: 'WorkLoad',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_WORKLOAD_CALENDER_VIEW,
  },
  {
    key: '/air-customer-portal',
    icon: CustomerPortalImage,
    label: 'Customer Portal',
    role: 'SERVICE',
    permissions: Permissions?.AIR_CUSTOMER_PORTAL,
  },
];

export const LoyaltyProgramsRoutes: any = [
  {
    key: LOYALTY_PROGRAM?.root,
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'Loyalty-Program',
    permissions: [],
  },

  {
    key: LOYALTY_PROGRAM?.LOYALTY_REWARD,
    label: 'Loyalty',
    icon: LoyaltyImage,
    role: 'Loyalty-Program',
    permissions: [],
    textNames: [
      {
        key: LOYALTY_PROGRAM?.LOYALTY_REWARD,
        label: 'Rewards',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_TRANSACTIONS,
        label: 'Transactions',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_RULES_TIERS,
        label: 'Rules & Tiers',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_RULES_VOUCHERS,
        label: 'Vouchers',
        permissions: [],
      },
    ],
  },
  {
    key: LOYALTY_PROGRAM?.GIFT_CARDS,
    label: 'Gift Cards',
    icon: GiftCardImage,
    role: 'Loyalty-Program',
    permissions: [],
    textNames: [
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS,
        label: 'Gift Cards',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS_TRANSACTIONS,
        label: 'Transactions',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS_SETTLEMENTS,
        label: 'Settlements',
        permissions: [],
      },
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS_SETTLED,
        label: 'Settled',
        permissions: [],
      },
    ],
  },
  // {
  //   key: LOYALTY_PROGRAM?.PREPARED_FUNDS_TRANSACTIONS,
  //   label: 'Prepaid',
  //   icon: PrepaidImage,
  //   role: 'Loyalty-Program',
  //   permissions: [],
  //   textNames: [
  //     {
  //       key: LOYALTY_PROGRAM?.PREPARED_FUNDS_TRANSACTIONS,
  //       label: 'Funds & Transactions',
  //       permissions: [],
  //     },
  //   ],
  // },
];

export const AirMarketingRoutes: any = [
  {
    key: AIR_MARKETER?.root,
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_MARKETER',
    permissions: Permissions.AIR_MARKETER_DASHBAORD_PERMISSIONS,
  },
  {
    key: AIR_MARKETER?.PAID_ADS,
    icon: PaidAdsImage,
    label: 'Paid Ads',
    role: 'AIR_MARKETER',
    permissions: [],
  },
  {
    key: AIR_MARKETER?.CAMPAIGNS,
    icon: CampaignImage,
    label: 'Campaign',
    role: 'AIR_MARKETER',
    permissions: Permissions.AIR_MARKETER_CAMPAIGNS_PERMISSIONS,
  },
  {
    key: AIR_MARKETER?.EMAIL_MARKETING,
    label: 'Email Marketing',
    icon: EmailMarketingImage,
    role: 'AIR_MARKETER',
    permissions:
      Permissions?.AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS,
    textNames: [
      {
        key: AIR_MARKETER?.EMAIL_TEMPLATES,
        label: 'Email Templates',
        permissions:
          Permissions?.AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS,
      },
      {
        key: AIR_MARKETER?.EMAIL_FOLDER,
        label: 'Email Folder',
        permissions:
          Permissions?.AIR_MARKETER_EMAIL_MARKETING_EMAIL_FOLDERS_PERMISSIONS,
      },
      {
        key: AIR_MARKETER?.EMAIL_REPORTS,
        label: 'Email Reports',
        permissions:
          Permissions?.AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS,
      },
    ],
  },

  {
    key: AIR_MARKETER?.SOCIAL_MARKETING,
    label: 'Social Marketing',
    icon: SocialMarketingImage,
    role: 'AIR_MARKETER',
    permissions:
      Permissions?.AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS,
    textNames: [
      {
        key: AIR_MARKETER?.SOCIAL_INBOX,
        label: 'SociaL Inbox',
        permissions:
          Permissions?.AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS,
      },
    ],
  },

  {
    key: AIR_MARKETER?.SMS_MARKETING,
    icon: SmsMarketingImage,
    label: 'SMS Marketing',
    role: 'AIR_MARKETER',
    permissions: Permissions?.AIR_MARKETER_SMS_MARKETING,
  },
  {
    key: AIR_MARKETER?.LEAD_CAPTURE,
    label: 'Lead Capture',
    icon: LeadCaptureImage,
    role: 'AIR_MARKETER',
    permissions: [],
    textNames: [
      {
        key: AIR_MARKETER?.LEAD_CAPTURE_CTA,
        label: 'CTA',
        permissions: Permissions?.AIR_MARKETER_LEAD_CAPTURE,
      },
      {
        key: AIR_MARKETER?.LEAD_CAPTURE_FORMS,
        label: 'Forms',
        permissions: Permissions?.AIR_MARKETER_LEAD_CAPTURE_FORM,
      },
    ],
  },
  {
    key: AIR_MARKETER?.REPORTS,
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_MARKETER',
    permissions: Permissions?.AIR_MARKETER_REPORTS,
  },
];

export const CustomerPortalRoutes: any = [
  {
    key: '/air-customer-portal',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'CUSTOMER_PORTAL',
    permissions: Permissions?.AIR_CUSTOMER_PORTAL_DASHBOARD,
  },
  {
    key: '/air-customer-portal/tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'CUSTOMER_PORTAL',
    permissions: Permissions?.AIR_CUSTOMER_PORTAL_TICKETS,
  },
  {
    key: '/air-customer-portal/knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'CUSTOMER_PORTAL',
    permissions: [],
  },
  {
    key: '/air-customer-portal/catalog',
    icon: WorkLoadImage,
    label: 'Catalog',
    role: 'CUSTOMER_PORTAL',
    permissions: Permissions?.AIR_CUSTOMER_PORTAL_CATALOG_LAYOUT,
  },
];

export const AirOperationsRoutes: any = [
  {
    key: AIR_OPERATION?.root,
    icon: DataManagementImage,
    label: 'Data Management',
    role: 'AIR_OPERATIONS',
    permissions: Permissions?.AIR_OPERATIONS_DATA_MANAGEMENT,
  },
  {
    key: AIR_OPERATION?.WORK_FLOW,
    icon: WorkFlowAutomationImage,
    label: 'Workflow',
    role: 'AIR_OPERATIONS',
    permissions: Permissions?.AIR_OPERATIONS_WORKFLOWS,
  },
  {
    key: AIR_OPERATION?.USER_MANAGEMENT,
    icon: ProfileUserManagementImage,
    label: 'User Management',
    role: 'AIR_OPERATIONS',
    permissions: Permissions?.AIR_OPERATIONS_USER_MANAGEMENT,
  },
];

export const SalesRoutes: any = [
  {
    key: '/air-sales/dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_SALES',
    permissions: Permissions?.AIR_SALES_DASHBOARD,
  },
  {
    key: '/air-sales/deals',
    icon: UserManagementImage,
    label: 'Deals',
    role: 'AIR_SALES',
    permissions: Permissions?.AIR_SALES_DEALS,
  },

  {
    key: '/air-sales/forecast',
    icon: ForecastImage,
    label: 'Forecast',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: '/air-sales/quotes',
    icon: QuotesImage,
    label: 'Quotes',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: '/air-sales/tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'AIR_SALES',
    permissions: [],
  },

  {
    key: '/air-sales/invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: '/air-sales/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_SALES',
    permissions: [],
  },
];

export const LowerSuperAdminRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'super-admin',
    key: '/super-admin/settings',
    permissions: [],
    textNames: [
      {
        key: '/super-admin/settings/jobs',
        label: 'Jobs',
        permissions: [],
      },
      {
        key: '/super-admin/settings/faqs',
        label: 'FAQs',
        permissions: [],
      },
      {
        key: '/super-admin/settings/enquiries',
        label: 'Enquiries',
        permissions: [],
      },
      {
        key: '/super-admin/settings/tax-calculation',
        label: 'Tax Calculation',
        permissions: [],
      },
      {
        key: '/super-admin/settings/quick-links',
        label: 'Quick Links',
        permissions: [],
      },
      {
        key: '/super-admin/settings/news-and-events',
        label: 'News And Events',
        permissions: [],
      },
      {
        key: '/super-admin/settings/module-creation',
        label: 'Module Creation',
        permissions: [],
      },
      {
        key: '/super-admin/settings/product-list',
        label: 'Product List',
        permissions: [],
      },
      {
        key: '/super-admin/settings/product-features',
        label: 'Product Feature',
        permissions: [],
      },
    ],
  },
];

export const LowerOrgAdminRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'org-admin',
    key: '/org-admin/settings',
    permissions: [],
    textNames: [
      {
        key: '/org-admin/settings/sales-product-categories',
        label: 'Sales Product categories',
        permissions: [],
      },
      {
        key: '/org-admin/settings/life-cycle-stage',
        label: 'Life Cycle Stage',
        permissions: [],
      },
      {
        key: '/org-admin/settings/contact-status',
        label: 'Contact Status',
        permissions: [],
      },
    ],
  },
];

export const LowerAirOperationRoutes = [];
export const LowerSalesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_SALES',
    key: '/air-sales/settings',
    permissions: [],
  },
];

export const LowerLoyaltyProgramRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'Loyalty-program',
    key: LOYALTY_PROGRAM?.SETTINGS,
    permissions: [],
  },
];

export const LowerAirMarketingRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_MARKETER',
    key: AIR_MARKETER?.SETTINGS,
    permissions: [],
  },
];
export const LowerServicesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'SERVICES',
    key: '/air-services/settings',
    permissions: Permissions?.AIR_SERVICES_SETTINGS,
    textNames: [
      {
        key: '/air-services/settings/account-settings',
        label: 'Account Settings',
        permissions:
          Permissions?.AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_ACCOUNT_DETAILS,
      },
      {
        key: '/air-services/settings/user-management',
        label: 'User Management',
        permissions: Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT,
      },
      {
        key: '/air-services/settings/asset-management',
        label: 'Asset Management',
        permissions: Permissions?.AIR_SERVICES_SETTINGS_ASSET_MANAGEMENT,
      },
      {
        key: '/air-services/settings/agent-performance-management',
        label: 'Agent Productivity & Workload Management',
        permissions:
          Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT,
      },
      {
        key: '/air-services/settings/service-management',
        label: 'Service Management',
        permissions: Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT,
      },
    ],
  },
];

export const QuickLinksData = [
  {
    logo: SettingQuickImage,
    name: 'Create Quote',
  },
  {
    logo: ProfileUserImage,
    name: 'View Products',
  },
  {
    logo: AddNewRoleSettingImage,
    name: 'Add Deals',
  },
  {
    logo: BuildingImage,
    name: 'Add New Role',
  },
  {
    logo: AddNewRoleSettingImage,
    name: 'Create Goal(Forecast)',
  },
];

export const StatusDropDown = [
  {
    label: 'Available',
    icon: AvailableImage,
  },
  {
    label: 'Busy',
    icon: BusyImage,
  },
  {
    label: 'Meeting',
    icon: MeetingImage,
  },
  {
    label: 'Away',
    icon: AwayImage,
  },
  {
    label: 'Break',
    icon: BreakImage,
  },
];

export const ProfileDropDown = [
  {
    label: 'Edit Profile',
    key: '/edit-profile',
  },
  {
    label: 'Change Password',
    key: '/change-password',
  },
  {
    label: 'Delegate',
    key: '/delegate',
  },
];

export const QuickLinkData = [
  {
    key: '1',
    icon: CallImage,
    path: '/social-components/calling',
  },
  {
    key: '2',
    icon: ContactImage,
    path: AIR_SOCIAL?.CONTACTS,
  },
  {
    key: '3',
    icon: MeetingTopImage,
    path: '',
  },
  {
    key: '4',
    icon: DocumentImage,
    path: '',
  },
  {
    key: '5',
    icon: MailImage,
    path: '/social-components/chat',
  },
  {
    key: '6',
    icon: MessageImage,
    path: '',
  },
  {
    key: '7',
    icon: CompaniesImage,
    path: '',
  },
];

const PRODUCT__ROUTES: any = {
  SUPER_ADMIN: SuperAdminRoutes,
  'Air Sales': SalesRoutes,
  'Air Services': ServicesRoutes,
  ORG_ADMIN: OrgAdminRoutes,
  'Customer Portal': CustomerPortalRoutes,
  'Air Operations': AirOperationsRoutes,
  'Air Marketer': AirMarketingRoutes,
  'Loyalty Program': LoyaltyProgramsRoutes,
};

export const getRoutes = (role: any) => {
  return PRODUCT__ROUTES[role];
};

const LOWER_PRODUCT_ROUTES: any = {
  'Super Admin': LowerSuperAdminRoutes,
  'Air Sales': LowerSalesRoutes,
  'Air Services': LowerServicesRoutes,
  'Org Admin': LowerOrgAdminRoutes,
  'Air Operations': LowerAirOperationRoutes,
  'Air Marketer': LowerAirMarketingRoutes,
  'Loyalty Program': LowerLoyaltyProgramRoutes,
};

export const getLowerRoutes = (role: any) => {
  return LOWER_PRODUCT_ROUTES[role];
};

export const zeroPaddingRoutes = [
  '/social-components/chat',
  '/social-components/calling/call',
  '/org-admin/users',
  '/super-admin/user-management/users-list',
  '/air-customer-portal',
  '/air-marketer/social-marketing/social-inbox',
  '/air-marketer/social-marketing',
  '/air-loyalty-program',
];
