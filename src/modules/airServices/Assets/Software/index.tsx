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
import SoftwareAssignCategory from './SoftwareAssignCategory';

function Software() {
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const theme: any = useTheme();

  return (
    <Grid container>
      <AssetHead title={'Software'} addTitle={'New Software'} />
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              disabled={!!!softwareData.length}
              onClick={() => {
                setOpenAssignModal(true);
              }}
            >
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
            columns={columns(softwareData, setSoftwareData, data, theme)}
          />
        </Box>
      </Grid>

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
      />
    </Grid>
  );
}

export default Software;
