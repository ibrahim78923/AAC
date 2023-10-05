import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { data, columns } from './Inventory.mock';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';

import { styles } from './Inventory.style';

function Inventory() {
  const [meetingsData, setMeetingsData] = useState([]);

  return (
    <Grid container>
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button sx={styles.buttonStyle} variant="outlined" disabled>
              Delete
            </Button>
            <Button
              sx={styles.buttonStyle}
              variant="outlined"
              startIcon={<CustomizeSharedIcon />}
            >
              Customize
            </Button>
            <Button
              sx={styles.buttonStyle}
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

export default Inventory;
