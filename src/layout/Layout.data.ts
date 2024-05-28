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
  PowerDailerImage,
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
  WhatsappMarketingImage,
  WorkFlowAutomationImage,
  WorkLoadImage,
  FeedbackSurveyImage,
  EnquiriesImage,
  SignupLeadsImage,
} from '@/assets/images';
import { Quick_Links_Routes } from '@/constants';
import {
  Permissions,
  orgAdminAllPermissions,
  superAdminAllPermissionsSetting,
} from '@/constants/permissions';
import {
  AIR_MARKETER,
  AIR_OPERATION,
  LOYALTY_PROGRAM,
  AIR_SOCIAL,
  AIR_CALL_CENTER,
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
    permissions: Permissions?.BILLING_AND_INVOICES,
  },
  {
    key: '/super-admin/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'super-admin',
    permissions: Permissions?.SUPER_ADMIN_REPORTS,
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
    permissions: Permissions?.ORG_ADMIN_ROLE_AND_RIGHTS,
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
    key: '/air-services/feedback-survey',
    icon: FeedbackSurveyImage,
    label: 'Feedback Survey',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: '/air-services/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: '/air-services/enquiries',
    icon: EnquiriesImage,
    label: 'Enquiries',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_ENQUIRIES,
  },
  {
    key: '/air-services/signup-leads',
    icon: SignupLeadsImage,
    label: 'Signup Leads',
    role: 'SERVICE',
    permissions: Permissions?.AIR_SERVICES_SIGNUP_LEADS_PERMISSION,
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
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_DASHBOARD,
  },

  {
    key: LOYALTY_PROGRAM?.LOYALTY_REWARD,
    label: 'Loyalty',
    icon: LoyaltyImage,
    role: 'Loyalty-Program',
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY,
    textNames: [
      {
        key: LOYALTY_PROGRAM?.LOYALTY_REWARD,
        label: 'Rewards',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS,
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_TRANSACTIONS,
        label: 'Transactions',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS,
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_RULES_TIERS,
        label: 'Rules & Tiers',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS,
      },
      {
        key: LOYALTY_PROGRAM?.LOYALTY_RULES_VOUCHERS,
        label: 'Vouchers',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_VOUCHERS,
      },
    ],
  },
  {
    key: LOYALTY_PROGRAM?.GIFT_CARDS,
    label: 'Gift Cards',
    icon: GiftCardImage,
    role: 'Loyalty-Program',
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS,
    textNames: [
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS,
        label: 'Gift Cards',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD,
      },
      {
        key: LOYALTY_PROGRAM?.GIFT_CARDS_TRANSACTIONS,
        label: 'Transactions',
        permissions: Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS,
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
    permissions: Permissions?.AIR_MARKETER,
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
    key: AIR_MARKETER?.SOCIAL_INBOX,
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
      {
        key: AIR_MARKETER?.COMPARE_POST,
        label: 'Compare Post',
        permissions:
          Permissions?.AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS,
      },
      {
        key: AIR_MARKETER?.CALENDER,
        label: 'Calendar',
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
    key: AIR_MARKETER?.WHATSAPP_MERKETING,
    icon: WhatsappMarketingImage,
    label: 'WhatsApp Marketing',
    role: 'AIR_MARKETER',
    permissions: Permissions?.AIR_MARKETER_WHATSAPP_MARKETING,
  },
  {
    key: AIR_MARKETER?.LEAD_CAPTURE_CTA,
    label: 'Lead Capture',
    icon: LeadCaptureImage,
    role: 'AIR_MARKETER',
    permissions: Permissions?.AIR_MARKETER_LEAD_CAPTURE,
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
    permissions: Permissions?.AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE,
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
    label: 'Workflow Automation',
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
    permissions: Permissions?.AIR_SALES_QUOTES,
  },
  {
    key: '/air-sales/tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'AIR_SALES',
    permissions: Permissions?.AIR_SALES_TASKS,
  },

  {
    key: '/air-sales/invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'AIR_SALES',
    permissions: Permissions?.AIR_SALES_INVOICES,
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
    permissions: superAdminAllPermissionsSetting,
    textNames: [
      {
        key: '/super-admin/settings/jobs',
        label: 'Jobs',
        permissions: Permissions?.SETTING_JOBS,
      },
      {
        key: '/super-admin/settings/faqs',
        label: 'FAQs',
        permissions: Permissions?.SETTING_FAQ,
      },
      {
        key: '/super-admin/settings/enquiries',
        label: 'Enquiries',
        permissions: Permissions?.SETTING_ENQUIRIES,
      },
      {
        key: '/super-admin/settings/tax-calculation',
        label: 'Tax Calculation',
        permissions: Permissions?.SETTING_TAX_CALCULATION,
      },
      {
        key: '/super-admin/settings/quick-links',
        label: 'Quick Links',
        permissions: Permissions?.SETTING_QUICK_LINKS,
      },
      {
        key: '/super-admin/settings/news-and-events',
        label: 'News And Events',
        permissions: Permissions?.SETTING_NEWS_EVENTS,
      },
      {
        key: '/super-admin/settings/product-list',
        label: 'Module Creation',
        permissions: Permissions?.SETTING_PRODUCT_LIST,
      },
      {
        key: '/super-admin/settings/product-features',
        label: 'Product Feature',
        permissions: Permissions?.SETTING_PRODUCT_FEATURES,
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
    permissions: orgAdminAllPermissions,
    textNames: [
      {
        key: '/org-admin/settings/sales-product-categories',
        label: 'Sales Product categories',
        permissions: Permissions?.ORG_ADMIN_SETTINGS_CATEGORIES,
      },
      {
        key: '/org-admin/settings/life-cycle-stage',
        label: 'Life Cycle Stage',
        permissions: Permissions?.ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES,
      },
      {
        key: '/org-admin/settings/contact-status',
        label: 'Contact Status',
        permissions: Permissions?.ORG_ADMIN_SETTINGS_CONTACT_STATUS,
      },
      {
        key: '/org-admin/settings/bank-accounts',
        label: 'Receiver Bank Account',
        permissions: Permissions?.ORG_ADMIN_SETTINGS_CONTACT_STATUS,
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
    permissions: Permissions?.AIR_SALES_SETTINGS,
  },
];

export const LowerLoyaltyProgramRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'Loyalty-program',
    key: LOYALTY_PROGRAM?.SETTINGS,
    permissions: Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT,
  },
];

export const LowerAirMarketingRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_MARKETER',
    key: AIR_MARKETER?.SETTINGS,
    permissions: Permissions?.AIR_MARKETER_SETTINGS,
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

export const LowerAirCallCenterRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'Air-Call-Center',
    key: AIR_CALL_CENTER.SETTINGS.PHONE_NUMBER,
    permissions: [],
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
    key: '/edit-profile',
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
    path: Quick_Links_Routes?.CALLING,
    permissions: Permissions?.SOCIAL_COMPONENTS_CALLING,
  },
  {
    key: '2',
    icon: ContactImage,
    path: AIR_SOCIAL?.CONTACTS,
    permissions: Permissions?.SOCIAL_COMPONENTS_CONTACTS,
  },
  {
    key: '3',
    icon: MeetingTopImage,
    path: Quick_Links_Routes?.MEETINGS,
    permissions: Permissions?.SOCIAL_COMPONENTS_MEETINGS,
  },
  {
    key: '4',
    icon: DocumentImage,
    path: Quick_Links_Routes?.DOCUMENT,
    permissions: Permissions?.SOCIAL_COMPONENTS_DOCUMENTS,
  },
  {
    key: '5',
    icon: MailImage,
    path: Quick_Links_Routes?.CHAT,
    permissions: Permissions?.SOCIAL_COMPONENTS_CHAT,
  },
  {
    key: '6',
    icon: MessageImage,
    path: Quick_Links_Routes?.EMAIL,
    permissions: Permissions?.SOCIAL_COMPONENTS_EMAIL,
  },
  {
    key: '7',
    icon: CompaniesImage,
    path: Quick_Links_Routes?.COMPANIES,
    permissions: Permissions?.SOCIAL_COMPONENTS_COMPANIES,
  },
];

export const AirCallCenterRoutes: any = [
  {
    key: AIR_CALL_CENTER?.DASHBOARD,
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'Air-Call-Center',
    permissions: [],
  },
  {
    key: AIR_CALL_CENTER?.CALL_METRICS,
    icon: CallImage,
    label: 'Call Metrics',
    role: 'Air-Call-Center',
    permissions: [],
  },
  {
    key: AIR_CALL_CENTER?.POWER_DAILER,
    icon: PowerDailerImage,
    label: 'Power Dialer',
    role: 'Air-Call-Center',
    permissions: [],
  },
];

const PRODUCT__ROUTES: any = {
  'Super Admin': SuperAdminRoutes,
  'Air Sales': SalesRoutes,
  'Air Services': ServicesRoutes,
  'Org Admin': OrgAdminRoutes,
  'Customer Portal': CustomerPortalRoutes,
  'Air Operations': AirOperationsRoutes,
  'Air Marketer': AirMarketingRoutes,
  'Loyalty Program': LoyaltyProgramsRoutes,
  'Air Call Center': AirCallCenterRoutes,
};

export const getRoutes = (product: any) => {
  return PRODUCT__ROUTES[product];
};

const LOWER_PRODUCT_ROUTES: any = {
  'Super Admin': LowerSuperAdminRoutes,
  'Air Sales': LowerSalesRoutes,
  'Air Services': LowerServicesRoutes,
  'Org Admin': LowerOrgAdminRoutes,
  'Air Operations': LowerAirOperationRoutes,
  'Air Marketer': LowerAirMarketingRoutes,
  'Loyalty Program': LowerLoyaltyProgramRoutes,
  'Air Call Center': LowerAirCallCenterRoutes,
};

export const getLowerRoutes = (product: any) => {
  return LOWER_PRODUCT_ROUTES[product];
};

export const zeroPaddingRoutes = [
  '/social-components/chat',
  '/social-components/email/conversations',
  '/social-components/calling/call',
  '/org-admin/users',
  '/super-admin/user-management/users-list',
  '/air-customer-portal',
  '/air-marketer/social-marketing/social-inbox',
  '/air-marketer/social-marketing',
  '/air-loyalty-program',
  '/air-services/settings/asset-management/vendor-fields',
];
