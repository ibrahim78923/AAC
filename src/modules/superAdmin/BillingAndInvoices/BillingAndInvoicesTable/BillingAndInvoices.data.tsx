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
            info.cell.row.original.Id ===
              isGetRowValues?.cell?.row?.original?.Id && ischecked
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
      accessorFn: (row: any) => row.clientName,
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
      accessorFn: (row: any) => row.productsSuite,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body3"> {info.getValue()}</Typography>
          <Typography variant="body3">
            {info.row.original.productSub}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.planType,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.PlanPricee,
      id: 'PlanPricee',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.discount,
      id: 'discount',
      isSortable: true,
      header: 'Discount',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default users',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => info.getValue(),
    },
  ];
};
