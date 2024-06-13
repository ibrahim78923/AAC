import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import { useHolidayDrawer } from './useHolidayDrawer';
import { transactionFilterData } from './HolidayDrawer.data';

export const HolidayDrawer = (props: any) => {
  const {
    handleCloseDrawer,
    methods,
    handleSubmit,
    onSubmit,
    isHolidayDrawerOpen,
  } = useHolidayDrawer(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isHolidayDrawerOpen}
        onClose={handleCloseDrawer}
        title={'Add Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {transactionFilterData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
