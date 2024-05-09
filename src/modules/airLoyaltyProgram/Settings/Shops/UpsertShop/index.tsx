import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { useUpsertShopModal } from './useUpsertShop';
import { FormProvider } from '@/components/ReactHookForm';
import { UPSERT_SHOP_FORM_CONSTANT } from '@/constants/strings';
import { Attachments } from '@/components/Attachments';
import { AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

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
        okText={
          isPortalOpen?.data?._id
            ? UPSERT_SHOP_FORM_CONSTANT?.EDIT
            : UPSERT_SHOP_FORM_CONSTANT?.SUBMIT
        }
        title={
          isPortalOpen?.data?._id
            ? UPSERT_SHOP_FORM_CONSTANT?.UPDATE_SHOP
            : UPSERT_SHOP_FORM_CONSTANT?.NEW_SHOP
        }
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
        {!!isPortalOpen?.data?._id && (
          <>
            <Typography
              variant="body1"
              fontWeight={500}
              color="slateBlue.main"
              mb={2}
            >
              {' '}
              Attachments{' '}
            </Typography>
            <Box maxHeight={'20vh'}>
              <Attachments
                recordId={isPortalOpen?.data?._id}
                permissionKey={[
                  AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.EDIT_SHOP,
                ]}
                colSpan={{ sm: 12, lg: 12 }}
              />
            </Box>
          </>
        )}
      </CommonDrawer>
    </>
  );
};

export default UpsertShop;
