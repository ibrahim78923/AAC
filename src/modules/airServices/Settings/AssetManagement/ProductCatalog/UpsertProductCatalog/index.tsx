import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProductCatalog } from './useUpsertProductCatalog';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertProductCatalog = () => {
  const {
    handleSubmit,
    methods,
    upsertProductCatalogFormFields,
    submitUpsertProductCatalog,
    productCatalogId,
    moveBack,
    isLoading,
    isFetching,
    apiCallInProgress,
  } = useUpsertProductCatalog();

  return (
    <ApiRequestFlow showSkeleton={isLoading || isFetching}>
      <Box mt={1}>
        <PageTitledHeader
          title={!!productCatalogId ? 'Edit Product' : 'Add Product'}
          canMovedBack
          moveBack={() => moveBack?.()}
        />
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitUpsertProductCatalog)}
        >
          <FormGrid formFieldsList={upsertProductCatalogFormFields} />
          <ActionsLoadingButton
            submitButtonText={
              productCatalogId
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
            }
            showSubmitLoader={apiCallInProgress}
            handleCancelButton={moveBack}
          />
        </FormProvider>
      </Box>
    </ApiRequestFlow>
  );
};
