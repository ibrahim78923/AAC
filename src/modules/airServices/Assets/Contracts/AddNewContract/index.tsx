import { Box, Button, Grid } from '@mui/material';
import AddNewContractDetail from './AddNewContractDetail';
import { useAddNewContractDetailForm } from './useAddNewContractDetailForm';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { styles } from '../Contracts.style';

const AddNewContract = () => {
  const { methodsAddNewContract, handleSubmitForm, handleContractClick } =
    useAddNewContractDetailForm();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={9}>
          <Box sx={styles.parentBoxAddContract}>
            <AddNewContractDetail
              SubmitForm={handleSubmitForm}
              methods={methodsAddNewContract}
              handleSubmit={methodsAddNewContract.handleSubmit}
            />
            <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
              <FormProvider methods={methodsAddNewContract} onSubmit={() => {}}>
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
            methods={methodsAddNewContract}
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
