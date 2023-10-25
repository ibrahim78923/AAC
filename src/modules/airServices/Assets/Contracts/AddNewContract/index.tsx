import { Box, Button, Grid } from '@mui/material';
import AddNewContractDetail from './AddNewContract';
import { useAddNewContractForm } from './useAddNewContractForm';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { styles } from '../Contracts.style';

const AddNewContract = () => {
  const { methodsAddNewContract, handleSubmitForm, handleContractClick }: any =
    useAddNewContractForm();

  return (
    <>
      <FormProvider
        methods={methodsAddNewContract}
        onSubmit={methodsAddNewContract.handleSubmit(handleSubmitForm)}
      >
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Box sx={styles.parentBoxAddContract}>
              <AddNewContractDetail />
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name="file" />
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
          <Grid
            item
            md={3}
            xs={12}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <RHFDropZone name="file" />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default AddNewContract;
