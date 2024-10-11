import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import { AIR_SALES_DASHBOARD_REPORTS_TYPES } from '@/constants';
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
    label: 'Deals created vs Closed deals',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEALS_CREATED_VS_CLOSED_DEALS,
  },
  {
    label: 'Meeting details',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.MEETING_DETAILS,
  },
  {
    label: 'Team activities by activity date',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE,
  },
  {
    label: 'Total Deals, Open Deals, Team Goals, Closed, Won, Published Quotes',
    value:
      AIR_SALES_DASHBOARD_REPORTS_TYPES?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES,
  },
  {
    label: 'Deal reports',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEAL_REPORTS,
  },
  {
    label: 'Forecast pipeline report',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_PIPELINE_REPORT,
  },
  {
    label: 'Forecast category reports',
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_CATEGORY_REPORTS,
  },
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
