import { Grid } from '@mui/material';
import Search from '@/components/Search';
import { DrawerTable } from './DrawerTable';
import { useAssociationsDrawerDetail } from './useAssociationsDrawerDetail';

export const AssociationsDrawerDetail = () => {
  const { DrawerData, setDrawerData, theme } = useAssociationsDrawerDetail();

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
        <DrawerTable
          DrawerData={DrawerData}
          setDrawerData={setDrawerData}
          theme={theme}
        />
      </Grid>
    </Grid>
  );
};
