import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import { AIR_MARKETER_DASHBOARD_REPORTS_TYPES } from '@/constants';
import { MANAGE_ACCESS_TYPES } from '@/constants/strings';
import * as Yup from 'yup';

export const MANAGE_DASHBOARD_ACCESS_TYPES = {
  PRIVATE_TO_OWNER: MANAGE_ACCESS_TYPES?.PRIVATE_CAPITAL,
  EVERYONE: MANAGE_ACCESS_TYPES?.EVERYONE_CAPITAL,
  EVERYONE_EDIT_AND_VIEW: MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL,
  EVERYONE_ONLY_VIEW: MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL,
  EDIT_AND_VIEW: MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL,
  ONLY_VIEW: MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL,
  SPECIFIC_USER_AND_TEAMS: MANAGE_ACCESS_TYPES?.SPECIFIC_USERS,
  SPECIFIC_USER_EDIT_AND_VIEW: MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL,
  SPECIFIC_USER_ONLY_VIEW: MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL,
};

export const validationSchema = Yup?.object()?.shape({
  dashboardName: Yup?.string()?.trim()?.required('Field is Required'),
  specialUsers: Yup?.mixed()
    ?.nullable()
    ?.when('access', {
      is: (value: any) =>
        value === MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
      then: () => Yup?.array()?.min(1, 'User is required'),
      otherwise: (schema: any) => schema?.notRequired(''),
    }),
  permissions: Yup?.string()?.when('access', {
    is: (value: any) => value === MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE,
    then: () => Yup?.string()?.required('Permission is required'),
    otherwise: (schema: any) => schema?.notRequired(''),
  }),
  permissionsUsers: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        name: Yup?.string(),
        permission: Yup?.string(),
        userId: Yup?.string(),
      }),
    )
    ?.when('access', {
      is: (value: any) =>
        value === MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
      then: () => {
        return Yup?.array()?.of(
          Yup?.object()?.shape({
            name: Yup?.string(),
            permission: Yup?.string()?.required('Permission is required'),
            userId: Yup?.string(),
          }),
        );
      },
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const createDashboardDefaultValue = () => {
  return {
    dashboardName: '',
    access: '',
    permissions: '',
    specialUsers: [],
    permissionsUsers: [],
    reportType: [],
  };
};

export const dataArray = [
  {
    componentProps: {
      name: 'dashboardName',
      label: 'Dashboard Name',
      fullWidth: true,
      required: true,
      placeholder: 'Dashboard Name',
    },
    component: RHFTextField,
    md: 9,
  },
];

export const dashboardReportsData = [
  {
    label: 'CTA Total Views and Ads Submissions',
    value:
      AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.CTA_TOTAL_VIEWS_AND_ADS_SUBMISSIONS,
  },
  {
    label: 'New contacts, and customers by day',
    value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.NEW_CONTACTS_AND_CUSTOMERS,
  },
  {
    label: 'Total Marketing Email',
    value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.TOTAL_MARKETING_EMAIL,
  },
  {
    label: 'Form Submissions',
    value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.LEAD_CAPTURED_FORMS,
  },
  // commented for future use
  // {
  //   label: 'Profile Statistics',
  //   value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.PROFILE_STATS,
  // },
  // {
  //   label: 'SMS Marketing',
  //   value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.SMS_MARKETING_GRAPH,
  // },
  // {
  //   label: 'Whatsapp Marketing',
  //   value: AIR_MARKETER_DASHBOARD_REPORTS_TYPES?.WHATSAPP_MARKETING_GRAPH,
  // },
];

export const createFormOptions = {
  everyOne: 'Everyone',
  accessDashboard: 'accessDashboard',
};

export const specificUsersAccessFormFieldsDynamic = (
  name: string,
  index: number,
) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.name`} size="small" disabled />,
  },
  {
    id: 2,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        fullWidth
        options={[
          {
            value: MANAGE_DASHBOARD_ACCESS_TYPES?.EDIT_AND_VIEW,
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        fullWidth
        options={[
          {
            value: MANAGE_DASHBOARD_ACCESS_TYPES?.ONLY_VIEW,
          },
        ]}
      />
    ),
  },
];
