import { FormProvider } from '@/components/ReactHookForm';
import { Box, Divider } from '@mui/material';
import {
  LOCATION_TYPE,
  UPSERT_LOCATION_TITLE,
  addNewLocationDataFields,
} from './UpsertLocation.data';
import { useUpsertLocation } from './useUpsertLocation';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';

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
    handleSubmit,
    apiCallInProgress,
  } = useUpsertLocation();

  return (
    <>
      <PageTitledHeader
        title={
          !!childId
            ? UPSERT_LOCATION_TITLE?.EDIT_CHILD_LOCATION
            : !!parentId && type === LOCATION_TYPE?.PARENT
              ? UPSERT_LOCATION_TITLE?.EDIT_LOCATION
              : `Add new ${type} location`
        }
        canMovedBack
        moveBack={() => moveToLocationPage?.()}
      />
      <ApiRequestFlow showSkeleton={isLoading || isFetching}>
        <FormProvider methods={methods} onSubmit={handleSubmit(upsertLocation)}>
          <HeadingFormGrid formFieldsList={addNewLocationDataFields(type)} />
          <Divider sx={{ py: '0.5rem', mt: '2rem' }} />
          <Box display={'flex'} justifyContent={'flex-end'} pt={2} gap={1}>
            <LoadingButton
              variant="outlined"
              color="secondary"
              className="small"
              onClick={handleCancel}
              disabled={apiCallInProgress}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              disabled={apiCallInProgress}
              loading={apiCallInProgress}
              variant="contained"
              type="submit"
              className="small"
            >
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default UpsertLocation;
