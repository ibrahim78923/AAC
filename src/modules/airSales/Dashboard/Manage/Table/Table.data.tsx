import { DeleteCrossIcon } from '@/assets/icons';
import { Box, Checkbox } from '@mui/material';

export const columns = (
  setIsDeleteModalOpen: any,
  isChecked: any,
  setIsChecked: any,
  isGetRowValues: any,
  setIsGetRowValues: any,
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
              isGetRowValues?.cell?.row?.original?.Id && isChecked
          }
          name={info.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIsChecked(!isChecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.clientName,
      id: 'clientName',
      cell: (info: any) => info.getValue(),
      header: 'Client Name',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.productsSuite,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.planType,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
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
    {
      id: 'actions',
      isSortable: true,
      header: 'Actions',
      cell: () => (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          <DeleteCrossIcon />
        </Box>
      ),
    },
  ];
};
export const ManageDashboardTableData: any = [
  {
    Id: 1,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },

  {
    Id: 2,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },

  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },
  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },
  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },
  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },
  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },

  {
    Id: 3,
    clientName: ` @olivia`,
    productsSuite: 'Draftstrtr',
    planType: 'Sharemydine',
    discount: 'Alee',
    defaultUsers: 'Tech Support',
    additionalUsers: 'Tech Support',
  },
];
