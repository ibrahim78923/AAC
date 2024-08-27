import { Avatar, Box, Stack, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { capitalizeFirstLetters } from '@/utils';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { SwitchBtn } from '@/components/SwitchButton';
import { AIR_SALES } from '@/routesConstants/paths';

export const columns: any = (columnsProps: any) => {
  const { setIsDeleteModalOpen, theme, router } = columnsProps;
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Dashboard Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.isDefault,
      id: 'isDefault',
      cell: (info: any) => <SwitchBtn checked={info?.getValue()} />,
      header: 'Default',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.ownerDetails,
      id: 'owner',
      isSortable: true,
      header: 'Owner',
      cell: (info: any) => (
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            alt="Remy Sharp"
            sx={{
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {capitalizeFirstLetters(info?.getValue()?.firstName?.charAt(0))}
            {capitalizeFirstLetters(info?.getValue()?.lastName?.charAt(0))}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>
              {`${capitalizeFirstLetters(
                info?.getValue()?.firstName,
              )} ${capitalizeFirstLetters(info?.getValue()?.lastName)}`}
            </Typography>
            <Typography component={'span'}>
              {info?.getValue()?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Stack>
      ),
    },

    {
      accessorFn: (row: any) => row?.access,
      id: 'sharedWith',
      isSortable: true,
      header: 'Access Rights',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.lastView,
      id: 'lastViewed',
      isSortable: true,
      header: 'Last Viewed',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.updatedAt,
      id: 'updatedAt',
      isSortable: true,
      header: 'Last Updated',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },

    {
      id: 'actions',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => (
        <Stack direction="row" gap={1}>
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                router?.push({
                  pathname: `${AIR_SALES?.CREATE_DASHBOARD}`,
                  query: { id: info?.row?.original?._id },
                });
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router?.push({
                pathname: `${AIR_SALES?.CREATE_DASHBOARD}`,
                query: { id: info?.row?.original?._id },
              });
            }}
          >
            <EditPenIcon />
          </Box>
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.DELETE_DASHBOARD]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsDeleteModalOpen({
                  isToggle: true,
                  id: info?.row?.original?._id,
                });
              }}
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Stack>
      ),
    },
  ];
};
