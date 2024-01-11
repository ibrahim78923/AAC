import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRequestersArray } from './UpsertRequesters.data';
import CommonDrawer from '@/components/CommonDrawer';
import { nanoid } from '@reduxjs/toolkit';

function UpsertRequesters({
  isDrawerOpen,
  title,
  okText,
  submitHandler,
  methods,
  handleClose
}: any) {
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        title={title}
        submitHandler={submitHandler}
        footer={true}
        isOk={true}
        okText={okText}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {upsertRequestersArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={nanoid()}>
                  <item.component {...item.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default UpsertRequesters;
