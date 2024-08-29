import { Box } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { capitalizeFirstLetter } from '@/utils/api';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
}: {
  setOpenDrawer: any;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.orignalName,
      id: 'contact_id',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer({
                  isToggle: true,
                  type: 'View',
                  recData: info?.row?.original,
                });
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_EDIT_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer({
                  isToggle: true,
                  type: 'Edit',
                  recData: info?.row?.original,
                });
              }}
            >
              <EditPenIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert(true);
                setOpenDrawer({
                  isToggle: false,
                  type: '',
                  recData: info?.row?.original,
                });
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
