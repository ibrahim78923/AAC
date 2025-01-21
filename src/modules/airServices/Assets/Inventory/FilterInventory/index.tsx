import { FormProvider } from '@/components/ReactHookForm';
import { useFilterInventory } from './useFilterInventory';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterInventoryI } from './FilterInventory.interface';
import { INVENTORY_TITLE } from '@/constants/strings';
import { FormGrid } from '@/components/Grids/FormGrid';

export const FilterInventory: React.FC<FilterInventoryI> = (props) => {
  const { isDrawerOpen } = props;
  const {
    inventoryFilterFormFieldsData,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
    resetInventoryFilterForm,
  } = useFilterInventory(props);
  return (
    <>
      <CommonDrawer
        title={INVENTORY_TITLE?.FILTER_INVENTORY}
        isDrawerOpen={isDrawerOpen}
        submitHandler={() => {
          handleSubmit?.(submitInventoryFilterForm)();
        }}
        cancelText={'Reset'}
        isOk
        footer
        okText={'Apply'}
        onClose={() => closeInventoryFilterForm?.()}
        cancelBtnHandler={() => resetInventoryFilterForm?.()}
      >
        <br />
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitInventoryFilterForm)}
        >
          <FormGrid formFieldsList={inventoryFilterFormFieldsData} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
