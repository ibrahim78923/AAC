import {
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { REPORT_TYPES } from '@/constants/strings';
import * as Yup from 'yup';
import { UpsertServicesDashboardDefaultValueI } from './UpsertDashboard.interface';
import { SpecificUsers } from './SpecificUsers';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import {
  MANAGE_DASHBOARD_ACCESS_TYPES,
  SERVICES_DASHBOARD_WIDGETS_API_MAPPED,
  dashboardWidgetsData,
} from '../Dashboard.data';

const { SERVICES_DASHBOARD_NAME_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};
const { SET_DEFAULT_DASHBOARD } = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};
const { STATIC } = REPORT_TYPES ?? {};

const {
  SPECIFIC_USER_AND_TEAMS,
  EVERYONE,
  PRIVATE_TO_OWNER,
  EVERYONE_EDIT_AND_VIEW,
  EVERYONE_ONLY_VIEW,
} = MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const createDashboardValidationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.trim()
      ?.required('Name is required')
      ?.max(
        SERVICES_DASHBOARD_NAME_MAX_CHARACTERS,
        `Maximum characters limit is ${SERVICES_DASHBOARD_NAME_MAX_CHARACTERS}`,
      ),
    access: Yup?.string()?.required('Access is required'),
    reports: Yup?.array(),
    specialUsers: Yup?.mixed()
      ?.nullable()
      ?.when('access', {
        is: (value: any) => value === SPECIFIC_USER_AND_TEAMS,
        then: () => Yup?.array()?.min(1, 'User is required'),
        otherwise: (schema: any) => schema?.notRequired(''),
      }),
    permissions: Yup?.string()?.when('access', {
      is: (value: any) => value === EVERYONE,
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
        is: (value: any) => value === SPECIFIC_USER_AND_TEAMS,
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
};

export const filterAndConcatWidgets = (
  arrayToFilter: any,
  arrayToConcat: any,
) => {
  const staticReports = arrayToFilter?.filter(
    (item: any) => item?.type === STATIC,
  );
  const widgetValuesSet = new Set(staticReports?.map((obj: any) => obj?.name));
  const filteredArrayToConcat = arrayToConcat?.filter(
    (obj: any) => !widgetValuesSet?.has(obj?.value),
  );

  const mapAsOptions = staticReports?.map((item: any) => ({
    value: item?.name,
    label: SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[item?.name],
  }));
  const modifiedArray = [...mapAsOptions, ...filteredArrayToConcat];
  return modifiedArray;
};

export const createDashboardDefaultValue = (
  data?: UpsertServicesDashboardDefaultValueI,
) => {
  return {
    name: data?.name ?? '',
    isDefault: data?.isDefault ?? false,
    reports: data?.reports?.length
      ? data?.reports
          ?.filter((item: any) => item?.type === STATIC)
          ?.map((item: any) => item?.name)
      : [],
    specialUsers: data?.specialUsers?.length
      ? data?.specialUsers?.map((user: any) => ({ ...user?.name, ...user }))
      : [],
    permissionsUsers: data?.specialUsers?.length
      ? data?.specialUsers?.map((user: any) => ({
          name: `${user?.name?.firstName} ${user?.name?.lastName}`,
          userId: user?.userId,
          permission: user?.permission ?? '',
        }))
      : [],
    access: data?.access ?? '',
    permissions: data?.access === EVERYONE ? data?.permissions : '',
    dashboardWidgets: data?.reports?.length
      ? filterAndConcatWidgets(data?.reports, dashboardWidgetsData)
      : dashboardWidgetsData,
  };
};

export const accessDashboardOptions = [
  {
    value: PRIVATE_TO_OWNER,
    label: 'Private to owner',
  },
  {
    value: EVERYONE,
    label: 'Everyone',
    filter: (
      <Box px={3}>
        <RHFRadioGroup
          name="permissions"
          row={false}
          options={[
            {
              value: EVERYONE_EDIT_AND_VIEW,
              label: 'Everyone can edit and view',
            },
            {
              value: EVERYONE_ONLY_VIEW,
              label: 'Everyone can view',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    value: SPECIFIC_USER_AND_TEAMS,
    label: 'Only Specific users',
    filter: <SpecificUsers name="permissionsUsers" />,
  },
];

export const upsertServiceDashboardFormFieldsDynamic = () => [
  {
    _id: 1,
    componentProps: {
      name: 'name',
      label: 'Dashboard Name',
      required: true,
      fullWidth: true,
      placeholder: 'Enter name',
    },
    md: 12,
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2,
    },
    heading: (
      <>
        <Typography
          variant="h6"
          fontWeight={'fontWeightMedium'}
          color="slateblue.main"
        >
          Who can access this dashboard?
          <Typography color={'error.main'} component="span">
            {' '}
            *
          </Typography>
        </Typography>
        <PermissionsGuard permissions={[SET_DEFAULT_DASHBOARD]}>
          <RHFSwitch name="isDefault" label="Set as default" />
        </PermissionsGuard>
      </>
    ),
    component: Box,
  },
  {
    _id: 3,
    md: 9,
    componentProps: {
      name: 'access',
      row: false,
      options: accessDashboardOptions,
    },
    component: RHFRadioGroup,
  },
];
