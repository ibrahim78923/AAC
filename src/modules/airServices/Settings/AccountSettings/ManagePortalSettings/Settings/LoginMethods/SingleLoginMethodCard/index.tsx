import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { loginMethodsDataArray, timeoutDataArray } from '../LoginMethods.data';
import { FormProvider } from '@/components/ReactHookForm';
import ErrorIcon from '@mui/icons-material/Error';

export const SingleLoginMethodCard = (props: any) => {
  const { methods, theme, timeOut, timeOutMethods } = props;

  return (
    <FormProvider methods={methods}>
      {loginMethodsDataArray?.map((item: any) => (
        <>
          {item?.showAdmin ? (
            <Grid
              container
              key={item?._id}
              mt={3}
              display={'flex'}
              flexDirection={'column'}
              gap={1}
            >
              <Box display={'flex'} gap={1} alignItems={'center'}>
                <Typography variant="h5">{item?.text}</Typography>
                <Tooltip title={item?.toolTipMessage} arrow>
                  <ErrorIcon color="primary" />
                </Tooltip>
              </Box>
              <Grid item sm={12} lg={item?.gridLength}>
                <item.component {...item?.componentProps} />
              </Grid>
            </Grid>
          ) : (
            <>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                key={item?._id}
                p={1.5}
                bgcolor={theme?.palette?.grey?.[700]}
                borderRadius={2}
                mb={
                  timeOut && item?.componentProps?.name === 'sessionTimeout'
                    ? 0
                    : 1
                }
              >
                <Box display={'flex'} gap={1} alignItems={'center'}>
                  <Typography variant="h6">{item?.text}</Typography>
                  {item?.showIcon && (
                    <Tooltip title={item?.toolTipMessage}>
                      <ErrorIcon color="primary" />
                    </Tooltip>
                  )}
                </Box>
                <item.component {...item?.componentProps} />
              </Box>
              {timeOut && item?.componentProps?.name === 'sessionTimeout' && (
                <Grid
                  container
                  bgcolor={theme?.palette?.grey?.[100]}
                  flex={1}
                  mb={1}
                  p={2}
                  alignItems={'center'}
                >
                  <Typography variant="body1" mr={2}>
                    Timeout:
                  </Typography>
                  <FormProvider methods={timeOutMethods}>
                    <Grid container spacing={2}>
                      {timeoutDataArray?.map((item: any) => (
                        <Grid item key={item?.id} xs={5}>
                          <item.component {...item?.componentProps} />
                        </Grid>
                      ))}
                    </Grid>
                  </FormProvider>
                </Grid>
              )}
            </>
          )}
        </>
      ))}
    </FormProvider>
  );
};
