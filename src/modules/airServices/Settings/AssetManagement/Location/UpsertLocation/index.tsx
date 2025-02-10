import { FormProvider } from '@/components/ReactHookForm';
import { Divider } from '@mui/material';
import {
  LOCATION_TYPE,
  UPSERT_LOCATION_TITLE,
  addNewLocationDataFields,
} from './UpsertLocation.data';
import { useUpsertLocation } from './useUpsertLocation';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

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
        moveBack={moveToLocationPage}
      />
      <ApiRequestFlow showSkeleton={isLoading || isFetching}>
        <FormProvider methods={methods} onSubmit={handleSubmit(upsertLocation)}>
          <HeadingFormGrid formFieldsList={addNewLocationDataFields(type)} />
          <Divider sx={{ py: '0.5rem', mt: '2rem' }} />
          <ActionsLoadingButton
            submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
            showSubmitLoader={apiCallInProgress}
            handleCancelButton={handleCancel}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default UpsertLocation;
