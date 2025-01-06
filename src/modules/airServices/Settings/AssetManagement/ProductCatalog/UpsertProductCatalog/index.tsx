import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProductCatalog } from './useUpsertProductCatalog';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

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

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
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
        <Grid container spacing={2}>
          {upsertProductCatalogFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
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
  );
};
