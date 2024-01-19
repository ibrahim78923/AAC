import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ArrowLeftIcon } from '@/assets/icons';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
import { styles } from './NewPurchaseOrder.style';
import { LoadingButton } from '@mui/lab';

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
  } = useNewPurchaseOrder();

  const { flexBetween, mainWrapper, mainHeading, subHeading } = styles();
  return (
    <Box>
      <Box sx={{ ...mainWrapper }}>
        <Box sx={{ ...flexBetween, display: 'inline-flex', pb: 1.4, gap: 1.4 }}>
          <Box
            onClick={handlePageBack}
            sx={{ ...flexBetween, cursor: 'pointer' }}
          >
            <ArrowLeftIcon />
          </Box>
          <Typography variant="h4" sx={mainHeading}>
            {purchaseOrderId ? 'Edit' : 'New'} Purchase Order
          </Typography>
        </Box>
        <FormProvider
          methods={methods}
          onSubmit={methods?.handleSubmit(submit)}
        >
          <Typography sx={{ ...subHeading, pb: 1 }}>
            Purchase Details
          </Typography>
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
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Grid>
            {vendorValue && (
              <Grid item xs={12} rowSpacing={2.6} columnSpacing={2}>
                <Box>
                  <Typography sx={{ ...subHeading }}>Items Details</Typography>
                  <ItemsDetails
                    control={methods?.control}
                    vendorId={vendorValue}
                    watch={watch}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <LoadingButton
              onClick={() => methods?.reset()}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={loadingStatus}
              type="submit"
              variant="contained"
            >
              {router?.query?.purchaseOrderId ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default NewPurchaseOrder;
