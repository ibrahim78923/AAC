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
  ChangeCircleImage,
  ContactImage,
  CustomerPortalImage,
  DashboardImage,
  DocumentImage,
  ForecastImage,
  KnowledgeBaseImage,
  LogoutImage,
  MailImage,
  MeetingImage,
  MeetingTopImage,
  MessageImage,
  PlanManagementImage,
  ProblemImage,
  ProfileUserImage,
  ProjectImage,
  QuotesImage,
  ReleasesImage,
  ReportingImage,
  ReportsImage,
  SettingImage,
  SettingQuickImage,
  TicketDiscountImage,
  UserManagementImage,
  WorkLoadImage,
} from '@/assets/images';

type MenuItemI = {
  key: React.Key;
  icon?: any;
  label: React.ReactNode;
  role: string;
};

export const SuperAdminRoutes: MenuItemI[] = [
  {
    key: 'super-admin',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'super-admin',
  },
  {
    key: 'super-admin/user-management',
    icon: UserManagementImage,
    label: 'User Management',
    role: 'super-admin',
  },
  {
    key: 'super-admin/plan-management',
    icon: PlanManagementImage,
    label: 'Plan Management',
    role: 'super-admin',
  },
  {
    key: 'super-admin/billing-invoices',
    icon: BillingInvoiceImage,
    label: 'Billing & Invoices',
    role: 'super-admin',
  },
  {
    key: 'super-admin/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'super-admin',
  },
];

export const ServicesRoutes: any = [
  {
    key: 'air-services',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'SERVICE',
  },
  {
    key: 'air-services/tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'SERVICE',
  },
  {
    key: 'air-services/problems',
    icon: ProblemImage,
    label: 'Problems',
    role: 'SERVICE',
  },
  {
    key: 'air-services/changes',
    icon: ChangeCircleImage,
    label: 'Changes',
    role: 'SERVICE',
  },
  {
    key: 'air-services/releases',
    icon: ReleasesImage,
    label: 'Releases',
    role: 'SERVICE',
  },
  {
    key: 'air-services/assets',
    label: 'Assets',
    icon: AssetsImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'air-services/assets/inventory',
        label: 'Inventory',
      },
      {
        key: 'air-services/assets/software',
        label: 'Software',
      },
      {
        key: 'air-services/assets/contracts',
        label: 'Contracts',
      },
      {
        key: 'air-services/assets/purchase-orders',
        label: 'Purchase Orders',
      },
    ],
  },

  {
    key: 'air-services/projects',
    label: 'Projects',
    icon: ProjectImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'air-services/projects/project-tasks',
        label: 'Project Tasks',
      },
      {
        key: 'air-services/projects/project-template',
        label: 'Project Template',
      },
    ],
  },

  {
    key: 'air-services/knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'SERVICE',
  },
  {
    key: 'air-services/workload',
    icon: WorkLoadImage,
    label: 'WorkLoad',
    role: 'SERVICE',
  },
  {
    key: 'air-services/reportings',
    label: 'Reportings',
    icon: ReportingImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'air-services/reportings/analytics',
        label: 'Analytics',
      },
      {
        key: 'air-services/reportings/project-analytics',
        label: 'Project Analytics',
      },
    ],
  },
  {
    key: 'air-services/control-panel',
    icon: CustomerPortalImage,
    label: 'Control Panel',
    role: 'SERVICE',
  },
];

export const SalesRoutes: any = [
  {
    key: 'air-sales',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_SALES',
  },
  {
    key: 'air-sales/deals',
    icon: UserManagementImage,
    label: 'Deals',
    role: 'AIR_SALES',
  },

  {
    key: 'air-sales/forecast',
    icon: ForecastImage,
    label: 'Forecast',
    role: 'AIR_SALES',
  },
  {
    key: 'air-sales/quotes',
    icon: QuotesImage,
    label: 'Quotes',
    role: 'AIR_SALES',
  },
  {
    key: 'air-sales/tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'AIR_SALES',
  },

  {
    key: 'air-sales/invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'AIR_SALES',
  },
  {
    key: 'air-sales/reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'AIR_SALES',
  },
];

export const LowerSuperAdminRoutes = [
  {
    label: 'Setting',
    icon: SettingImage,
    role: 'super-admin',
    key: 'super-admin/settings',
    textNames: [
      {
        key: 'super-admin/settings/jobs',
        label: 'Jobs',
      },
      {
        key: 'super-admin/settings/faqs',
        label: 'FAQs',
      },
      {
        key: 'super-admin/settings/enquiries',
        label: 'Enquiries',
      },
      {
        key: 'super-admin/settings/tax-calculation',
        label: 'Tax Calculation',
      },
      {
        key: 'super-admin/settings/quick-links',
        label: 'Quick Links',
      },
      {
        key: 'super-admin/settings/news-and-events',
        label: 'News And Events',
      },
      {
        key: 'super-admin/settings/module-creation',
        label: 'Module Creation',
      },
      {
        key: 'super-admin/settings/product-list',
        label: 'Product List',
      },
      {
        key: 'super-admin/settings/product-features',
        label: 'Product Feature',
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

export const LowerSalesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'AIR_SALES',
    key: 'air-sales/settings',
  },
  {
    label: 'Logout',
    key: 'logout',
    role: 'AIR_SALES',
    icon: LogoutImage,
  },
];
export const LowerServicesRoutes = [
  {
    label: 'Settings',
    icon: SettingImage,
    role: 'SERVICES',
    key: 'air-sales/settings',
    textNames: [
      {
        key: 'air-services/settings/account-settings',
        label: 'Account Settings',
      },
      {
        key: 'air-services/settings/project-workload',
        label: 'Project&Workload',
      },
      {
        key: 'air-services/settings/user-management',
        label: 'User Management',
      },
      {
        key: 'air-services/settings/asset-management',
        label: 'Asset Management',
      },
      {
        key: 'air-services/settings/automation-productivity',
        label: 'Automation & Productivity',
      },
      {
        key: 'air-services/settings/service-management',
        label: 'Service Management',
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
];

const ROLES_ROUTES: any = {
  SUPER_ADMIN: SuperAdminRoutes,
  AIR_SALES: SalesRoutes,
  AIR_SERVICES: ServicesRoutes,
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role];
};

const LOWER_ROLES_ROUTES: any = {
  SUPER_ADMIN: LowerSuperAdminRoutes,
  AIR_SALES: LowerSalesRoutes,
  AIR_SERVICES: LowerServicesRoutes,
};

export const getLowerRoutes = (role: any) => {
  return LOWER_ROLES_ROUTES[role];
};
