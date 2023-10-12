import { Box, Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Contracts.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, ExportShared } from '@/assets/icons';
import { styles } from './Contracts.style';
import AssetHead from '../AssetHead/index';
import ContractsDrawerForm from './ContractsDrawerForm';
import { useRouter } from 'next/router';

function Contracts() {
  const [meetingsData, setMeetingsData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme: any = useTheme();
  const router = useRouter();
  const handleAddNewContractClick = () => {
    router.push('/air-services/assets/contracts/new-contract');
  };
  return (
    <>
      <Grid container>
        <AssetHead
          title={'Contracts'}
          addTitle={'Add New Contract'}
          onClick={handleAddNewContractClick}
        />
        <Grid item sx={styles.gridItems}>
          <Box sx={styles.headBox}>
            <Box sx={{ marginLeft: '24px' }}>
              <Search label="search" width="100%" />
            </Box>
            <Box sx={styles.buttonBox}>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                disabled
              >
                Delete
              </Button>
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
                onClick={() => setIsDrawerOpen(true)}
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
      <Box>
        <ContractsDrawerForm
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </Box>
    </>
  );
}

export default Contracts;
