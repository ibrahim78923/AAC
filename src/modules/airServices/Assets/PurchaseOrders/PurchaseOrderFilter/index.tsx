import { Button, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterSharedIcon } from '@/assets/icons';
import { filterFields } from './PurchaseOrderFilter.data';

export const PurchaseOrderFilter = (props: any) => {
  const {
    methods,
    isDrawerOpen,
    setIsDrawerOpen,
    handleSubmit = () => {},
    handleReset,
    departmentDropdown,
    vendorDropdown,
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
          okText={'Apply'}
          title={'Filter'}
          submitHandler={handleSubmit}
          isOk={true}
          cancelText={'Reset'}
          footer
        >
          <FormProvider methods={methods}>
            <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
              {filterFields(departmentDropdown, vendorDropdown)?.map(
                (form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                ),
              )}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};
