import { Button, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterSharedIcon } from '@/assets/icons';

export const PurchaseOrderFilter = (props: any) => {
  const {
    methods,
    isDrawerOpen,
    setIsDrawerOpen,
    filterFields,
    handleSubmit = () => {},
    handleReset,
  } = props;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterSharedIcon />}
        color="secondary"
        onClick={() => setIsDrawerOpen(true)}
      >
        Filter
      </Button>
      {isDrawerOpen && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={handleReset}
          okText={'filter'}
          title={'filter'}
          submitHandler={handleSubmit}
          isOk={true}
          cancelText={'Reset'}
          footer
        >
          <FormProvider methods={methods}>
            <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
              {filterFields?.map((form: any) => {
                return (
                  <Grid item xs={12} md={form?.gridLength} key={form.id}>
                    <form.component {...form.componentProps} size="small">
                      {form?.componentProps?.select
                        ? form.componentProps.options.map((option: any) => (
                            <option key={option?.id} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : form?.heading
                        ? form?.heading
                        : null}
                    </form.component>
                  </Grid>
                );
              })}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};
