import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { IMG_URL } from '@/config';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setCompanyRecord,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setCompanyRecord: any;
}) => {
  const theme = useTheme();
  const index = 0;
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'contact_id',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={`${
              info?.row?.original ? `${IMG_URL}${info?.row?.original?.url}` : ''
            }`}
          />
          <Box>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.blue?.dull_blue }}
            >
              {info?.row?.original?.name}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.email}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Company Name',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.owner[index]?.phoneNumber,
      id: 'Phone Number',
      isSortable: true,
      header: ' Phone Number',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) =>
        `${row?.owner[index]?.firstName} ${row?.owner[index]?.lastName}`,
      id: 'owner',
      isSortable: true,
      header: 'Company Owner',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_COMPANY]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer('View'), setCompanyRecord(info?.row?.original);
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>

          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_COMPANY]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert(true), setCompanyRecord(info?.row?.original);
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
