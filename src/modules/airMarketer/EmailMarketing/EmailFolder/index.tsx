import { Button, Grid, Typography } from '@mui/material';
import Folders from './Folders';
import { PlusIcon } from '@/assets/icons';
// import Search from '@/components/Search';
// import NewFolderActions from './NewFolderActions';

const EmailFolder = () => {
  return (
    <Grid container>
      <Grid item lg={6}>
        <Typography variant="h4">All Emails</Typography>
      </Grid>
      <Grid item lg={6} sx={{ textAlign: 'end' }}>
        <Button variant="contained" className="small">
          <PlusIcon /> &nbsp; Create New Folder
        </Button>
      </Grid>
      {/* <Grid item lg={6} mt={4}>
        <Search label="Search Here" width="260px" size="small" />
      </Grid> */}
      {/* <Grid item lg={6} mt={4} sx={{ textAlign: 'end' }}>
        <NewFolderActions />
      </Grid> */}
      <Grid item xs={12}>
        <Folders />
      </Grid>
    </Grid>
  );
};
export default EmailFolder;
