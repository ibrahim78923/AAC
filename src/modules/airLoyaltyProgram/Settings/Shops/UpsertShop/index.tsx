import CommonDrawer from '@/components/CommonDrawer';
import { Grid } from '@mui/material';
import { useUpsertShopModal } from './useUpsertShop';
import { FormProvider } from '@/components/ReactHookForm';

const UpsertShop = (props: any) => {
  const { isPortalOpen } = props;

  const {
    method,
    submitUpsertShopForm,
    handleClose,
    handleSubmit,
    addShopStatus,
    upsertShopFormFields,
    editSingleShopStatus,
  } = useUpsertShopModal(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={handleClose}
        okText={isPortalOpen?.data?._id ? 'Edit' : 'Submit'}
        title={isPortalOpen?.data?._id ? 'Update Shop' : 'New Shop'}
        submitHandler={handleSubmit(submitUpsertShopForm)}
        isOk
        footer
        isLoading={addShopStatus?.isLoading || editSingleShopStatus?.isLoading}
        isDisabled={addShopStatus?.isLoading || editSingleShopStatus?.isLoading}
        disabledCancelBtn={
          addShopStatus?.isLoading || editSingleShopStatus?.isLoading
        }
      >
        <FormProvider methods={method}>
          <Grid container spacing={2}>
            {upsertShopFormFields?.map((form: any) => (
              <Grid item xs={12} key={form?._id}>
                <form.component {...form?.componentProps} size="small" />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default UpsertShop;
