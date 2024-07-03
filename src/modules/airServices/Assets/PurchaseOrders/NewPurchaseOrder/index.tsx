import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';

const NewPurchaseOrder = () => {
  const {
    methods,
    submit,
    handlePageBack,
    newPurchaseFields,
    purchaseOrderId,
    vendorValue,
    router,
    loadingStatus,
    watch,
    singlePurchaseOrder,
  } = useNewPurchaseOrder();

  return (
    <Box>
      <Box>
        <PageTitledHeader
          title={`${
            purchaseOrderId
              ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
              : GENERIC_UPSERT_FORM_CONSTANT?.NEW
          }   Purchase Order`}
          canMovedBack
          moveBack={handlePageBack}
        />
        {singlePurchaseOrder?.isLoading ? (
          <SkeletonForm />
        ) : (
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit(submit)}
          >
            <Grid container rowSpacing={1.8}>
              <Grid
                item
                xs={12}
                lg={9}
                container
                rowSpacing={1.8}
                columnSpacing={3}
                mt={-1}
              >
                {newPurchaseFields?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small">
                      {form?.heading ? form?.heading : null}
                    </form.component>
                  </Grid>
                ))}
              </Grid>
              {vendorValue && (
                <Grid item xs={12} rowSpacing={2.6} columnSpacing={2}>
                  <Box>
                    <Typography variant="h5" color="slateBlue.main">
                      Items Details
                    </Typography>
                    <ItemsDetails
                      control={methods?.control}
                      vendorId={vendorValue}
                      watch={watch}
                      name="purchaseDetails"
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <LoadingButton
                onClick={handlePageBack}
                variant="outlined"
                color="secondary"
                disabled={loadingStatus}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={loadingStatus}
                type="submit"
                variant="contained"
              >
                {router?.query?.purchaseOrderId
                  ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                  : GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
              </LoadingButton>
            </Box>
          </FormProvider>
        )}
      </Box>
    </Box>
  );
};

export default NewPurchaseOrder;
