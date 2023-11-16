import { Box, Checkbox, Switch } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const columns = (
  setIsDeleteModalOpen: any,
  isChecked: any,
  setIsChecked: any,
  isGetRowValues: any,
  setIsGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original.Id ===
              isGetRowValues?.cell?.row?.original?.Id && isChecked
          }
          name={info?.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIsChecked(!isChecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.default,
      id: 'default',
      cell: () => <Switch defaultChecked />,
      header: 'Default',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.owner,
      id: 'owner',
      isSortable: true,
      header: 'Owner',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.accessRights,
      id: 'accessRights',
      isSortable: true,
      header: 'Access Rights',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.lastViewed,
      id: 'lastViewed',
      isSortable: true,
      header: 'Last Viewed',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.lastUpdated,
      id: 'lastUpdated',
      isSortable: true,
      header: 'Last Updated',
      cell: (info: any) => info?.getValue(),
    },

    {
      id: 'actions',
      isSortable: true,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ cursor: 'pointer' }} mr={1}>
            <ViewEyeIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} mr={1}>
            <EditPenIcon />
          </Box>

          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
export const ManageDashboardTableData: any = [
  {
    id: 1,
    default: true,
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 2,
    default: true,
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 3,
    default: true,
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 4,
    default: true,
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 5,
    default: true,
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
];
