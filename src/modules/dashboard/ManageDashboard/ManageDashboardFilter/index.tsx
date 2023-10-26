import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import FormBuilder from '@/utils/FormBuilder';

export const ManageDashboardFilter = (props: any) => {
  const {
    methods,
    isDrawerOpen,
    filterFields,
    handleSubmit = () => {},
    handleReset,
  } = props;

  return (
    <>
      {isDrawerOpen && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={handleReset}
          okText={'apply'}
          title={'Filters'}
          submitHandler={handleSubmit}
          isOk={true}
          cancelText={'Cancel'}
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
