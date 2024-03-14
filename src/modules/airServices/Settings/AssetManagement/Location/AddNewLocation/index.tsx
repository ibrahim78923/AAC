import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { addNewLocationDataFields } from './AddNewLocation.data';
import { useAddNewLocation } from './useAddNewLocation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';

const AddNewLocation = () => {
  const {
    AddNewLocationMethods,
    onSubmit,
    moveToLocationPage,
    locationIsLoading,
    childLocationIsLoading,
    childOnsubmit,
    parentId,
    editOnSubmit,
    childEditOnSubmit,
    handleCancel,
    type,
  } = useAddNewLocation();
  let handleSubmit;
  if (type === 'parent-edit') {
    handleSubmit = editOnSubmit;
  } else if (type === 'child') {
    handleSubmit = childOnsubmit;
  } else if (type === 'child-edit') {
    handleSubmit = childEditOnSubmit;
  } else {
    handleSubmit = onSubmit;
  }
  return (
    <>
      <FormProvider
        methods={AddNewLocationMethods}
        onSubmit={AddNewLocationMethods?.handleSubmit(handleSubmit)}
      >
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item lg={9}>
            <Box display={'flex'} alignItems={'center'} gap={0.5} mb={1}>
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={moveToLocationPage}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4">New Location</Typography>
            </Box>
            <Grid item container xs={12} overflow="scroll">
              <Grid container rowSpacing={1.8} columnSpacing={3}>
                {addNewLocationDataFields(type)?.map(
                  (form: any, index: number) => (
                    <Grid
                      item
                      xs={12}
                      md={form?.gridLength}
                      key={form?.id}
                      sx={{
                        display:
                          (type === 'parent' || type === 'parent-edit') &&
                          index === 1
                            ? 'none'
                            : 'block',
                      }}
                    >
                      <form.component {...form?.componentProps} size="small">
                        {form?.heading ? form?.heading : null}
                      </form.component>
                    </Grid>
                  ),
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ py: '0.5rem', mt: '2rem' }} />
        <Box display={'flex'} justifyContent={'flex-end'} pt={2} gap={1} mr={2}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            disabled={parentId ? childLocationIsLoading : locationIsLoading}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};

export default AddNewLocation;
