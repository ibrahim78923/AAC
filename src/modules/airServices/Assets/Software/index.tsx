import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Software.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import { styles } from './Software.style';
import { useTheme } from '@emotion/react';
import AssetHead from '../AssetHead/index';
import { AddSoftwareDrawer } from './AddSoftwareDrawer';

function Software() {
  const [meetingsData, setMeetingsData] = useState([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const theme: any = useTheme();

  return (
    <Grid container>
      <AssetHead
        title={'Software'}
        addTitle={'New Software'}
        onClick={() => setIsAddDrawerOpen(true)}
      />
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button sx={styles.buttonStyle(theme)} variant="outlined" disabled>
              Assign Category
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
      <AddSoftwareDrawer
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
      />
    </Grid>
  );
}

export default Software;
