import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '@/modules/airServices/Dashboard/CreateDashboard/CreateDashboard.data';
import { AIR_SALES_DASHBOARD_REPORTS_TYPES } from '@/constants';

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
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEALS_CREATED_VS_CLOSED,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEALS_CREATED_VS_CLOSED,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.MEETING_DETAILS,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.MEETING_DETAILS,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.TEAM_ACTIVITIES_BY_DATE,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.TEAM_ACTIVITIES_BY_DATE,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.TOTAL_DEALS_OPEN_DEALS,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.TOTAL_DEALS_OPEN_DEALS,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEAL_REPORTS,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.DEAL_REPORTS,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_PIPELINE_REPORT,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_PIPELINE_REPORT,
  },
  {
    label: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_CATEGORY_REPORTS,
    value: AIR_SALES_DASHBOARD_REPORTS_TYPES?.FORECAST_CATEGORY_REPORTS,
  },
];

export const createFormOptions = {
  everyOne: 'Everyone',
  accessDashboard: 'accessDashboard',
};
