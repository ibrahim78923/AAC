import {
  AddNewRoleSettingImage,
  AvailableImage,
  AwayImage,
  BillingInvoiceImage,
  BreakImage,
  BuildingImage,
  BusyImage,
  CallImage,
  ContactImage,
  DashboardImage,
  DocumentImage,
  ForecastImage,
  LogoutImage,
  MailImage,
  MeetingImage,
  MeetingTopImage,
  MessageImage,
  PlanManagementImage,
  ProfileUserImage,
  QuotesImage,
  ReportsImage,
  SettingImage,
  SettingQuickImage,
  UserManagementImage,
} from '@/assets/images';

type MenuItemI = {
  key: React.Key;
  icon?: any;
  label: React.ReactNode;
  role: string;
};

export const SuperAdminRoutes: MenuItemI[] = [
  {
    key: 'super-admin-dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'super-admin',
  },
  {
    key: 'super-admin-user-management',
    icon: UserManagementImage,
    label: 'User Management',
    role: 'super-admin',
  },
  {
    key: 'super-admin-plan-management',
    icon: PlanManagementImage,
    label: 'Plan Management',
    role: 'super-admin',
  },
  {
    key: 'super-admin-billing-invoices',
    icon: BillingInvoiceImage,
    label: 'Billing & Invoices',
    role: 'super-admin',
  },
  {
    key: 'super-admin-reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'super-admin',
  },
];

export const SalesRoutes: any = [
  {
    key: 'sales-dashboard',
    icon: DashboardImage,
    label: 'Dashboard',
    role: 'sales',
  },
  {
    key: 'sales-deals',
    icon: UserManagementImage,
    label: 'Deals',
    role: 'sales',
  },

  {
    key: 'sales-forecast',
    icon: ForecastImage,
    label: 'Forecast',
    role: 'sales',
  },
  {
    key: 'super-admin',
    label: 'Data Layout',
    icon: SettingImage,
    role: 'super-admin',
    textNames: [
      {
        key: 'super-admin-reports',
        label: 'Jo',
      },
      {
        key: 'super-admin-reports',
        label: 'FA',
      },
    ],
  },

  {
    key: 'sales-quotes',
    icon: QuotesImage,
    label: 'Quotes',
    role: 'sales',
  },
  {
    key: 'sales-tasks',
    icon: PlanManagementImage,
    label: 'Tasks',
    role: 'sales',
  },

  {
    key: 'sales-invoices',
    icon: BillingInvoiceImage,
    label: 'Invoices',
    role: 'sales',
  },
  {
    key: 'sales-reports',
    icon: ReportsImage,
    label: 'Reports',
    role: 'sales',
  },
  {
    key: 'super-admin-user-management',
    label: 'Setting',
    icon: SettingImage,
    role: 'super-admin',
    textNames: [
      {
        key: 'super-admin-reports',
        label: 'Jobs',
      },
      {
        key: 'super-admin-reports',
        label: 'FAQs',
      },
    ],
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
    role: 'sales',
    icon: LogoutImage,
  },
];

export const LowerSalesRoutes = [
  {
    label: 'Setting',
    icon: SettingImage,
    role: 'super-admin',
    key: 'settings',
    textNames: [
      {
        key: 'super-admin-reports',
        label: 'Jobs',
      },
      {
        key: 'super-admin-reports',
        label: 'FAQs',
      },
    ],
  },
  {
    label: 'Logout',
    key: 'logout',
    role: 'sales',
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
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role];
};

const LOWER_ROLES_ROUTES: any = {
  SUPER_ADMIN: LowerSuperAdminRoutes,
  AIR_SALES: LowerSalesRoutes,
};

export const getLowerRoutes = (role: any) => {
  return LOWER_ROLES_ROUTES[role];
};
