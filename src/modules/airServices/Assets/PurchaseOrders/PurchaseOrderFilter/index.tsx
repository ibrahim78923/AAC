import { Button, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

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
          title={'Filter'}
          submitHandler={handleSubmit}
          isOk={true}
          cancelText={'Reset'}
          footer
        >
          <FormProvider methods={methods}>
            <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
              {filterFields?.map((form: any) => (
                <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                  <form.component {...form.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form?.componentProps?.options.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </form.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};
