import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterInventory } from './useFilterInventory';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';

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
        title="Filter"
        isDrawerOpen={isDrawerOpen}
        submitHandler={() => {
          handleSubmit?.(submitInventoryFilterForm)();
        }}
        cancelText="Reset"
        isOk
        footer
        okText="Submit"
        onClose={() => closeInventoryFilterForm?.()}
      >
        <br />
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitInventoryFilterForm)}
        >
          <Grid container spacing={2}>
            {inventoryFilterFormFieldsData?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                  <form.component {...form?.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form?.componentProps?.options?.map?.((option: any) => (
                          <option key={option?.id} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </form.component>
                </Grid>
              );
            })}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
