import { EditYellowBGPenIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { DASHBOARD } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { AntSwitch } from '@/components/AntSwitch';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import {
  ManageDashboardIsPortalOpenI,
  ManageDashboardTableRowI,
} from './ManageDashboard.interface';
import { Dispatch, SetStateAction } from 'react';
import { uiDateFormat } from '@/utils/dateTime';
import { UserInfo } from '@/components/UserInfo';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../Dashboard.data';
import { TruncateText } from '@/components/TruncateText';

const { PRIVATE_TO_OWNER, EVERYONE, SPECIFIC_USER_AND_TEAMS, EDIT_AND_VIEW } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

const {
  SET_DEFAULT_DASHBOARD,
  DELETE_DASHBOARD,
  EDIT_DASHBOARD,
  VIEW_MANAGE_DASHBOARD,
} = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

export const MANAGE_ACCESS_TYPES_API_MAPPED = {
  [PRIVATE_TO_OWNER]: 'Private to owner',
  [EVERYONE]: 'Everyone',
  [SPECIFIC_USER_AND_TEAMS]: 'Specific user',
};

export const checkDashboardEditPermission = (data: any) => {
  if (data?.dashboardData?.access === PRIVATE_TO_OWNER)
    return data?.loggedInUser?._id === data?.dashboardData?.ownerDetails?._id;
  if (data?.loggedInUser?._id === data?.dashboardData?.ownerDetails?._id)
    return true;
  if (data?.dashboardData?.access === EVERYONE)
    return data?.dashboardData?.permissions === EDIT_AND_VIEW;
  if (data?.dashboardData?.access === SPECIFIC_USER_AND_TEAMS)
    return (
      data?.dashboardData?.specialUsers?.find(
        (user: any) => user?.userId === data?.loggedInUser?._id,
      )?.permission === EDIT_AND_VIEW
    );
  return false;
};

export const manageDashboardsDataColumnsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<ManageDashboardIsPortalOpenI>>,
  changeDefaultDashboard: (e: any, id: any) => void,
  changeDefaultServicesDashboardStatus: any,
  overallPermissions: any,
  user: any,
) => [
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.name,
    id: 'name',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
    header: 'Dashboard Name',
    isSortable: true,
  },
  ...(overallPermissions?.includes(SET_DEFAULT_DASHBOARD)
    ? [
        {
          accessorFn: (row: ManageDashboardTableRowI) => row?.isDefault,
          id: 'isDefault',
          isSortable: true,
          header: 'Default',
          cell: (info: any) => (
            <AntSwitch
              checked={info?.getValue()}
              onChange={(e: any) =>
                changeDefaultDashboard?.(e, info?.row?.original)
              }
              isLoading={
                changeDefaultServicesDashboardStatus?.isLoading &&
                changeDefaultServicesDashboardStatus?.originalArgs?.body?.id ===
                  info?.row?.original?._id
              }
              disabled={
                user?._id !== info?.row?.original?.ownerDetails?._id ||
                changeDefaultServicesDashboardStatus?.isLoading
              }
            />
          ),
        },
      ]
    : []),
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
              setIsPortalOpen({
                isOpen: true,
                isView: true,
                isDynamicPreview: true,
                data: info?.row?.original,
              })
            }
          />
        </PermissionsGuard>

        <PermissionsGuard permissions={[EDIT_DASHBOARD]}>
          {checkDashboardEditPermission?.({
            dashboardData: info?.row?.original,
            loggedInUser: user,
          }) && (
            <Link
              href={`${AIR_SERVICES?.CREATE_DASHBOARD}?action=${DASHBOARD?.EDIT}&dashboardId=${info?.row?.original?._id}`}
            >
              <EditYellowBGPenIcon />
            </Link>
          )}
        </PermissionsGuard>

        <PermissionsGuard permissions={[DELETE_DASHBOARD]}>
          {user?._id === info?.row?.original?.ownerDetails?._id &&
            !info?.row?.original?.isDefault && (
              <CancelRoundedIcon
                color="error"
                sx={{ fontSize: '24px', cursor: 'pointer' }}
                onClick={() =>
                  setIsPortalOpen({
                    isOpen: true,
                    isDelete: true,
                    data: info?.row?.original,
                  })
                }
              />
            )}
        </PermissionsGuard>
      </Box>
    ),
  },
];
