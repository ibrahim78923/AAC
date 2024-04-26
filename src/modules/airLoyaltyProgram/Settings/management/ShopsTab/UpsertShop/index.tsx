import { PlusIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { Button, Grid } from '@mui/material';
import { useUpsertShopModal } from './useUpsertShop';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertShopFields } from './UpsertShop.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const ShopModal = ({ addShopModalOpen, setAddShopModalOpen }: any) => {
  const {
    methodsUpsertShopModalForm,
    submitUpsertShopModalForm,
    handleClose,
    handleSubmit,
    shopStatus,
  } = useUpsertShopModal(setAddShopModalOpen);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.ADD_SHOP,
        ]}
      >
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={() => setAddShopModalOpen(true)}
        >
          Add
        </Button>
      </PermissionsGuard>
      {addShopModalOpen && (
        <CommonDrawer
          isDrawerOpen={addShopModalOpen}
          onClose={handleClose}
          okText={'Submit'}
          title={'New Shop'}
          submitHandler={handleSubmit(submitUpsertShopModalForm)}
          isOk={true}
          cancelText={'Cancel'}
          footer
          isLoading={shopStatus?.isLoading}
          isDisabled={shopStatus?.isLoading}
          disabledCancelBtn={shopStatus?.isLoading}
        >
          <FormProvider methods={methodsUpsertShopModalForm}>
            <Grid container gap={3.2}>
              {upsertShopFields?.map((form: any) => (
                <Grid item xs={12} key={form?._id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};

export default ShopModal;
