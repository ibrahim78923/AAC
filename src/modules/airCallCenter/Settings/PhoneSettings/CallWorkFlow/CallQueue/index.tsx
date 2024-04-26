import { BackArrIcon } from '@/assets/icons';
import { Button, Grid, Stack, Typography } from '@mui/material';
import useCallQueue from './useCallQueue';
import { callQueueArray } from './CallQueue.data';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';

const CallQueue = () => {
  const {
    theme,
    methods,
    navigate,
    handleSubmit,
    onSubmit,
    // callerValue
  } = useCallQueue();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
        }}
      >
        <BackArrIcon />
        <Typography variant="h3">Call Queue</Typography>
      </Stack>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {callQueueArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ color: theme?.palette?.slateBlue?.main }}
                >
                  {item?.componentProps?.heading}
                </Typography>
              )}
              {item?.componentProps?.type === 'button' && (
                <Button sx={{ color: theme?.palette?.primary?.main }}>
                  Wait Queue Settings
                </Button>
              )}
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
          <Grid item sm={12}>
            <Stack direction={{ md: 'row' }} gap={1} justifyContent="end">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate?.push(AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default CallQueue;
