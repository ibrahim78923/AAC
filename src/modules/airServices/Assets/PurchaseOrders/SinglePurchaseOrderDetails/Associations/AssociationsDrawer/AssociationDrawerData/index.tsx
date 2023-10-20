import { Grid } from '@mui/material';
import { DrawerTable } from './AssocitionDrawerTable';
import Search from '@/components/Search';

const AssociationsDrawerData = ({ setAssociateRequest }: any) => {
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
        <DrawerTable setAssociateRequest={setAssociateRequest} />
      </Grid>
    </Grid>
  );
};

export default AssociationsDrawerData;
