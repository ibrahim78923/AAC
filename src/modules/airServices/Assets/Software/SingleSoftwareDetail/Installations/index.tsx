import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Installations.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { ExportShared, GreyPlusSharedIcon } from '@/assets/icons';
import { styles } from './Installations.style';
import { useTheme } from '@emotion/react';

function Installations() {
  const [installationData, setInstallationData] = useState([]);
  const theme: any = useTheme();

  return (
    <Grid container>
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button sx={styles.buttonStyle(theme)} variant="outlined" disabled>
              Remove device
            </Button>
            <Button
              sx={styles.exportButtonStyle(theme)}
              variant="outlined"
              startIcon={<ExportShared />}
            >
              Export
            </Button>
            <Button
              sx={styles.exportButtonStyle(theme)}
              variant="outlined"
              startIcon={<GreyPlusSharedIcon />}
            >
              Add Devise
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '25px' }}>
          <TanstackTable
            data={data}
            columns={columns(
              installationData,
              setInstallationData,
              data,
              theme,
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Installations;
