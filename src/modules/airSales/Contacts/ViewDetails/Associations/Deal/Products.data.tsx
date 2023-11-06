import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { Box, MenuItem, Select } from '@mui/material';
import useProducts from './useProducts';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectStage, setSelectStage, selectPipline, setSelectPipline } =
    useProducts();
  return [
    {
      accessorFn: (row: any) => row.DealName,
      id: 'dealName',
      cell: (info: any) => info.getValue(),
      header: 'Deal Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row.Stage,
      id: 'Stage',
      isSortable: true,
      header: 'Stage',
      cell: () => (
        <Select
          value={selectStage}
          fullWidth
          size="small"
          onChange={(e) => {
            setSelectStage(e.target.value);
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
      accessorFn: (row: any) => row.Pipeline,
      id: 'Pipeline',
      isSortable: true,
      header: 'Pipeline',
      cell: () => (
        <Select
          value={selectPipline}
          fullWidth
          size="small"
          onChange={(e) => {
            setSelectPipline(e.target.value);
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
      accessorFn: (row: any) => row.CloseDate,
      id: 'CloseDate',
      isSortable: true,
      header: 'CloseDate',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.DealOwner,
      id: 'dealOwner',
      isSortable: true,
      header: 'Deal Owner',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.Amount,
      id: 'amount',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer('View')}>
            <ViewEyeIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer('Edit')}>
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setIsOpenAlert(true)}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
