import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertUserArray } from './UpsertUser.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertUser } from './useUpsertUser';

function UpsertUser({ isDrawerOpen, setIsDrawerOpen, title, okText }: any) {
  const { methods, handleSubmit, submit } = useUpsertUser(setIsDrawerOpen);

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
              {upsertUserArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item?.subheading && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {item?.subheading}
                    </Typography>
                  )}
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

export default UpsertUser;
