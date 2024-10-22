import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { fullName } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { DATE_TIME_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';
import { otherDateFormat } from '@/lib/date-time';

export const getAssociateDealsColumns: any = ({ setModalId }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Deal Name',
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.dealOwner,
      id: 'dealOwner',
      header: 'Deal Owner',
      isSortable: true,
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {fullName(
            info?.getValue()?.firstName?.toLowerCase(),
            info?.getValue()?.lastName?.toLowerCase(),
          )}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      header: 'Close Date',
      isSortable: true,
      cell: (info: any) =>
        info?.getValue()
          ? otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.DDMMYYY)
          : '---',
    },
    {
      accessorFn: (row: any) => row?.dealStage?.name,
      id: 'dealStage.name',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.dealPipeline?.name,
      id: 'dealPipeline.name',
      isSortable: true,
      header: 'Deal Pipeline',
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'Action',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_DEALS_DETAILS,
              ]}
            >
              <VisibilityRoundedIcon
                color={'secondary'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: true,
                    delete: false,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_DEALS]}
            >
              <CancelIcon
                color={'error'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: false,
                    delete: true,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
          </Box>
        );
      },
    },
  ];
};
