import { useState } from 'react';
import { Grid } from '@mui/material';
import { DrawerTable } from './DrawerTable';
import Search from '@/components/Search';

const AssociationsDrawerData = () => {
  const [DrawerData, setDrawerData] = useState([]);

  return (
    <Grid container>
      <Grid item xs={12} width={'100%'}>
        <Search
          label="Search"
          width="100%"
          searchBy=""
          setSearchBy={() => {}}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: '16px' }}>
        <DrawerTable DrawerData={DrawerData} setDrawerData={setDrawerData} />
      </Grid>
    </Grid>
  );
};

export default AssociationsDrawerData;
