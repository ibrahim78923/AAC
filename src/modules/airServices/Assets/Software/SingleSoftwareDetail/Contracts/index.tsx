import { Box, Grid } from '@mui/material';
import { data, columns } from './Contracts.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { GreyPlusSharedIcon } from '@/assets/icons';
import { styles } from './Contracts.style';
import { useTheme } from '@emotion/react';

function Installations() {
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
              startIcon={<GreyPlusSharedIcon />}
            >
              Create New Contract
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '25px' }}>
          <TanstackTable data={data} columns={columns(theme)} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Installations;
