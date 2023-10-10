import { Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';

import useManage from './useManage';
import Table from './Table';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

const Manage = () => {
  const { setIsOpenFilterDrawer, searchByName, setSearchByName } = useManage();

  return (
    <Grid container>
      <Grid item xs={6} sm={6}>
        <Typography variant="h4">Manage Dashboards</Typography>
      </Grid>
      <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
        <Button
          startIcon={<PlusSharedIcon />}
          variant="contained"
          className="medium"
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
    </Grid>
  );
};
export default Manage;
