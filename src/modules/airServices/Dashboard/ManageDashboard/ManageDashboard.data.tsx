import { EditYellowBGPenIcon } from '@/assets/icons';
import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { DASHBOARD } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { AntSwitch } from '@/components/AntSwitch';
import dayjs from 'dayjs';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../CreateDashboard/CreateDashboard.data';
import {
  ManageDashboardIsPortalOpenI,
  ManageDashboardTableRowI,
} from './ManageDashboard.interface';
import { Dispatch, SetStateAction } from 'react';

export const MANAGE_ACCESS_TYPES_API_MAPPED = {
  [MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER]: 'Private to owner',
  [MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE]: 'Everyone',
  [MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS]: 'Specific user',
};

export const checkDashboardEditPermission = (data: any) => {
  if (
    data?.dashboardData?.access ===
    MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER
  )
    return data?.loggedInUser?._id === data?.dashboardData?.ownerDetails?._id;
  if (data?.loggedInUser?._id === data?.dashboardData?.ownerDetails?._id)
    return true;
  if (data?.dashboardData?.access === MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE)
    return (
      data?.dashboardData?.permissions ===
      MANAGE_DASHBOARD_ACCESS_TYPES?.EDIT_AND_VIEW
    );
  if (
    data?.dashboardData?.access ===
    MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS
  )
    return (
      data?.dashboardData?.specialUsers?.find(
        (user: any) => user?.userId === data?.loggedInUser?._id,
      )?.permission === MANAGE_DASHBOARD_ACCESS_TYPES?.EDIT_AND_VIEW
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
    cell: (info: any) => info?.getValue(),
    header: 'Dashboard Name',
    isSortable: true,
  },
  ...(overallPermissions?.includes(
    AIR_SERVICES_DASHBOARD_PERMISSIONS?.SET_DEFAULT_DASHBOARD,
  )
    ? [
        {
          accessorFn: (row: ManageDashboardTableRowI) => row?.isDefault,
          id: 'isDefault',
          isSortable: true,
          header: 'Default',
          cell: (info: any) => (
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_DASHBOARD_PERMISSIONS?.SET_DEFAULT_DASHBOARD,
              ]}
            >
              <AntSwitch
                checked={info?.getValue()}
                onChange={(e: any) =>
                  changeDefaultDashboard?.(e, info?.row?.original)
                }
                isLoading={
                  changeDefaultServicesDashboardStatus?.isLoading &&
                  changeDefaultServicesDashboardStatus?.originalArgs?.body
                    ?.id === info?.row?.original?._id
                }
                disabled={
                  user?._id !== info?.row?.original?.ownerDetails?._id ||
                  changeDefaultServicesDashboardStatus?.isLoading
                }
              />
            </PermissionsGuard>
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
      <Box display={'flex'} gap={2}>
        <Avatar src={generateImage(info?.getValue()?.avatar?.url)}>
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(
              info?.getValue()?.firstName,
              info?.getValue()?.lastName,
            )}
          </Typography>
        </Avatar>
        <Box>
          <Typography variant="body4" component={'div'} color="blue.dull_blue">
            {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
          </Typography>
          <Typography variant="body3" component={'div'} color="custom.light">
            {info?.getValue()?.email ?? '---'}
          </Typography>
        </Box>
      </Box>
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
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Updated',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: ManageDashboardTableRowI) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
          ]}
        >
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

        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.EDIT_DASHBOARD]}
        >
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

        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.DELETE_DASHBOARD]}
        >
          {user?._id === info?.row?.original?.ownerDetails?._id && (
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
