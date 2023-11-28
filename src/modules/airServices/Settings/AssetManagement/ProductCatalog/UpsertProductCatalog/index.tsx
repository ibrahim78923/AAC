import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProductCatalog } from './useUpsertProductCatalog';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';

export const UpsertProductCatalog = () => {
  const {
    router,
    handleSubmit,
    methods,
    upsertProductCatalogFormFields,
    submitUpsertProductCatalog,
    productCatalogId,
  } = useUpsertProductCatalog();

  return (
    <Box mt={1}>
      <PageTitledHeader
        title={!!productCatalogId ? 'Edit Product' : 'Add Product'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: !!!productCatalogId
              ? AIR_SERVICES?.PRODUCT_CATALOG_SETTINGS
              : AIR_SERVICES?.SINGLE_PRODUCT_CATALOG,
            query: {
              ...router?.query,
            },
          })
        }
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
            <LoadingButton variant="outlined" type="button" color="secondary">
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
