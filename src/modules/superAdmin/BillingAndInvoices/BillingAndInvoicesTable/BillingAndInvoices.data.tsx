import { AvatarImage } from '@/assets/images';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info.cell.row.original._id ===
              isGetRowValues?.cell?.row?.original?._id && ischecked
          }
          name={info.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.clientName,
      id: 'clientName',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2"> {info.getValue()}</Typography>
            <Typography variant="body3">
              {info.row.original.clientSub}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Client Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.plans?.description,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body3"> {info.getValue()}</Typography>
          <Typography variant="body3">
            {info?.row?.original?.planProduct?.name}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.plantypes,
      id: 'plantypes',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row?.planDiscount,
      id: 'planDiscount',
      isSortable: true,
      header: 'Discount',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row?.plans?.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default users',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.defaultStorage,
      id: 'DefaultStorage',
      isSortable: true,
      header: 'Default storage',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional storage',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.billingDate.substring(0, 10),
      id: 'billingDate',
      isSortable: true,
      header: 'Billing Date',
      cell: (info: any) => info.getValue(),
    },
  ];
};
