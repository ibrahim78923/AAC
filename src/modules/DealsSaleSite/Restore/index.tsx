import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { RestoreTableColumns, RestoreTableData } from './Restore.data';
import Layout from '@/layout';
import { BackArrIcon } from '@/assets/icons';
import Link from 'next/link';

const RestoreTable = () => {
  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', my: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={'/deals'}>
              <BackArrIcon />
            </Link>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1F2937',
                mx: '10px',
              }}
            >
              {' '}
              Restore Deals
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TanstackTable
            columns={RestoreTableColumns}
            data={RestoreTableData}
          />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Paper>
      </Box>
    </Layout>
  );
};

export default RestoreTable;
