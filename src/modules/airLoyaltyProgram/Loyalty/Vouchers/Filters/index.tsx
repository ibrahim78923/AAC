import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useFilters } from './useFilters';
import { filtersFormFieldsDataFunction } from './Filters.data';

export const Filters = (props: any) => {
  const {
    filtersOpen,
    handleSubmit,
    submitFiltersForm,
    methods,
    clearFilter,
    onClose,
  } = useFilters(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={filtersOpen}
        onClose={() => onClose?.()}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitFiltersForm)()}
        cancelBtnHandler={() => clearFilter?.()}
        isOk
        cancelText={'Reset'}
        footer
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitFiltersForm)}
        >
          <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
            {filtersFormFieldsDataFunction?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              );
            })}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
