import { FormProvider } from '@/components/ReactHookForm';
import { Box, Divider, Grid } from '@mui/material';
import { addNewLocationDataFields } from './UpsertLocation.data';
import { useUpsertLocation } from './useUpsertLocation';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';

const UpsertLocation = () => {
  const {
    AddNewLocationMethods,
    moveToLocationPage,
    locationIsLoading,
    childLocationIsLoading,
    parentId,
    handleCancel,
    type,
    handleSubmit,
    isLoading,
    isFetching,
  } = useUpsertLocation();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <>
      <FormProvider
        methods={AddNewLocationMethods}
        onSubmit={AddNewLocationMethods?.handleSubmit(handleSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item lg={9}>
            <PageTitledHeader
              title={'New Location'}
              canMovedBack
              moveBack={() => moveToLocationPage?.()}
            />
            <Grid item container xs={12} overflow="scroll">
              <Grid container spacing={2}>
                {addNewLocationDataFields(type)?.map((form: any) => (
                  <Grid
                    item
                    xs={12}
                    md={form?.gridLength}
                    key={form?.id}
                    sx={{
                      display:
                        (type === 'parent' || type === 'parent-edit') &&
                        form?.componentProps?.name === 'parentLocation'
                          ? 'none'
                          : 'block',
                    }}
                  >
                    <form.component {...form?.componentProps} size="small">
                      {form?.heading ? form?.heading : null}
                    </form.component>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ py: '0.5rem', mt: '2rem' }} />
        <Box display={'flex'} justifyContent={'flex-end'} pt={2} gap={1} mr={2}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={parentId ? childLocationIsLoading : locationIsLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            disabled={parentId ? childLocationIsLoading : locationIsLoading}
            loading={parentId ? childLocationIsLoading : locationIsLoading}
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

export default UpsertLocation;
