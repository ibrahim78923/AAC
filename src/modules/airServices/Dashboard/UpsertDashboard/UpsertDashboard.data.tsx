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
import {
  SpecialUsersFieldsI,
  UpsertServicesDashboardDefaultValueI,
} from './UpsertDashboard.interface';
import { RecentActivities } from '../RecentActivities';
import { TopPerformer } from '../TopPerformer';
import { Announcement } from '../Announcement';
import { AgentAvailability } from '../AgentAvailability';
import { TicketBased } from '../TicketBased';
import { SpecificUsers } from './SpecificUsers';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../Dashboard.data';

const { SERVICES_DASHBOARD_NAME_MAX_CHARACTERS } = CHARACTERS_LIMIT;

export const SERVICES_DASHBOARD_WIDGETS: any = {
  TICKETS_OVERVIEW_BY_STATE_AND_STATUS: 'TICKETS_OVERVIEW_BY_STATE_AND_STATUS',
  GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS:
    'GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS',
  RECENT_ACTIVITIES: 'RECENT_ACTIVITIES',
  AGENT_AVAILABILITY: 'AGENT_AVAILABILITY',
  TOP_PERFORMER: 'TOP_PERFORMER',
  ANNOUNCEMENTS: 'ANNOUNCEMENTS',
};

export const SERVICES_DASHBOARD_WIDGETS_API_MAPPED = {
  [SERVICES_DASHBOARD_WIDGETS?.TICKETS_OVERVIEW_BY_STATE_AND_STATUS]:
    'Tickets Overview by Status',
  [SERVICES_DASHBOARD_WIDGETS?.GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS]:
    'Tickets by Statuses and Priority',
  [SERVICES_DASHBOARD_WIDGETS?.RECENT_ACTIVITIES]: 'Recent Activities',
  [SERVICES_DASHBOARD_WIDGETS?.AGENT_AVAILABILITY]: 'Agent Availability',
  [SERVICES_DASHBOARD_WIDGETS?.TOP_PERFORMER]: 'Top Performer',
  [SERVICES_DASHBOARD_WIDGETS?.ANNOUNCEMENTS]: 'Announcements',
};

export const dashboardWidgetsData = [
  {
    value:
      SERVICES_DASHBOARD_WIDGETS?.GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS,
    label:
      SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[
        SERVICES_DASHBOARD_WIDGETS?.GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS
      ],
  },
  {
    value: SERVICES_DASHBOARD_WIDGETS?.RECENT_ACTIVITIES,
    label:
      SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[
        SERVICES_DASHBOARD_WIDGETS?.RECENT_ACTIVITIES
      ],
  },
  {
    value: SERVICES_DASHBOARD_WIDGETS?.AGENT_AVAILABILITY,
    label:
      SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[
        SERVICES_DASHBOARD_WIDGETS?.AGENT_AVAILABILITY
      ],
  },
  {
    value: SERVICES_DASHBOARD_WIDGETS?.TOP_PERFORMER,
    label:
      SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[
        SERVICES_DASHBOARD_WIDGETS?.TOP_PERFORMER
      ],
  },
  {
    value: SERVICES_DASHBOARD_WIDGETS?.ANNOUNCEMENTS,
    label:
      SERVICES_DASHBOARD_WIDGETS_API_MAPPED?.[
        SERVICES_DASHBOARD_WIDGETS?.ANNOUNCEMENTS
      ],
  },
];

export const AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS = {
  [SERVICES_DASHBOARD_WIDGETS?.GRAPHICAL_REPRESENTATION_OF_TICKETS_BY_STATUS]:
    TicketBased,
  [SERVICES_DASHBOARD_WIDGETS?.RECENT_ACTIVITIES]: RecentActivities,
  [SERVICES_DASHBOARD_WIDGETS?.AGENT_AVAILABILITY]: AgentAvailability,
  [SERVICES_DASHBOARD_WIDGETS?.TOP_PERFORMER]: TopPerformer,
  [SERVICES_DASHBOARD_WIDGETS?.ANNOUNCEMENTS]: Announcement,
};

export const createDashboardValidationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.trim()
      ?.required('Name is required')
      ?.max(
        SERVICES_DASHBOARD_NAME_MAX_CHARACTERS,
        `Maximum limit is ${SERVICES_DASHBOARD_NAME_MAX_CHARACTERS}`,
      ),
    access: Yup?.string()?.required('Access is required'),
    reports: Yup?.array(),
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
};

export const filterAndConcatWidgets = (
  arrayToFilter: any,
  arrayToConcat: any,
) => {
  const widgetValuesSet = new Set(
    arrayToFilter
      ?.filter((item: any) => item?.type === REPORT_TYPES?.STATIC)
      ?.map((obj: any) => obj?.name),
  );
  const filteredArrayToConcat = arrayToConcat?.filter(
    (obj: any) => !widgetValuesSet?.has(obj?.value),
  );

  const mapAsOptions = arrayToFilter
    ?.filter((item: any) => item?.type === REPORT_TYPES?.STATIC)
    ?.map((item: any) => ({
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
          ?.filter((item: any) => item?.type === REPORT_TYPES?.STATIC)
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
    permissions:
      data?.access === MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE
        ? data?.permissions
        : '',
    dashboardWidgets: data?.reports?.length
      ? filterAndConcatWidgets(data?.reports, dashboardWidgetsData)
      : dashboardWidgetsData,
  };
};

export const upsertServiceDashboardFormFieldsDynamic = (
  fields: SpecialUsersFieldsI[],
) => [
  {
    id: 1,
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
    id: 2,
    componentProps: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2,
    },
    heading: (
      <>
        <Typography variant="h6" fontWeight={600} color="slateblue.main">
          Who can access this dashboard?
          <Typography color={'error.main'} component="span">
            *
          </Typography>
        </Typography>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_DASHBOARD_PERMISSIONS?.SET_DEFAULT_DASHBOARD,
          ]}
        >
          <RHFSwitch name="isDefault" label="Set as default" />
        </PermissionsGuard>
      </>
    ),
    component: Box,
  },
  {
    id: 3,
    md: 9,
    componentProps: {
      name: 'access',
      row: false,
      options: [
        {
          value: MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER,
          label: 'Private to owner',
        },
        {
          value: MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE,
          label: 'Everyone',
          filter: (
            <Box px={3}>
              <RHFRadioGroup
                name="permissions"
                row={false}
                options={[
                  {
                    value:
                      MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW,
                    label: 'Everyone can edit and view',
                  },
                  {
                    value: MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_ONLY_VIEW,
                    label: 'Everyone can view',
                  },
                ]}
              />
            </Box>
          ),
        },
        {
          value: MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
          label: 'Only Specific users',
          filter: <SpecificUsers fields={fields} />,
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
