import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilter } from './useFilter';
import { filterFields } from './Filter.data';

export const Filter = (props: any) => {
  const { isOpenFilterDrawer } = props;
  const { methods, handleSubmit, onSubmit, clearFilter, onClose, userList } =
    useFilter(props);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenFilterDrawer}
      onClose={() => onClose?.()}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Reset'}
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => clearFilter?.()}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
          {filterFields(userList)?.map((form: any) => (
            <Grid item xs={12} md={form?.gridLength} key={form?.id}>
              <form.component {...form?.componentProps} size="small" />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
