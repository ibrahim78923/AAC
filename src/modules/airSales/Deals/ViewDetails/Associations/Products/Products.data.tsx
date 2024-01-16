import { Box, TextField } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setSelectedCheckboxes,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCheckboxes: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'product_name',
      cell: (info: any) => info?.getValue(),
      header: 'Product Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => (
        <TextField
          defaultValue={info?.getValue()}
          inputProps={{
            min: 1,
            max: 100,
          }}
          type="number"
          size="small"
          sx={{ width: '200px' }}
        />
      ),
    },

    {
      accessorFn: (row: any) => row?.amount,
      id: 'phonenumber',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View'), setSelectedCheckboxes(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('Edit'), setSelectedCheckboxes(info?.row?.original);
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenAlert(true), setSelectedCheckboxes(info?.row?.original);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
