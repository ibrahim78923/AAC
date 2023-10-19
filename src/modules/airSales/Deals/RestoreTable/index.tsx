import React from 'react';

import Link from 'next/link';

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  useTheme,
} from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { RestoreTableData } from '@/mock/modules/airSales/Deals/Restore';

import { RestoreTableColumns } from './RestoreTable.data';

import { BackArrIcon, FilterIcon } from '@/assets/icons';
import RestoreFilterDrawer from './RestoreFilterDrawer';
import useRestore from './useRestore';

const RestoreTable = () => {
  const theme = useTheme();
  const { handleRestoreFilter, isRestoreFilter } = useRestore();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          mb: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Link href={'/air-sales/deals'}>
            <BackArrIcon />
          </Link>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme.palette.grey[600] }}
            >
              Restore Deals
            </Typography>
            <Typography variant="body2">
              Restore Deals deleted in the last 90 days
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Select
            // value={actions}
            // onChange={handleActions}
            sx={{
              width: '140px',
              height: 30,
              fontSize: 14,
              color: theme.palette.custom['main'],
            }}
          >
            <MenuItem value={'actions'} selected disabled>
              Actions
            </MenuItem>
            <MenuItem value={'restore'}>Restore</MenuItem>
            <MenuItem value={'delete'}>Delete</MenuItem>
          </Select>
          <Button
            variant="outlined"
            sx={{ height: '30px', color: theme.palette.custom['main'] }}
            onClick={handleRestoreFilter}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
        </Box>
        <RestoreFilterDrawer
          open={isRestoreFilter}
          onClose={handleRestoreFilter}
        />
      </Box>

      <Paper sx={{ mb: 2 }}>
        <TanstackTable columns={RestoreTableColumns} data={RestoreTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
};

export default RestoreTable;
