import { Avatar, Box, Typography } from '@mui/material';
import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { IMG_URL } from '@/config';
import { convertIdToShortNumber } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/api';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setContactRecord,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setContactRecord: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'contact_id',
      isSortable: true,
      header: 'Contact ID',
      cell: (info: any) => convertIdToShortNumber(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={`${
              info?.row?.original?.profilePicture
                ? `${IMG_URL}${info?.row?.original?.profilePicture?.url}`
                : ''
            }`}
          />
          <Box>
            <Typography variant="body3" sx={{ color: '#111827' }}>
              {`${
                capitalizeFirstLetter(info?.row?.original?.firstName) ?? 'N/A'
              } ${capitalizeFirstLetter(info?.row?.original?.lastName) ?? ''}`}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.jobTitle,
      id: 'jobTitle',
      isSortable: true,
      header: 'Job Title ',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_CONTACT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDrawer('View'), setContactRecord(info?.row?.original);
              }}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_CONTACT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsOpenAlert(true), setContactRecord(info?.row?.original);
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
