import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { usePurchaseOrderFilter } from './usePurchaseOrderFilter';
import { purchaseOrderFilterFieldsDynamic } from './PurchaseOrderFilter.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export const PurchaseOrderFilter = (props: any) => {
  const { isDrawerOpen } = props;

  const {
    methods,
    submitPurchaseOrderFilterForm,
    handleSubmit,
    closePurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
  } = usePurchaseOrderFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closePurchaseOrderFilterForm?.()}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitPurchaseOrderFilterForm)()}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={() => resetPurchaseOrderFilterForm?.()}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={purchaseOrderFilterFieldsDynamic} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
