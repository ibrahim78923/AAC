import { PlusIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { Button, Grid } from '@mui/material';
import { useUpsertShopModal } from './useUpsertShop';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertShopFields } from './UpsertShop.data';

const ShopModal = ({ addShopModalOpen, setAddShopModalOpen }: any) => {
  const { methodsUpsertShopModalForm, submitUpsertShopModalForm, handleClose } =
    useUpsertShopModal(setAddShopModalOpen);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PlusIcon />}
        onClick={() => setAddShopModalOpen(true)}
      >
        Add
      </Button>
      {addShopModalOpen && (
        <CommonDrawer
          isDrawerOpen={addShopModalOpen}
          onClose={handleClose}
          okText={'Submit'}
          title={'New Shop'}
          submitHandler={submitUpsertShopModalForm}
          isOk={true}
          cancelText={'Cancel'}
          footer
        >
          <FormProvider methods={methodsUpsertShopModalForm}>
            <Grid container gap={3.2}>
              {upsertShopFields?.map((form: any) => (
                <Grid item xs={12} key={form?.id}>
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
