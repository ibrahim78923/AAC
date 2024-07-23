import { Avatar, Box, Typography } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import { LogoIcon } from '@/assets/icons';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';

export const companyColumns: any = (handleStatusUpdate: any) => [
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
