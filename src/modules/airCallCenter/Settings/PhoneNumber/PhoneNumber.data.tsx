import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteCrossIcon, EditYellowBGPenIcon } from '@/assets/icons';
import { AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION } from '@/constants/permission-keys';
import { Box, Stack, Typography } from '@mui/material';
export const phoneNumberData: any = (
  setIsDeleteModal: any,
  setIsEditNumberDrawer: any,
  theme: any,
) => [
  {
    number: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'} variant="body3">
            Azeem Aslam
          </Typography>
          <Typography component={'span'} variant="body3">
            +923059098767
          </Typography>
          <Typography component={'span'} variant="body3">
            Punjab, Pakistan
          </Typography>
        </Box>
      </Box>
    ),
    businessHours: (
      <Typography>
        During{' '}
        <Typography component="span" color={theme?.primary?.main}>
          24 * 7
        </Typography>
      </Typography>
    ),
    callActions: (
      <Typography>
        Send to{' '}
        <Typography component="span" color={theme?.primary?.main}>
          UK Support
        </Typography>
      </Typography>
    ),
    action: (
      <Stack direction="row" gap={1} alignItems="center">
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsEditNumberDrawer(true)}
        >
          <EditYellowBGPenIcon />
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION?.CHANNELS_PHONE_NUMBERS_DELETE,
          ]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsDeleteModal(true)}
          >
            <DeleteCrossIcon />
          </Box>
        </PermissionsGuard>
      </Stack>
    ),
  },
];

export const phoneNumberColumns: any = [
  {
    accessorFn: (row: any) => row?.number,
    id: 'number',
    cell: (info: any) => info?.getValue(),
    header: 'Number',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.businessHours,
    id: 'businessHours',
    isSortable: true,
    header: 'Business Hours',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.callActions,
    id: 'callActions',
    isSortable: true,
    header: 'Call Actions',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => info?.getValue(),
  },
];
