import { Box, Button, DialogActions, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { createScheduleFields } from './UpsertWorkloadSchedule.data';
import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { AIR_SERVICES } from '@/constants';
import { useUpsertWorkloadSchedule } from './useUpsertWorkloadSchedule';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const UpsertWorkloadSchedule = () => {
  const { handleSubmit, method, submitForm, router, workloadScheduleId } =
    useUpsertWorkloadSchedule();
  return (
    <>
      <PageTitledHeader
        title={
          !!workloadScheduleId ? 'Edit Scheduled Form' : 'Add Scheduled Form'
        }
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS);
        }}
      />
      {/* <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBack
          color="secondary"
          onClick={() => {
            router?.push(AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography> Scheduled Form</Typography>
      </Box> */}
      <br />
      <FormProvider methods={method} onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          {createScheduleFields?.map((item: any) => (
            <Grid
              item
              key={item?.id}
              md={item?.md}
              xs={12}
              sx={{
                display: item?.iconProps && 'flex',
                alignItems: item?.iconProps && 'center',
                gap: item?.iconProps && 1,
                mt: item?.iconProps && 1,
              }}
            >
              {item.componentProps && (
                <item.component {...item?.componentProps} size={'small'} />
              )}
              {item?.iconProps && (
                <Box mt={1} gap={1} display={'flex'}>
                  {item?.iconProps && (
                    <RemoveRedEyeOutlined {...item?.iconProps} />
                  )}
                  {item?.textProps && (
                    <Typography {...item?.textProps}>{item?.title}</Typography>
                  )}
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
      <DialogActions>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained">
          {workloadScheduleId ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </>
  );
};
