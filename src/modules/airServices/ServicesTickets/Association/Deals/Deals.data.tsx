import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const getAssociateDealsColumns: any = ({ setModalId }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Deal Name',
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.dealOwner,
      id: 'dealOwner',
      header: 'Deal Owner',
      isSortable: true,
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      header: 'Close Date',
      isSortable: true,
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DDMMYYY),
    },
    {
      accessorFn: (row: any) => row?.dealStage,
      id: 'dealStage',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => info?.getValue() ?? '-',
    },
    {
      accessorFn: (row: any) => row?.dealPipeline,
      id: 'dealPipeline',
      isSortable: true,
      header: 'Deal Pipeline',
      cell: (info: any) => info?.getValue() ?? '-',
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails._id,
      id: 'Action',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_ASSETS_DETAILS,
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
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_ASSETS,
              ]}
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
