import { Box, Checkbox } from '@mui/material';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?.id ===
              isGetRowValues?.cell?.row?.original?.id && ischecked
          }
          name={info?.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.getValue()}
          </Box>
          <Box>{info?.row?.original?.plan}</Box>
        </>
      ),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.billingAddress,
      id: 'billingAddress',
      isSortable: true,
      header: 'Billing Address',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.expirationDate,
      id: 'expirationDate',
      isSortable: true,
      header: 'expirationDate',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.product,
      id: 'product',
      isSortable: true,
      header: 'Product',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
