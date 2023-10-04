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
    key: 'service-dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'SERVICE',
  },
  {
    key: 'tickets',
    icon: TicketDiscountImage,
    label: 'Tickets',
    role: 'SERVICE',
  },
  {
    key: 'problems',
    icon: ProblemImage,
    label: 'Problems',
    role: 'SERVICE',
  },
  {
    key: 'changes',
    icon: ChangeCircleImage,
    label: 'Changes',
    role: 'SERVICE',
  },
  {
    key: 'releases',
    icon: ReleasesImage,
    label: 'Releases',
    role: 'SERVICE',
  },
  {
    key: 'assets',
    label: 'Assets',
    icon: AssetsImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'inventory',
        label: 'Inventory',
      },
      {
        key: 'software',
        label: 'Software',
      },
      {
        key: 'contracts',
        label: 'Contracts',
      },
      {
        key: 'purchase-orders',
        label: 'Purchase Orders',
      },
    ],
  },

  {
    key: 'super-admin-dashboard',
    label: 'Projects',
    icon: ProjectImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'project-tasks',
        label: 'Project Tasks',
      },
      {
        key: 'project-template',
        label: 'Project Template',
      },
    ],
  },

  {
    key: 'knowledge-base',
    icon: KnowledgeBaseImage,
    label: 'Knowledge Base',
    role: 'SERVICE',
  },
  {
    key: 'workload',
    icon: WorkLoadImage,
    label: 'WorkLoad',
    role: 'SERVICE',
  },
  {
    key: 'reporting',
    label: 'Reportings',
    icon: ReportingImage,
    role: 'SERVICE',
    textNames: [
      {
        key: 'analytics',
        label: 'Analytics',
      },
      {
        key: 'project-analytics',
        label: 'Project Analytics',
      },
    ],
  },
  {
    key: 'control-panel',
    icon: CustomerPortalImage,
    label: 'Control Panel',
    role: 'SERVICE',
  },
];

export const SalesRoutes: any = [
  {
    key: 'sales-dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'AIR_SALES',
  },
  {
    key: 'sales-deals',
    icon: UserManagementImage,
    label: 'Deals',
    role: 'AIR_SALES',
  },

  {
    key: 'sales-forecast',
    icon: ForecastImage,
    label: 'Forecast',
    role: 'AIR_SALES',
  },
  {
    key: 'sales-quotes',
    icon: QuotesImage,
    label: 'Quotes',
    role: 'AIR_SALES',
  },
  {
    key: 'sales-tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'AIR_SALES',
  },

  {
    key: 'sales-invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'AIR_SALES',
  },
  {
    key: 'sales-reports',
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
    key: 'super-admin-dashboard',
    textNames: [
      {
        key: 'super-admin-reports',
        label: 'Jobs',
      },
      {
        key: 'super-admin-reports',
        label: 'FAQs',
      },
      {
        key: 'super-admin-reports',
        label: 'Enquiries',
      },
      {
        key: 'Tax Calculation',
        label: 'Tax Calculation',
      },
      {
        key: 'quick-links',
        label: 'Quick Links',
      },
      {
        key: 'News And Events',
        label: 'News And Events',
      },
      {
        key: 'Module Creation',
        label: 'Module Creation',
      },
      {
        key: 'Product List',
        label: 'Product List',
      },
      {
        key: 'Product Feature',
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
    label: 'Setting',
    icon: SettingImage,
    role: 'AIR_SALES',
    key: 'sales-settings',
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
    key: 'settings',
    textNames: [
      {
        key: 'account-settings',
        label: 'Account Settings',
      },
      {
        key: 'project-workload',
        label: 'Project&Workload',
      },
      {
        key: 'user-management',
        label: 'User Management',
      },
      {
        key: 'asset-management',
        label: 'Asset Management',
      },
      {
        key: 'automation-productivity',
        label: 'Automation & Productivity',
      },
      {
        key: 'service-management',
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
  },
  {
    key: '2',
    icon: ContactImage,
  },
  {
    key: '3',
    icon: MeetingTopImage,
  },
  {
    key: '4',
    icon: DocumentImage,
  },
  {
    key: '5',
    icon: MailImage,
  },
  {
    key: '6',
    icon: MessageImage,
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
