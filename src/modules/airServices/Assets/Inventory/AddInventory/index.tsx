import { styles } from './AddInventory.style';
import useEditInventory from './useAddInventory';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { editInventoryFields } from './AddInventory.data';
import FormBuilder from '@/utils/FormBuilder';
import { useEffect } from 'react';

const AddInventory = () => {
  const { methods, submit, formType, setFormType, query } = useEditInventory();
  const { mainWrapper, mainHeading, buttonWrapper } = styles();

  useEffect(() => {
    setFormType(query?.type);
  }, [query?.update]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods?.handleSubmit(submit)}>
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item lg={9}>
            <Box sx={mainWrapper}>
              <Typography variant="h4" sx={mainHeading}>
                Add New
              </Typography>
              <Grid item container xs={12} overflow="scroll">
                <Grid container rowSpacing={1.8} columnSpacing={3}>
                  <FormBuilder formFields={editInventoryFields} />
                </Grid>
              </Grid>
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name="file" />
              </Box>
            </Box>
            <Box sx={buttonWrapper}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => methods?.reset()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ paddingX: '25px' }}
              >
                {formType || 'save'}
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RHFDropZone name="file" />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default AddInventory;
