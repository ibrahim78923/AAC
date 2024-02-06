import { Box, Button, DialogActions, Grid, Typography } from '@mui/material';
import { useCreateScheduleForm } from './useCreateScheduleForm';
import { FormProvider } from '@/components/ReactHookForm';
import { createScheduleFields } from './CreateScheduleForm.dara';
import { ArrowBack, RemoveRedEyeOutlined } from '@mui/icons-material';
import { AIR_SERVICES } from '@/constants';
import { WORKLOAD_SCHEDULE } from '@/constants/strings';

export const CreateScheduleForm = () => {
  const { handleSubmit, method, submitForm, router, formType } =
    useCreateScheduleForm();
  const { CREATE, EDIT, UPDATE, SAVE } = WORKLOAD_SCHEDULE;
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBack
          color="secondary"
          onClick={() => {
            router?.push(AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography>{formType} Scheduled Form</Typography>
      </Box>
      <br />
      <FormProvider methods={method} onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          {createScheduleFields?.map((item: any) => (
            <Grid
              item
              key={item?.id}
              md={item?.md}
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
          {formType === CREATE ? SAVE : formType === EDIT ? UPDATE : null}
        </Button>
      </DialogActions>
    </>
  );
};
