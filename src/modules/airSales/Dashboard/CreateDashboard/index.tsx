import { Grid, useTheme, Button, Typography } from '@mui/material';
import CreateForm from './CreateForm';
import DetailsView from './DetailsView';

const CreateDashboard = ({ setIsShowCreateDashboardForm }: any) => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h4">Create Dashboard</Typography>
      <Grid container spacing={4} mt={2}>
        <Grid item sm={4}>
          <CreateForm />
        </Grid>

        <Grid item sm={8}>
          <DetailsView />
        </Grid>
      </Grid>
      <Grid container spacing={4} mt={0.4}>
        <Grid item sm={4}>
          <Button
            className="small"
            onClick={() => {
              setIsShowCreateDashboardForm(false);
            }}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              width: '112px',
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item sm={8} style={{ textAlign: 'end' }}>
          <Button
            className="small"
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              width: '112px',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px' }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default CreateDashboard;
