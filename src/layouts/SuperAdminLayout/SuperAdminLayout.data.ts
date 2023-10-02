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

export const SuperAdminItems: MenuItemI[] = [
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
];

export const LowerSuperAdminItems = [
  {
    name: 'Setting',
    logo: SettingImage,
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
    name: 'Settings',
    key: 'sales-settings',
    role: 'sales',
    logo: SettingImage,
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
