import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import { EditBlackIcon, LogoIcon } from '@/assets/icons';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import EditRoleModal from './EditRoleModal';
import { enqueueSnackbar } from 'notistack';

export const companyColumns: any = (
  handleStatusUpdate: any,
  isLoadingStatus: any,
  editRoleModal: any,
  setEditRoleModal: any,
  userAccountsList: any,
) => [
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {info?.getValue()?.logo ? (
            <Avatar
              src={generateImage(info?.getValue()?.logo?.url)}
              sx={{ width: 30, height: 30 }}
            />
          ) : (
            <LogoIcon />
          )}
          <Typography sx={{ fontSize: '12px' }}>
            {capitalizeFirstLetter(info?.getValue()?.name)}
          </Typography>
        </Box>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.company?.accountName,
    id: 'company',
    isSortable: true,
    header: 'Company',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.user[0]?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.role?.name,
    id: 'name',
    isSortable: true,
    header: 'Manage Roles',
    cell: (info: any) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Typography>{info?.getValue()}</Typography>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setEditRoleModal({ isOpen: true, data: info?.row?.original })
          }
        >
          <EditBlackIcon />
        </Box>
        <EditRoleModal
          editRoleModal={editRoleModal}
          setEditRoleModal={setEditRoleModal}
        />
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => {
      const rowId = info?.row?.original?._id;
      const isLoading = isLoadingStatus[rowId] ?? false;

      const exists = userAccountsList?.some(
        (account: any) => account?._id === info?.row?.original?.product?._id,
      );

      return isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <SwitchBtn
          handleSwitchChange={(e: any) => {
            if (exists) {
              handleStatusUpdate(rowId, e?.target?.checked);
            } else {
              enqueueSnackbar(
                'Product Subscription is Inactive or Not Subscribed',
                {
                  variant: 'error',
                },
              );
            }
          }}
          checked={
            info?.row?.original?.status === PRODUCT_USER_STATUS?.ACTIVE
              ? true
              : false
          }
        />
      );
    },
  },
];
