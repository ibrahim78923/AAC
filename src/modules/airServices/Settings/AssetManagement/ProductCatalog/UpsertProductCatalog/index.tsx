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
        <Grid container spacing={4}>
          {upsertProductCatalogFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Box
          mt={4}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box></Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={2} alignItems={'center'}>
            <LoadingButton
              variant="outlined"
              type="button"
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
              disabled={
                patchProductCatalogStatus?.isLoading ||
                postProductCatalogStatus?.isLoading
              }
            >
              {!!productCatalogId ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
