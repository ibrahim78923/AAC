import { FormProvider } from '@/components/ReactHookForm';
import { useFilterInventory } from './useFilterInventory';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterInventoryI } from './FilterInventory.interface';
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
        title={'Filters'}
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
