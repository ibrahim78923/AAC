import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterInventory } from './useFilterInventory';
import CommonDrawer from '@/components/CommonDrawer';
// import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const FilterInventory = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    inventoryFilterFormFieldsData,
    // router,
    // theme,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
  } = useFilterInventory();

  // if ('isLoading') return <SkeletonForm />;
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
        okText="Submit"
        onClose={() => setIsDrawerOpen?.(false)}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitInventoryFilterForm)}
        >
          <Grid container spacing={2}>
            {inventoryFilterFormFieldsData?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={form.id}>
                  <form.component {...form.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form.componentProps.options.map((option: any) => (
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
