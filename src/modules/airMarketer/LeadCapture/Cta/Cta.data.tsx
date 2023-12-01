import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

import { Box, Checkbox } from '@mui/material';

export const columns = ({
  handleCheckboxChange,
  selectedCheckboxes,
  setOpenDrawer,
}: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={'name'}
          onChange={(event) => handleCheckboxChange(event, info?.row?.original)}
          checked={selectedCheckboxes?.some(
            (selectedItem: any) =>
              selectedItem?._id === info?.row?.original?._id,
          )}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.viewCount,
      id: 'viewCount',
      isSortable: true,
      header: 'View Count',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.clickRate,
      id: 'clickRate',
      isSortable: true,
      header: 'Click Rate(%)',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.clickCount,
      id: 'clickCount',
      isSortable: true,
      header: 'Clicks Count',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.lastModified,
      id: 'lastModified',
      isSortable: true,
      header: 'Last Modified',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View');
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('Edit');
            }}
          >
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};

export const ctAdata = [
  {
    name: 'Files 2',
    viewCount: '00',
    clickRate: '0%',
    clickCount: '00',
    lastModified: 'Mar 3 - Mar 26, 2022',
  },
];

export const exportData = [
  {
    value: 'CSV',
    label: 'CSV',
  },
  {
    value: 'XLS',
    label: 'XLS',
  },
  {
    value: 'PDF',
    label: 'PDF',
  },
];
