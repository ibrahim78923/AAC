import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertServices } from './useUpsertServices';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

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
        moveBack={() => handleCancelBtn()}
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormGrid formFieldsList={upsertServiceData} disabled={!!serviceId} />

          <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={1}>
            <LoadingButton
              color={'inherit'}
              variant={'outlined'}
              className={'small'}
              onClick={() => handleCancelBtn()}
              disabled={postAddServiceCatalogStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            {!!!serviceId && (
              <LoadingButton
                variant={'contained'}
                type={'submit'}
                className={'small'}
                loading={postAddServiceCatalogStatus?.isLoading}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
}
