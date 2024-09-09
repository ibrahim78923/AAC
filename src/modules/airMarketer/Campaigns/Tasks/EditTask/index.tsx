import {
  Grid,
  Box,
  Typography,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './EditTask.data';
import useEditTask from './useEditTask';
import { DRAWER_TYPES } from '@/constants/strings';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export default function EditTask({
  onClose,
  isOpenDrawer,
  isType,
  initialValueProps = defaultValues,
  setIsOpenEditTaskDrawer,
  selectedRec,
}: any) {
  const {
    getDynamicFieldsStatus,
    loadingCampaignTasks,
    updateTaskLoading,
    postTaskLoading,
    handleSubmit,
    CAMPAIGN_ID,
    onSubmit,
    methods,
    theme,
    form,
  } = useEditTask({
    initialValueProps,
    setIsOpenEditTaskDrawer,
    selectedRec,
    isType,
  });

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={isType === DRAWER_TYPES?.ADD ? 'Create Task' : 'Edit Task'}
      okText={isType === DRAWER_TYPES?.ADD ? 'Create' : 'Update'}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postTaskLoading || updateTaskLoading}
      cancelText={'Cancel'}
      footer
      isOk
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                {item?.componentProps?.heading && !loadingCampaignTasks && (
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
                        Due Time{' '}
                        <span style={{ color: theme?.palette?.error?.main }}>
                          *
                        </span>
                      </Typography>
                      <Controller
                        name="time"
                        control={methods?.control}
                        rules={{
                          validate: (value) => {
                            const currentDate = new Date();
                            return (
                              (value && value > currentDate) ||
                              'Time must be in the future'
                            );
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TimePicker
                              {...field}
                              onChange={(newValue) => field?.onChange(newValue)}
                              sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                  border: '1px solid',
                                  borderColor: error
                                    ? theme?.palette?.error?.main
                                    : theme?.palette?.custom?.hex_grey,
                                },
                                '& .MuiInputBase-input': { height: '9px' },
                                '& .MuiPickersLayout-root': { width: '500px' },
                              }}
                            />
                            {error && (
                              <Typography variant="body1" color="error">
                                {error.message}
                              </Typography>
                            )}
                          </>
                        )}
                      />
                    </LocalizationProvider>
                  )}
              </Grid>
            ))}
            {getDynamicFieldsStatus?.isLoading ||
            getDynamicFieldsStatus?.isFetching ? (
              <Grid item xs={12} textAlign={'center'}>
                <CircularProgress />
              </Grid>
            ) : (
              form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
