import { Grid } from '@mui/material';
import { AssocitionsDrawerTable } from './AssocitionsDrawerTable';
import Search from '@/components/Search';

export const AssociationsDrawerData = ({ setAssociateRequest }: any) => {
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
        <AssocitionsDrawerTable setAssociateRequest={setAssociateRequest} />
      </Grid>
    </Grid>
  );
};
