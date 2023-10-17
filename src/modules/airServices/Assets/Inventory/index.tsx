import { Box, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { data, columns } from './Inventory.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';

import { styles } from './Inventory.style';

import AssetHead from '../AssetHead/index';

function Inventory() {
  const [meetingsData, setMeetingsData] = useState([]);
  const [searchValue, SetSearchValue] = useState<string>('');
  const theme: any = useTheme();

  return (
    <Grid container>
      <AssetHead title={'Assets'} addTitle={'Add'} show={true} />
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search
              label="search"
              width="100%"
              searchBy={searchValue}
              setSearchBy={SetSearchValue}
            />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button sx={styles.buttonStyle(theme)} variant="outlined" disabled>
              Delete
            </Button>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<CustomizeSharedIcon />}
            >
              Customize
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
            columns={columns(meetingsData, setMeetingsData, data, theme)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Inventory;
