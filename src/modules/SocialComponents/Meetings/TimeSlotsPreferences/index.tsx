import TimeSlotsHeader from './TimeSlotsHeader';
import TimeSlotsWeekly from './TimeSlotsWeekly';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useTimeSlotPreferences } from './useTimeSlotPreferences';
import DateOverrides from './DateOverrides';
import BufferTime from './BufferTime';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

export const TimeSlotPreferences = () => {
  const {
    disabled,
    setDisabled,
    theme,
    methods,
    onSubmit,
    handleSubmit,
    watch,
    setValue,
    selectedMonths,
    setSelectedMonths,
    timeSlotsState,
    setTimeSlotsState,
    daySlotsState,
    setDaySlotsState,
    submittedOverrideData,
    setSubmittedOverrideData,
    timeSlotsProcess,
    timeSlotsData,
    isLoading,
    isFetching,
    isError,
  } = useTimeSlotPreferences();
  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <TimeSlotsHeader
          disabled={disabled}
          setDisabled={setDisabled}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          timeSlotsData={timeSlotsData}
        />
        <Grid container gap={1}>
          <Grid item lg={6} xs={12} mr={2}>
            <TimeSlotsWeekly
              disabled={disabled}
              theme={theme}
              watch={watch}
              control={methods?.control}
              setValue={setValue}
              timeSlotsState={timeSlotsState}
              setTimeSlotsState={setTimeSlotsState}
              daySlotsState={daySlotsState}
              setDaySlotsState={setDaySlotsState}
              timeSlotsProcess={timeSlotsProcess}
              timeSlotsData={timeSlotsData}
            />
          </Grid>
          <Grid item lg={5} xs={12}>
            <DateOverrides
              disabled={disabled}
              theme={theme}
              methods={methods}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              submittedData={submittedOverrideData}
              setSubmittedData={setSubmittedOverrideData}
              timeSlotsData={timeSlotsData}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Box pt={2} mb={2}>
          <BufferTime disabled={disabled} theme={theme} setValue={setValue} />
        </Box>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {!disabled && (
          <Box display={'flex'} justifyContent={'flex-end'} gap={1} pt={1}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDisabled(true)}
              disabled={timeSlotsProcess?.isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              disabled={timeSlotsProcess?.isLoading}
              loading={timeSlotsProcess?.isLoading}
            >
              Apply
            </LoadingButton>
          </Box>
        )}
      </FormProvider>
    </>
  );
};
