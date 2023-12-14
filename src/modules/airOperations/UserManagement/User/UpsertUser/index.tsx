import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertUserArray } from './UpsertUser.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertUser } from './useUpsertUser';
import { USER_MANAGEMENT } from '@/constants/strings';

function UpsertUser({ isDrawerOpen, setIsDrawerOpen, title, okText }: any) {
  const { methods, handleSubmit, submit, disabled, setDisabled, userData } =
    useUpsertUser(setIsDrawerOpen);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title={title}
        submitHandler={() => {
          title === USER_MANAGEMENT?.USERVIEW && disabled
            ? setDisabled(false)
            : handleSubmit(submit)();
        }}
        footer={true}
        isOk={true}
        okText={
          title === USER_MANAGEMENT?.USERVIEW && disabled
            ? USER_MANAGEMENT?.EDIT
            : okText
        }
        cancelText={
          title === USER_MANAGEMENT?.USERVIEW && disabled
            ? USER_MANAGEMENT?.BACK
            : USER_MANAGEMENT?.CANCEL
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {upsertUserArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item?.subheading && title !== USER_MANAGEMENT?.USERVIEW && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {item?.subheading}
                    </Typography>
                  )}
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    disabled={title === USER_MANAGEMENT?.USERVIEW && disabled}
                    placeholder={
                      title === USER_MANAGEMENT?.USERVIEW &&
                      userData?.length > 0
                        ? (userData?.[0]?.[
                            item?.componentProps?.name
                          ] as string)
                        : item?.componentProps?.placeholder
                    }
                  />
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
