import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertWorkloadSchedule } from './useUpsertWorkloadSchedule';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

export const UpsertWorkloadSchedule = () => {
  const {
    handleSubmit,
    method,
    submitWorkloadSchedule,
    workloadScheduleId,
    upsertWorkloadScheduleFormFields,
    apiCallInProgress,
    showLoader,
    moveBack,
    isError,
    refetch,
  } = useUpsertWorkloadSchedule();

  return (
    <>
      <PageTitledHeader
        title={`${
          !!workloadScheduleId
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Scheduled Form`}
        canMovedBack
        moveBack={moveBack}
      />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(submitWorkloadSchedule)}
        >
          <HeadingFormGrid formFieldsList={upsertWorkloadScheduleFormFields} />
          <ActionsLoadingButton
            submitButtonText={
              !!workloadScheduleId
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
            }
            showSubmitLoader={apiCallInProgress}
            handleCancelButton={moveBack}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
