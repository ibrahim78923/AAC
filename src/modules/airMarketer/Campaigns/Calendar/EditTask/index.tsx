import { Grid, Box, Typography, Skeleton } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './EditTask.data';
import useEditTask from './useEditTask';
import { DRAWER_TYPES } from '@/constants/strings';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';

interface EditTaskProps {
  onClose: (value: boolean) => void;
  createTask: { isToggle: boolean };
  isType: string;
  initialValueProps?: typeof defaultValues;
  setCreateTask: (value: any) => void;
  clickedDate: Date;
}

export default function EditTask({
  onClose,
  createTask,
  isType,
  initialValueProps = defaultValues,
  setCreateTask,
  clickedDate,
}: EditTaskProps) {
  const {
    handleSubmit,
    onSubmit,
    methods,
    postTaskLoading,
    updateTaskLoading,
    loadingCampaignTasks,
    CAMPAIGN_ID,
  } = useEditTask({
    onClose,
    initialValueProps,
    setCreateTask,
    createTask,
    clickedDate,
  });

  return (
    <CommonDrawer
      isDrawerOpen={createTask?.isToggle}
      onClose={() => onClose(false)}
      title={isType === DRAWER_TYPES?.ADD ? 'Create Task' : 'Edit Task'}
      okText={isType === DRAWER_TYPES?.ADD ? 'Create' : 'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={
        isType === DRAWER_TYPES?.ADD ? postTaskLoading : updateTaskLoading
      }
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                {item?.componentProps?.heading && (
                  <Typography variant={item?.variant}>
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {loadingCampaignTasks ? (
                  <Skeleton
                    height={40}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <item.component
                    disabled={
                      item?.componentProps?.name === CAMPAIGN_ID &&
                      isType === DRAWER_TYPES?.EDIT
                    }
                    {...item?.componentProps}
                    size={'small'}
                  >
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                )}

                {item?.componentProps?.name === 'dueDate' &&
                  !loadingCampaignTasks && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mt: 2 }}
                      >
                        Due Time
                      </Typography>
                      <Controller
                        name="time"
                        control={methods?.control}
                        render={({ field }) => (
                          <TimePicker
                            {...field}
                            onChange={(newValue) => field?.onChange(newValue)}
                            sx={{
                              width: '100%',
                              '& .MuiInputBase-input': { height: '9px' },
                              '& .MuiPickersLayout-root': { width: '500px' },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
