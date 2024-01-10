import { Box, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { LogoIcon } from '@/assets/icons';
import Image from 'next/image';
import { IMG_URL } from '@/config';

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
    accessorFn: (row: any) => row?.company?.name,
    id: 'company',
    isSortable: true,
    header: 'Company',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.role?.name,
    id: 'manageRole',
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
      <SwitchBtn
        defaultChecked={info?.row?.original?.status === 'ACTIVE' ? true : false}
        handleSwitchChange={(val: any) =>
          handleStatusUpdate(info?.row?.original?._id, val?.target?.checked)
        }
      />
    ),
  },
];
