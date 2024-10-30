import { Avatar, Box, Stack, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { capitalizeFirstLetters } from '@/utils';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { SwitchBtn } from '@/components/SwitchButton';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { generateImage } from '@/utils/avatarUtils';
import { DRAWER_TYPES } from '@/constants/strings';

export const columns: any = (columnsProps: any) => {
  const {
    setIsDeleteModalOpen,
    theme,
    router,
    handleUpdateDefault,
    currentUser,
  } = columnsProps;

  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Dashboard Name',
      cell: (info: any) => capitalizeFirstLetters(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.isDefault,
      id: 'isDefault',
      cell: (info: any) => (
        <SwitchBtn
          handleSwitchChange={(e: any) => {
            handleUpdateDefault(info?.row?.original?._id, e?.target?.checked);
          }}
          checked={
            currentUser === info?.row?.original?.createdBy && info?.getValue()
          }
        />
      ),
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
            src={generateImage(info?.getValue()?.avatar?.url)}
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
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router?.push({
                pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
                query: {
                  id: info?.row?.original?._id,
                  type: DRAWER_TYPES?.VIEW,
                  userId: currentUser,
                },
              });
            }}
          >
            <ViewEyeIcon />
          </Box>

          {(info?.row?.original?.permissions !== 'VIEW_ONLY' ||
            currentUser === info?.row?.original?.createdBy) && (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                router?.push({
                  pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
                  query: {
                    id: info?.row?.original?._id,
                    type: DRAWER_TYPES?.EDIT,
                    userId: currentUser,
                    mode: DRAWER_TYPES?.CREATE,
                  },
                });
              }}
            >
              <EditPenIcon />
            </Box>
          )}
          {currentUser === info?.row?.original?.createdBy &&
            !info?.row?.original?.isDefault && (
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
            )}
        </Stack>
      ),
    },
  ];
};
