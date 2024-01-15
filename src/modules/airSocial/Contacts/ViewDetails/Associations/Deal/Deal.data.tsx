import { Box, MenuItem, Select } from '@mui/material';

import useDeal from './useDeal';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
export const columns = (handleOpenDrawer: any, handleOpenAlert: any) => {
  const { selectStage, setSelectStage, selectPipline, setSelectPipline } =
    useDeal('65a0d031282eeec22734c2ef');
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Deal Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.dealStageId,
      id: 'dealStageId',
      isSortable: true,
      header: 'Stage',
      cell: () => (
        <Select
          value={selectStage}
          fullWidth
          size="small"
          onChange={(e) => {
            setSelectStage(e?.target?.value);
          }}
        >
          <MenuItem value="val1" selected>
            value1
          </MenuItem>
          <MenuItem value="val2">value2</MenuItem>
          <MenuItem value="val3">value3</MenuItem>
        </Select>
      ),
    },

    {
      accessorFn: (row: any) => row?.dealPiplineId,
      id: 'dealPiplineId',
      isSortable: true,
      header: 'Pipeline',
      cell: () => (
        <Select
          value={selectPipline}
          fullWidth
          size="small"
          onChange={(e) => {
            setSelectPipline(e?.target?.value);
          }}
        >
          <MenuItem value="val1" selected>
            value1
          </MenuItem>
          <MenuItem value="val2">value2</MenuItem>
          <MenuItem value="val3">value3</MenuItem>
        </Select>
      ),
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      isSortable: true,
      header: 'CloseDate',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.ownerId,
      id: 'ownerId',
      isSortable: true,
      header: 'Deal Owner',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.amount,
      id: 'amount',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDrawer('View')}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDrawer('Edit')}
          >
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleOpenAlert(true)}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
