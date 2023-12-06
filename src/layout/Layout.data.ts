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
  IntegrationsImage,
  KnowledgeBaseImage,
  LeadCaptureImage,
  LogoutImage,
  MailImage,
  MeetingImage,
  MeetingTopImage,
  MessageImage,
  PaidAdsImage,
  PlanManagementImage,
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
import { AIR_MARKETER, AIR_OPERATION } from '@/routesConstants/paths';

type MenuItemI = {
  key: React.Key;
  icon?: any;
  label: React.ReactNode;
  role: string;
  permissions?: string[];
};

export const SuperAdminRoutes: MenuItemI[] = [
  {
    key: 'super-admin',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'super-admin',
    permissions: Permissions?.view_dashoard,
  },
  {
    key: 'super-admin/user-management',
    icon: UserManagementImage,
    label: 'User Management',
    role: 'super-admin',
    permissions: Permissions?.user_management,
  },
  {
    key: 'super-admin/plan-management',
    icon: PlanManagementImage,
    label: 'Plan Management',
    role: 'super-admin',
    permissions: Permissions?.PLAN_MANAGEMENT,
  },
  {
    key: 'super-admin/billing-invoices',
    icon: BillingInvoiceImage,
    label: 'Billing & Invoices',
    role: 'super-admin',
    permissions: [],
  },
  {
    key: 'super-admin/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'super-admin',
    permissions: [],
  },
];

export const OrgAdminRoutes: MenuItemI[] = [
  {
    key: 'org-admin',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'org-admin',
    permissions: [],
  },
  {
    key: 'org-admin/user-management',
    icon: UserManagementImage,
    label: 'Users',
    role: 'org-admin',
    permissions: [],
  },
  {
    key: 'org-admin/plan-management',
    icon: QuotesImage,
    label: 'Organization',
    role: 'org-admin',
    permissions: [],
  },
  {
    key: 'org-admin/subscription-and-invoices',
    icon: BillingInvoiceImage,
    label: 'Subsciption & Invoices',
    role: 'org-admin',
    permissions: [],
  },
  {
    key: 'org-admin/properties',
    icon: ReportsImage,
    label: 'Properties',
    role: 'org-admin',
    permissions: [],
  },
  {
    key: 'org-admin/role-and-rights',
    icon: ForecastImage,
    label: 'Role and Rights',
    role: 'org-admin',
    permissions: [],
  },
];

export const ServicesRoutes: any = [
  {
    key: 'air-services',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: 'air-services/tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: 'air-services/assets/inventory',
    label: 'Assets',
    icon: AssetsImage,
    role: 'SERVICE',
    permissions: [],
    textNames: [
      {
        key: 'air-services/assets/inventory',
        label: 'Inventory',
        permissions: [],
      },
      {
        key: 'air-services/assets/software',
        label: 'Software',
        permissions: [],
      },
      {
        key: 'air-services/assets/contracts',
        label: 'Contracts',
        permissions: [],
      },
      {
        key: 'air-services/assets/purchase-orders',
        label: 'Purchase Orders',
        permissions: [],
      },
    ],
  },

  {
    key: 'air-services/knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: 'air-services/workload',
    icon: WorkLoadImage,
    label: 'WorkLoad',
    role: 'SERVICE',
    permissions: [],
  },
  {
    key: 'air-services/control-panel',
    icon: CustomerPortalImage,
    label: 'Customer Portal',
    role: 'SERVICE',
    permissions: [],
  },
];

export const AirMarketingRoutes: any = [
  {
    key: AIR_MARKETER?.root,
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_MARKETING',
    permissions: [],
  },
  {
    key: AIR_MARKETER?.PAID_ADS,
    icon: PaidAdsImage,
    label: 'Paid Ads',
    role: 'AIR_MARKETING',
    permissions: [],
  },
  {
    key: AIR_MARKETER?.CAMPAIGNS,
    icon: CampaignImage,
    label: 'Campaign',
    role: 'AIR_MARKETING',
    permissions: [],
  },
  {
    key: AIR_MARKETER?.EMAIL_MARKETING,
    label: 'Email Marketing',
    icon: EmailMarketingImage,
    role: 'AIR_MARKETING',
    permissions: [],
    textNames: [
      {
        key: AIR_MARKETER?.EMAIL_TEMPLATES,
        label: 'Email Templates',
        permissions: [],
      },
      {
        key: AIR_MARKETER?.EMAIL_FOLDER,
        label: 'Email Folder',
        permissions: [],
      },
      {
        key: AIR_MARKETER?.EMAIL_REPORTS,
        label: 'Email Reports',
        permissions: [],
      },
    ],
  },

  {
    key: AIR_MARKETER?.SOCIAL_MARKETING,
    label: 'Social Marketing',
    icon: SocialMarketingImage,
    role: 'AIR_MARKETING',
    permissions: [],
    textNames: [
      {
        key: AIR_MARKETER?.SOCIAL_INBOX,
        label: 'SociaL Inbox',
        permissions: [],
      },
    ],
  },

  {
    key: AIR_MARKETER?.SMS_MARKETING,
    icon: SmsMarketingImage,
    label: 'SMS Marketing',
    role: 'AIR_MARKETING',
    permissions: [],
  },
  {
    key: AIR_MARKETER?.LEAD_CAPTURE,
    label: 'Lead Capture',
    icon: LeadCaptureImage,
    role: 'AIR_MARKETING',
    permissions: [],
    textNames: [
      {
        key: AIR_MARKETER?.LEAD_CAPTURE_CTA,
        label: 'CTA',
        permissions: [],
      },
      {
        key: AIR_MARKETER?.LEAD_CAPTURE_FORMS,
        label: 'Forms',
        permissions: [],
      },
    ],
  },
  {
    key: AIR_MARKETER?.REPORTS,
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_MARKETING',
    permissions: [],
  },
];

export const CustomerPortalRoutes: any = [
  {
    key: 'customer-portal',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'CUSTOMER_PORTAL',
    permissions: [],
  },
  {
    key: 'customer-portal/tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'CUSTOMER_PORTAL',
    permissions: [],
  },
  {
    key: 'customer-portal/knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'CUSTOMER_PORTAL',
    permissions: [],
  },
  {
    key: 'customer-portal/catalog',
    icon: WorkLoadImage,
    label: 'Catalog',
    role: 'CUSTOMER_PORTAL',
    permissions: [],
  },
];

export const AirOperationsRoutes: any = [
  {
    key: AIR_OPERATION?.root,
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.DATA_MANAGEMENT,
    icon: DataManagementImage,
    label: 'Data Management',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.INTEGRATIONS,
    icon: IntegrationsImage,
    label: 'Integrations',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.WORK_FLOW,
    icon: WorkFlowAutomationImage,
    label: 'Workflow',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.REPORTS,
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.ROLE_AND_RIGHT,
    icon: ForecastImage,
    label: 'Role and Rights',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
  {
    key: AIR_OPERATION?.USER_MANAGEMENT,
    icon: ProfileUserManagementImage,
    label: 'User Management',
    role: 'AIR_OPERATIONS',
    permissions: [],
  },
];

export const SalesRoutes: any = [
  {
    key: 'air-sales',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: 'air-sales/deals',
    icon: UserManagementImage,
    label: 'Deals',
    role: 'AIR_SALES',
    permissions: [],
  },

  {
    key: 'air-sales/forecast',
    icon: ForecastImage,
    label: 'Forecast',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: 'air-sales/quotes',
    icon: QuotesImage,
    label: 'Quotes',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: 'air-sales/tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'AIR_SALES',
    permissions: [],
  },

  {
    key: 'air-sales/invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'AIR_SALES',
    permissions: [],
  },
  {
    key: 'air-sales/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_SALES',
    permissions: [],
  },
];

export const LowerSuperAdminRoutes = [
  {
    label: 'Setting',
    icon: SettingImage,
    role: 'super-admin',
    key: 'super-admin/settings',
    permissions: [],
    textNames: [
      {
        key: 'super-admin/settings/jobs',
        label: 'Jobs',
        permissions: [],
      },
      {
        key: 'super-admin/settings/faqs',
        label: 'FAQs',
        permissions: [],
      },
      {
        key: 'super-admin/settings/enquiries',
        label: 'Enquiries',
        permissions: [],
      },
      {
        key: 'super-admin/settings/tax-calculation',
        label: 'Tax Calculation',
        permissions: [],
      },
      {
        key: 'super-admin/settings/quick-links',
        label: 'Quick Links',
        permissions: [],
      },
      {
        key: 'super-admin/settings/news-and-events',
        label: 'News And Events',
        permissions: [],
      },
      {
        key: 'super-admin/settings/module-creation',
        label: 'Module Creation',
        permissions: [],
      },
      {
        key: 'super-admin/settings/product-list',
        label: 'Product List',
        permissions: [],
      },
      {
        key: 'super-admin/settings/product-features',
        label: 'Product Feature',
        permissions: [],
      },
    ],
  },
  {
    label: 'Logout',
    permissions: [],
    key: 'logout',
    role: 'AIR_SALES',
    icon: LogoutImage,
  },
];

export const LowerOrgAdminRoutes = [
  {
    label: 'Setting',
    icon: SettingImage,
    role: 'org-admin',
    key: 'org-admin/settings',
    permissions: [],
    textNames: [
      {
        key: 'org-admin/settings/sales-product-categories',
        label: 'Sales Product categories',
        permissions: [],
      },
      {
        key: 'org-admin/settings/life-cycle-stage',
        label: 'Life Cycle Stage',
        permissions: [],
      },
      {
        key: 'org-admin/settings/contact-status',
        label: 'Contact Status',
        permissions: [],
      },
    ],
  },
  {
    label: 'Logout',
    key: 'logout',
    permissions: [],
    role: 'AIR_SALES',
    icon: LogoutImage,
  },
];

export const LowerAirOperationRoutes = [
  {
    label: 'Logout',
    key: '',
    role: 'AIR_OPERATIONS',
    permissions: [],
    icon: LogoutImage,
  },
];
export const LowerSalesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_SALES',
    key: 'air-sales/settings',
    permissions: [],
  },

  {
    label: 'Logout',
    key: 'logout',
    role: 'AIR_SALES',
    permissions: [],
    icon: LogoutImage,
  },
];

export const LowerAirMarketingRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_MARKETING',
    key: AIR_MARKETER?.SETTINGS,
    permissions: [],
  },

  {
    label: 'Logout',
    key: '',
    role: 'AIR_MARKETING',
    permissions: [],
    icon: LogoutImage,
  },
];
export const LowerServicesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'SERVICES',
    key: 'air-services/settings',
    permissions: [],
    textNames: [
      {
        key: 'air-services/settings/account-settings',
        label: 'Account Settings',
        permissions: [],
      },
      {
        key: 'air-services/settings/user-management',
        label: 'User Management',
        permissions: [],
      },
      {
        key: 'air-services/settings/asset-management',
        label: 'Asset Management',
        permissions: [],
      },
      {
        key: 'air-services/settings/agent-performance-management',
        label: 'Agent Productivity & Workload Management',
        permissions: [],
      },
      {
        key: 'air-services/settings/service-management',
        label: 'Service Management',
        permissions: [],
      },
    ],
  },
  {
    label: 'Logout',
    key: 'logout',
    role: 'AIR_SALES',
    icon: LogoutImage,
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
    key: 'edit-profile',
  },
  {
    label: 'Change Password',
    key: 'change-password',
  },
  {
    label: 'Delegate',
    key: 'delegate',
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
    path: '',
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

const ROLES_ROUTES: any = {
  SUPER_ADMIN: SuperAdminRoutes,
  AIR_SALES: SalesRoutes,
  AIR_SERVICES: ServicesRoutes,
  ORG_ADMIN: OrgAdminRoutes,
  CUSTOMER_PORTAL: CustomerPortalRoutes,
  AIR_OPERATIONS: AirOperationsRoutes,
  AIR_MARKETER: AirMarketingRoutes,
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role];
};

const LOWER_ROLES_ROUTES: any = {
  SUPER_ADMIN: LowerSuperAdminRoutes,
  AIR_SALES: LowerSalesRoutes,
  AIR_SERVICES: LowerServicesRoutes,
  ORG_ADMIN: LowerOrgAdminRoutes,
  AIR_OPERATIONS: LowerAirOperationRoutes,
  AIR_MARKETER: LowerAirMarketingRoutes,
};

export const getLowerRoutes = (role: any) => {
  return LOWER_ROLES_ROUTES[role];
};

export const zeroPaddingRoutes = [
  '/social-components/chat',
  '/social-components/calling/call',
  '/org-admin/users',
  '/super-admin/user-management/users-list',
  '/air-customer-portal',
  '/air-marketer/social-marketing/social-inbox',
  '/air-marketer/social-marketing',
];
