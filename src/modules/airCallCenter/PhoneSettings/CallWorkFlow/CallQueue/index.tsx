import { BackArrIcon } from '@/assets/icons';
import { Button, Grid, Stack, Typography } from '@mui/material';
import useCallQueue from './useCallQueue';
import { callQueueArray } from './CallQueue.data';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { PHONE_SETTINGS } from '@/routesConstants/paths';

const CallQueue = () => {
  const {
    methods,
    navigate,
    //  handleSubmit, onSubmit
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
          navigate?.push(PHONE_SETTINGS?.PHONE_SETTINGS_MAIN);
        }}
      >
        <BackArrIcon />
        <Typography variant="h3">Call Queue</Typography>
      </Stack>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {callQueueArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                  navigate?.push(PHONE_SETTINGS?.PHONE_SETTINGS_MAIN);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained">Save</Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default CallQueue;
