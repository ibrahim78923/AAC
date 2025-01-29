import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProductCatalog } from './useUpsertProductCatalog';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

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
    patchProductCatalogStatus,
    postProductCatalogStatus,
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 4,
            }}
          >
            <LoadingButton
              variant="outlined"
              type="button"
              className="small"
              onClick={() => moveBack?.()}
              color="secondary"
              disabled={
                patchProductCatalogStatus?.isLoading ||
                postProductCatalogStatus?.isLoading
              }
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              className="small"
              disabled={
                patchProductCatalogStatus?.isLoading ||
                postProductCatalogStatus?.isLoading
              }
              loading={
                patchProductCatalogStatus?.isLoading ||
                postProductCatalogStatus?.isLoading
              }
            >
              {!!productCatalogId ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </ApiRequestFlow>
  );
};
