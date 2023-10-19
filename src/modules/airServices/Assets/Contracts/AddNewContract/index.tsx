import { Box, Button, Grid } from '@mui/material';
import ContractDetails from './ContractDetails';
import { enqueueSnackbar } from 'notistack';
import { useDetailForm } from './useDetailForm';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useRouter } from 'next/router';
import { styles } from '../Contracts.style';

const AddNewContract = () => {
  const router = useRouter();
  const { methodsContractForm } = useDetailForm();
  const handleSubmitForm = methodsContractForm.handleSubmit(async () => {
    enqueueSnackbar('New Contract form submit successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    methodsContractForm.reset();
    router.push('/air-services/assets/contracts');
  });
  const handleContractClick = () => {
    router.push('/air-services/assets/contracts');
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={9}>
          <Box sx={styles.parentBoxAddContract}>
            <ContractDetails
              SubmitForm={handleSubmitForm}
              methods={methodsContractForm}
              handleSubmit={methodsContractForm.handleSubmit}
            />
            <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
              <FormProvider methods={methodsContractForm} onSubmit={() => {}}>
                <RHFDropZone name="file" />
              </FormProvider>
            </Box>
          </Box>
          <Box sx={styles.childBoxAddContract}>
            <Button
              sx={styles.cancelButtonAddContract}
              onClick={handleContractClick}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitForm}
              sx={{ padding: '25px' }}
            >
              Save
            </Button>
          </Box>
        </Grid>
        <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <FormProvider
            methods={methodsContractForm}
            onSubmit={handleSubmitForm}
          >
            <RHFDropZone name="file" />
          </FormProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewContract;
