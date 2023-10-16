import { DeleteCrossIcon } from '@/assets/icons';
import EditShared from '@/assets/icons/shared/edit-shared';
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
      id: 'default',
      cell: (info: any) => info.getValue(),
      header: 'Default',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.productsSuite,
      id: 'owner',
      isSortable: true,
      header: 'Owner',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.planType,
      id: 'accessRights',
      isSortable: true,
      header: 'Access Rights',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.discount,
      id: 'lastViewed',
      isSortable: true,
      header: 'Last Viewed',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.defaultUsers,
      id: 'lastUpdated',
      isSortable: true,
      header: 'Last Updated',
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
          <EditShared />
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
