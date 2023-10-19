import { styles } from './AddInventory.style';
import useEditInventory from './useAddInventory';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { editInventoryFields } from './AddInventory.data';
import FormBuilder from '@/hooks/FormBuilder';

const AddInventory = () => {
  const { methods, submit } = useEditInventory();
  const { mainWrapper, mainHeading, buttonWrapper } = styles();
  return (
    <Grid container rowSpacing={1.8} columnSpacing={2}>
      <Grid item lg={9}>
        <Box sx={mainWrapper}>
          <Typography variant="h4" sx={mainHeading}>
            Add New
          </Typography>
          <Grid item container xs={12} overflow="scroll">
            <FormProvider
              methods={methods}
              onSubmit={methods?.handleSubmit(submit)}
            >
              <Grid container rowSpacing={1.8} columnSpacing={3}>
                <FormBuilder formFields={editInventoryFields} />
              </Grid>
            </FormProvider>
          </Grid>
          <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
            <FormProvider methods={methods} onSubmit={() => {}}>
              <RHFDropZone name="file" />
            </FormProvider>
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
            onClick={submit}
            sx={{ paddingX: '25px' }}
          >
            Save
          </Button>
        </Box>
      </Grid>
      <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <FormProvider methods={methods} onSubmit={submit}>
          <RHFDropZone name="file" />
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default AddInventory;
