import { Box, Button, Grid, useTheme } from '@mui/material';
import ContractDetails from './ContractDetails';
import { enqueueSnackbar } from 'notistack';
import { useDetailForm } from './useDetailForm';

const index = () => {
  const theme = useTheme();
  const { methodsContractForm } = useDetailForm();
  const handleSubmitForm = async () => {
    enqueueSnackbar('Request for approval send successfully', {
      variant: 'success',
      autoHideDuration: 6000,
    });
    methodsContractForm.reset();
  };
  return (
    <>
      <Grid container justifyContent={'center'} spacing={3}>
        <Grid item lg={9}>
          <Box
            sx={{
              border: '2px solid #EAECF0',
              p: '20px',
              height: '90vh',
              mb: '10px',
            }}
          >
            <ContractDetails
              SubmitForm={handleSubmitForm}
              methods={methodsContractForm}
              handleSubmit={methodsContractForm.handleSubmit}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              mr: '20px',
            }}
          >
            <Button
              sx={{
                color: theme.palette.grey[500],
                border: '1px solid #E5E7EB',
                padding: '22px',
                fontWeight: '500',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitForm}
              sx={{ padding: '22px' }}
            >
              Save
            </Button>
          </Box>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </>
  );
};

export default index;
