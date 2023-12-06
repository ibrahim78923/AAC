import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterInventory } from './useFilterInventory';
import CommonDrawer from '@/components/CommonDrawer';

export const FilterInventory = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    inventoryFilterFormFieldsData,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
  } = useFilterInventory(props);

  return (
    <>
      <CommonDrawer
        title="Filters"
        isDrawerOpen={isDrawerOpen}
        submitHandler={() => {
          handleSubmit?.(submitInventoryFilterForm)();
        }}
        cancelText="Reset"
        isOk
        footer
        okText="Apply"
        onClose={() => closeInventoryFilterForm?.()}
      >
        <br />
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitInventoryFilterForm)}
        >
          <Grid container spacing={2}>
            {inventoryFilterFormFieldsData?.map((form: any) => (
              <Grid item xs={12} key={form?.id}>
                <form.component {...form?.componentProps} size="small" />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
