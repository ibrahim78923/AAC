import { Box, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { data, columns } from './PurchaseOrders.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, ExportShared } from '@/assets/icons';

import { styles } from './PurchaseOrders.style';

function PurchaseOrder() {
  const [meetingsData, setMeetingsData] = useState([]);
  const theme: any = useTheme();
  return (
    <Grid container>
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button
              sx={styles.exportButtonStyle(theme)}
              variant="outlined"
              startIcon={<ExportShared />}
            >
              Export
            </Button>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<FilterSharedIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '25px' }}>
          <TanstackTable
            data={data}
            columns={columns(meetingsData, setMeetingsData, data)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PurchaseOrder;
