import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import React from 'react';

export const AllDealColumns = ({
  selectedRows,
  handleSelectSingleCheckBox,
  handleSelectAllCheckbox,
  isAllSelected,
}: {
  selectedRows: string[];
  handleSelectSingleCheckBox: (checked: boolean, id: string) => void;
  handleSelectAllCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
}) => {
  // const { activeColumns } = useDealTab();
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={selectedRows?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectSingleCheckBox(target?.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox onChange={handleSelectAllCheckbox} checked={isAllSelected} />
      ),
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.dealOwner,
      id: 'name',
      isSortable: true,
      header: 'Deal Owner',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar
            alt="Remy Sharp"
            // src={}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body4"
              sx={{ color: theme?.palette?.blue?.dull_blue }}
            >
              {info?.row?.original?.dealOwner?.name}
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.custom?.light, fontWeight: 400 }}
            >
              {info?.row?.original?.dealOwner?.email
                ? info?.row?.original?.dealOwner?.email
                : 'N/A'}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Deal Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      isSortable: true,
      header: 'Close Date',
      cell: ({ getValue }: any) =>
        dayjs(getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.amount,
      id: 'amount',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.dealStage,
      id: 'dealStage',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.dealPipeline,
      id: 'dealPipeline',
      isSortable: true,
      header: 'Deal Pipeline',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
