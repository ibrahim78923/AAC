import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import { DATE_FORMAT } from '@/constants';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetter } from '@/utils/api';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setSelectedQuote,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedQuote: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'title',
      header: 'Title',
      isSortable: true,
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'create_date',
      isSortable: true,
      header: 'Create Date',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.isSubmitted,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (info?.getValue() === true ? 'Approved' : 'Pending'),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_QUOTE]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer('View'), setSelectedQuote(info?.row?.original);
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_QUOTE]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert(true), setSelectedQuote(info?.row?.original);
              }}
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};
