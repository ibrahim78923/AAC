import { FormProvider } from '@/components/ReactHookForm';
import { Box, Divider, Grid } from '@mui/material';
import { LOCATION_TYPE, addNewLocationDataFields } from './UpsertLocation.data';
import { useUpsertLocation } from './useUpsertLocation';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';

const UpsertLocation = () => {
  const {
    methods,
    moveToLocationPage,
    handleCancel,
    type,
    parentId,
    childId,
    isLoading,
    isFetching,
    upsertLocation,
    postLocationStatus,
    putLocationStatus,
    postChildLocationStatus,
  } = useUpsertLocation();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods?.handleSubmit(upsertLocation)}
      >
        <Grid container spacing={2}>
          <Grid item lg={9}>
            <PageTitledHeader
              title={
                !!childId
                  ? 'Edit child location'
                  : !!parentId && type === LOCATION_TYPE?.PARENT
                    ? 'Edit location'
                    : `Add new ${type} location`
              }
              canMovedBack
              moveBack={() => moveToLocationPage?.()}
            />
            <Grid item container xs={12} overflow="auto">
              <Grid container spacing={2}>
                {addNewLocationDataFields(type)?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
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
            className="small"
            onClick={handleCancel}
            disabled={
              postLocationStatus?.isLoading ||
              putLocationStatus?.isLoading ||
              postChildLocationStatus?.isLoading
            }
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            disabled={
              postLocationStatus?.isLoading ||
              putLocationStatus?.isLoading ||
              postChildLocationStatus?.isLoading
            }
            loading={
              postLocationStatus?.isLoading ||
              putLocationStatus?.isLoading ||
              postChildLocationStatus?.isLoading
            }
            variant="contained"
            type="submit"
            className="small"
          >
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};

export default UpsertLocation;
