import { Button, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterSharedIcon } from '@/assets/icons';
import useFilter from './useFilter';
import { filterFieldsFunction } from './Filter.data';

export const Filter = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsFilterForm,
    submitFilterForm,
    resetFilterForm,
  } = useFilter();

  const filterFields = filterFieldsFunction();

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
          onClose={resetFilterForm}
          okText={'filter'}
          title={'Filter'}
          submitHandler={submitFilterForm}
          isOk={true}
          cancelText={'Reset'}
          footer
        >
          <FormProvider methods={methodsFilterForm}>
            <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
              {filterFields?.map((form: any) => (
                <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                  <form.component {...form?.componentProps} size="small">
                    {form?.componentProps?.select &&
                      form?.componentProps?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
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
