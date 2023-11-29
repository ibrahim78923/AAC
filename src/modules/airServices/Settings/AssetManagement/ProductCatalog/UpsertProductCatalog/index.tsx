import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProductCatalog } from './useUpsertProductCatalog';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const UpsertProductCatalog = () => {
  const {
    handleSubmit,
    methods,
    upsertProductCatalogFormFields,
    submitUpsertProductCatalog,
    productCatalogId,
    moveBack,
  } = useUpsertProductCatalog();

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
          mt={2}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box></Box>
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <LoadingButton
              variant="outlined"
              type="button"
              onClick={() => moveBack?.()}
              color="secondary"
            >
              Cancel
            </LoadingButton>
            <LoadingButton variant="contained" type="submit">
              {!!productCatalogId ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
