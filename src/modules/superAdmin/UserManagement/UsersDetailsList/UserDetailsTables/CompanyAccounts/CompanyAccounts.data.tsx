import { Avatar, Box, CircularProgress, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { LogoIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { generateImage } from '@/utils/avatarUtils';
import { PRODUCT_USER_STATUS } from '@/constants/strings';

export const companyColumns: any = (
  handleStatusUpdate: any,
  isLoadingStatus: any,
) => [
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => (
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
          {info?.getValue()?.name}
        </Typography>
      </Box>
    ),
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
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => {
      const rowId = info?.row?.original?._id;
      const isLoading = isLoadingStatus[rowId] ?? false;
      return isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <PermissionsGuard
          permissions={[
            SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.ACTIVE_INACTIVE_ACCOUNTS,
          ]}
        >
          <SwitchBtn
            defaultChecked={
              info?.row?.original?.status === PRODUCT_USER_STATUS?.ACTIVE
                ? true
                : false
            }
            handleSwitchChange={(val: any) =>
              handleStatusUpdate(info?.row?.original?._id, val?.target?.checked)
            }
          />
        </PermissionsGuard>
      );
    },
    // cell: (info: any) => (
    //   <PermissionsGuard
    //     permissions={[
    //       SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.ACTIVE_INACTIVE_ACCOUNTS,
    //     ]}
    //   >
    //     <SwitchBtn
    //       defaultChecked={
    //         info?.row?.original?.status === 'ACTIVE' ? true : false
    //       }
    //       handleSwitchChange={(val: any) =>
    //         handleStatusUpdate(info?.row?.original?._id, val?.target?.checked)
    //       }
    //     />
    //   </PermissionsGuard>
    // ),
  },
];
