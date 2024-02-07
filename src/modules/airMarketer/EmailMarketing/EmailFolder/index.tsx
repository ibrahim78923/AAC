import { Button, Grid, Typography } from '@mui/material';
import Folders from './Folders';
import { PlusIcon } from '@/assets/icons';

const EmailFolder = () => {
  return (
    <>
      <Grid container sx={{ px: 1 }}>
        <Grid item lg={6}>
          <Typography variant="h4">All Emails</Typography>
        </Grid>
        <Grid item lg={6} sx={{ textAlign: 'end' }}>
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
          >
            Create New Folder
          </Button>
        </Grid>
      </Grid>
      <Folders />
    </>
  );
};
export default EmailFolder;
