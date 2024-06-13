import { DeleteCrossIcon, EditYellowBGPenIcon } from '@/assets/icons';

import { Box, Stack } from '@mui/material';

export const columnsHolidays = (
  setIsHolidayDrawerOpen: any,
  setOpenAlertModal: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.dates,
      id: 'dates',
      cell: (info: any) => info?.getValue(),
      header: 'Dates',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.names,
      id: 'names',
      cell: (info: any) => info?.getValue(),
      header: 'Names',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'action',
      cell: (
        <Stack direction="row" gap={1} alignItems="center">
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsHolidayDrawerOpen(true);
            }}
          >
            <EditYellowBGPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenAlertModal?.(true);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Stack>
      ),
      header: 'Action',
      isSortable: true,
    },
  ];
};

export const HolidaysData = [
  {
    id: '01',
    dates: '27/12/1998',
    names: 'Birthday Party',
  },
];
