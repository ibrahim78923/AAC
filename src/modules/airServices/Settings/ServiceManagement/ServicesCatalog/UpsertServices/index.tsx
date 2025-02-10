import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertServices } from './useUpsertServices';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export default function UpsertServices() {
  const {
    handleCancelBtn,
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceData,
    postAddServiceCatalogStatus,
    serviceId,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useUpsertServices();

  return (
    <>
      <PageTitledHeader
        title={`General Details`}
        canMovedBack
        moveBack={handleCancelBtn}
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormGrid formFieldsList={upsertServiceData} disabled={!!serviceId} />
          <ActionsLoadingButton
            submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
            showSubmitLoader={postAddServiceCatalogStatus?.isLoading}
            handleCancelButton={handleCancelBtn}
            disabledSubmitButton={!!serviceId}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
}
