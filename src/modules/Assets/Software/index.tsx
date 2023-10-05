import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { data, columns } from './Software.mock';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import { styles } from './Software.style';

function Software() {
  const [meetingsData, setMeetingsData] = useState([]);

  return (
    <Grid container>
      <Grid item sx={styles.GridItems}>
        <Box sx={styles.HeadBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.ButtonBox}>
            <Button sx={styles.ButtonStyle} variant="outlined" disabled>
              Assign Category
            </Button>
            <Button
              sx={styles.ButtonStyle}
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

export default Software;
