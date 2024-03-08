import { Box, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { LogoIcon } from '@/assets/icons';
import { IMG_URL } from '@/config';
import Image from 'next/image';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const companyData: any = [
  {
    Id: 1,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 2,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 3,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 4,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 5,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 6,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user',
  },
];

export const companyColumns: any = (handleStatusUpdate: any) => [
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {info?.getValue()?.logo ? (
          <Image
            src={`${IMG_URL}${info?.getValue()?.logo?.url}`}
            alt="product img missing"
            width={30}
            height={38}
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
    cell: (info: any) => (
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.ACTIVE_INACTIVE_ACCOUNTS,
        ]}
      >
        <SwitchBtn
          defaultChecked={
            info?.row?.original?.status === 'ACTIVE' ? true : false
          }
          handleSwitchChange={(val: any) =>
            handleStatusUpdate(info?.row?.original?._id, val?.target?.checked)
          }
        />
      </PermissionsGuard>
    ),
  },
];
