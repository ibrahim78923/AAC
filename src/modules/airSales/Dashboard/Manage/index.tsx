import { Box, Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';

import useManage from './useManage';
import Table from './Table';

import { ArrowLeft, FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';
import Filters from './Filters';
const Manage = ({ toggle, setIsShowCreateDashboardForm }: any) => {
  const {
    setIsOpenFilterDrawer,
    searchByName,
    setSearchByName,
    isOpenFilterDrawer,
  } = useManage();

  return (
    <Grid container>
      <Grid item xs={6} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Box mt={0.7} onClick={() => toggle()}>
            <ArrowLeft />
          </Box>
          <Typography variant="h4" sx={{ marginLeft: '15px' }}>
            Manage Dashboards
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
        <Button
          startIcon={<PlusSharedIcon />}
          variant="contained"
          className="medium"
          onClick={() => setIsShowCreateDashboardForm(true)}
        >
          Create Dashboard
        </Button>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={10} sm={10} mt={4}>
          <Search
            searchBy={searchByName}
            setSearchBy={setSearchByName}
            label="Search By Name"
            size="medium"
          />
        </Grid>

        <Grid item xs={1} sm={1} mt={4}>
          <Button
            onClick={() => setIsOpenFilterDrawer(true)}
            startIcon={<FilterSharedIcon />}
            sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
          >
            Filters
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Table />
      </Grid>
      {isOpenFilterDrawer && (
        <Filters
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => setIsOpenFilterDrawer(false)}
        />
      )}
    </Grid>
  );
};
export default Manage;
