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
import useManage from '@/modules/airSales/Dashboard/Manage/useManage';
import SoftwareFilter from './SoftwareFilter';
import SoftwareAssignCategory from './SoftwareAssignCategory';

function Software() {
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');

  const theme: any = useTheme();
  const { setIsOpenFilterDrawer, isOpenFilterDrawer } = useManage();

  return (
    <Grid container>
      <AssetHead title={'Software'} addTitle={'New Software'} />
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
              onClick={() => setIsOpenFilterDrawer(true)}
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

      {isOpenFilterDrawer && (
        <SoftwareFilter
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => setIsOpenFilterDrawer(false)}
        />
      )}

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
        title={'Assign Category'}
      />
    </Grid>
  );
}

export default Software;
