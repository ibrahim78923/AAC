import { EditYellowBGPenIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { DASHBOARD } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';
import { ManageDashboardTableRowI } from '../ManageDashboard/ManageDashboard.interface';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import {
  MANAGE_DASHBOARD_ACCESS_TYPES,
  SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT,
} from '../Dashboard.data';
import { UpdateDefaultDashboard } from '../UpdateDefaultDashboard';
import { uiDateFormat } from '@/lib/date-time';
import { MANAGE_ACCESS_TYPES_API_MAPPED } from '../ManageDashboard/ManageDashboard.data';
import { AIR_SERVICES } from '@/constants/routes';

const { PRIVATE_TO_OWNER, EVERYONE, SPECIFIC_USER_AND_TEAMS, EDIT_AND_VIEW } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

const {
  VIEW_MANAGE_DASHBOARD,
  DELETE_DASHBOARD: DELETE_DASHBOARD_PERMISSION,
  EDIT_DASHBOARD,
} = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

const { SINGLE_DASHBOARD_DETAILS, DELETE_DASHBOARD } =
  SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT ?? {};

export const checkDashboardEditPermission = (data: any) => {
  if (data?.dashboardData?.access === PRIVATE_TO_OWNER)
    return data?.loggedInUser === data?.dashboardData?.ownerDetails?._id;
  if (data?.loggedInUser === data?.dashboardData?.ownerDetails?._id)
    return true;
  if (data?.dashboardData?.access === EVERYONE)
    return data?.dashboardData?.permissions === EDIT_AND_VIEW;
  if (data?.dashboardData?.access === SPECIFIC_USER_AND_TEAMS)
    return (
      data?.dashboardData?.specialUsers?.find(
        (user: any) => user?.userId === data?.loggedInUser,
      )?.permission === EDIT_AND_VIEW
    );
  return false;
};

export const manageDashboardsListColumnsDynamic = (
  setAction: any,
  authUserId: any,
  canChangeDefaultDashboard: any,
) => [
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.name,
    id: 'name',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
    header: 'Dashboard Name',
    isSortable: true,
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.isDefault,
    id: 'isDefault',
    isSortable: true,
    header: 'Default',
    cell: (info: any) => (
      <UpdateDefaultDashboard
        currentId={info?.row?.original?._id}
        currentStatus={info?.getValue()}
        isAuthUserDashboard={
          authUserId !== info?.row?.original?.ownerDetails?._id
        }
        hasPermission={canChangeDefaultDashboard}
      />
    ),
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.ownerDetails,
    id: 'ownerDetails',
    header: 'Owner',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        nameInitial={fullNameInitial(
          info?.getValue()?.firstName,
          info?.getValue()?.lastName,
        )}
        email={info?.getValue()?.email ?? '---'}
        avatarSrc={info?.getValue()?.avatar?.url}
      />
    ),
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.access,
    id: 'access',
    isSortable: true,
    header: 'Access Rights',
    cell: (info: any) => (
      <Typography
        variant="body4"
        component={'div'}
        textTransform={'capitalize'}
      >
        {MANAGE_ACCESS_TYPES_API_MAPPED?.[info?.getValue()] ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.lastView,
    id: 'lastView',
    isSortable: true,
    header: 'Last Viewed',
    cell: (info: any) =>
      !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Updated',
    cell: (info: any) =>
      !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PermissionsGuard permissions={[VIEW_MANAGE_DASHBOARD]}>
          <VisibilityRoundedIcon
            sx={{ color: 'blue.main', cursor: 'pointer' }}
            onClick={() =>
              setAction(SINGLE_DASHBOARD_DETAILS, info?.row?.original)
            }
          />
        </PermissionsGuard>

        <PermissionsGuard permissions={[EDIT_DASHBOARD]}>
          {checkDashboardEditPermission?.({
            dashboardData: info?.row?.original,
            loggedInUser: authUserId,
          }) && (
            <Link
              href={`${AIR_SERVICES?.CREATE_DASHBOARD}?action=${DASHBOARD?.EDIT}&dashboardId=${info?.row?.original?._id}`}
            >
              <EditYellowBGPenIcon />
            </Link>
          )}
        </PermissionsGuard>
        <PermissionsGuard permissions={[DELETE_DASHBOARD_PERMISSION]}>
          {authUserId === info?.row?.original?.ownerDetails?._id &&
            !info?.row?.original?.isDefault && (
              <CancelRoundedIcon
                color="error"
                sx={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => setAction(DELETE_DASHBOARD, info?.row?.original)}
              />
            )}
        </PermissionsGuard>
      </Box>
    ),
  },
];
