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

export const MANAGE_ACCESS_TYPES_API_MAPPED = {
  [MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER]: 'Private to owner',
  [MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE]: 'Everyone',
  [MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS]: 'Specific user',
};

export const manageDashboardsDataColumnsDynamic = (
  setIsPortalOpen: any,
  changeDefaultDashboard: any,
  changeDefaultServicesDashboardStatus: any,
) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Dashboard Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.isDefault,
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
            changeDefaultServicesDashboardStatus?.originalArgs?.body?.id ===
              info?.row?.original?._id
          }
          disabled={
            info?.getValue() || changeDefaultServicesDashboardStatus?.isLoading
          }
        />
      </PermissionsGuard>
    ),
  },
  {
    accessorFn: (row: any) => row?.ownerDetails,
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
            {info?.getValue()?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.access,
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
    accessorFn: (row: any) => row?.lastView,
    id: 'lastView',
    isSortable: true,
    header: 'Last Viewed',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: any) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Updated',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: any) => row?.actions,
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
          <Link
            href={`${AIR_SERVICES?.CREATE_DASHBOARD}?action=${DASHBOARD?.EDIT}&dashboardId=${info?.row?.original?._id}`}
          >
            <EditYellowBGPenIcon />
          </Link>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.DELETE_DASHBOARD]}
        >
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
        </PermissionsGuard>
      </Box>
    ),
  },
];
