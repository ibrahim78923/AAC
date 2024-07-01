import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { DRAWER_TYPES } from '@/constants/strings';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setTicketRecord,
}: {
  setOpenDrawer: any;
  setIsOpenAlert: any;
  setTicketRecord: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.ticketIdNumber,
      id: 'ticketNumber',
      cell: (info: any) => info?.getValue(),
      header: 'Ticket No',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.subject,
      id: 'name',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Typography
          sx={{
            p: '4px 10px',
            borderRadius: '18px',
            border: '1px solid',
            width: 'fit-content',
          }}
        >
          {info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_TICKET]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer({ isToggle: true, type: DRAWER_TYPES?.VIEW });
                setTicketRecord(info?.row?.original);
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_TICKET]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert({ isToggle: true, data: info?.row?.original });
                setTicketRecord(info?.row?.original);
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
