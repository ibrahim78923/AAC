import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';

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
              {filterFields?.map((item: any) => (
                <Grid item xs={12} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.componentProps?.options?.map((option: any) => (
                        <option value={option?.value} key={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </CommonDrawer>
      )}
    </>
  );
};
