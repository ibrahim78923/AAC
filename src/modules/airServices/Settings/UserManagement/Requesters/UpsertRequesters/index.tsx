import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRequestersArray } from './UpsertRequesters.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRequesters } from './useUpsertRequesters';

function UpsertRequesters({
  isDrawerOpen,
  setIsDrawerOpen,
  title,
  okText,
}: any) {
  const { methods, handleSubmit, submit } = useUpsertRequesters();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title={title}
        submitHandler={() => handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText={okText}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {upsertRequestersArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
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
