import { Button, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterSharedIcon } from '@/assets/icons';
import FormBuilder from '@/utils/FormBuilder';

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
              <FormBuilder formFields={filterFields} />
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};
