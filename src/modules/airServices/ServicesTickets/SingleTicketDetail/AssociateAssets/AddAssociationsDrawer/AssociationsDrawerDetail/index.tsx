import { useState } from 'react';
import { Grid } from '@mui/material';
import Search from '@/components/Search';
import { DrawerTable } from './DrawerTable';

export const AssociationsDrawerDetail = () => {
  const [DrawerData, setDrawerData] = useState([]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Search
          label="Search"
          width="100%"
          searchBy=""
          setSearchBy={() => {}}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} mt={'16px'}>
        <DrawerTable DrawerData={DrawerData} setDrawerData={setDrawerData} />
      </Grid>
    </Grid>
  );
};
