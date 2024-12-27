import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  FormProvider,
  RHFAutocomplete,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { WorkingHoursFieldArray } from './WorkingHoursFieldArray';
import TanstackTable from '@/components/Table/TanstackTable';
import { weekDays } from './CreateBusinessHour.data';
import { DateFilter } from './DateFilter';
import Search from '@/components/Search';
import { LoadingButton } from '@mui/lab';
import { AddHoliday } from './AddHoliday';
import { useCreateBusinessHour } from './useCreateBusinessHour';
import { TIME_FORMAT } from '@/constants';
import { AIR_SERVICES } from '@/constants/routes';
import { timeZone } from '@/constants/time-zone';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Fragment } from 'react';
import { otherDateFormat } from '@/lib/date-time';

export const CreateBusinessHour = () => {
  const {
    router,
    methods,
    control,
    watch,
    onSubmitRequest,
    getHolidaysStatus,
    setHolidaysData,
    dateRange,
    setDateRange,
    setSearch,
    manipulatedHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
    loadingStatus,
    singleBusinessHour,
    tableColumns,
    holidaysDataOptions,
  } = useCreateBusinessHour();

  return (
    <>
      <PageTitledHeader
        title="Business Hours"
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS)}
      />

      <br />

      <FormProvider methods={methods} onSubmit={onSubmitRequest}>
        <Grid container spacing={3}>
          <Grid item lg={6} xs={12}>
            <Box
              border="0.06rem solid"
              borderColor="custom.light_lavender_gray"
              borderRadius={2}
              p={2.5}
            >
              {loadingStatus ? (
                <SkeletonForm />
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RHFTextField
                      name={'name'}
                      label={'Name'}
                      size={'small'}
                      required
                      disabled={singleBusinessHour?.data?.data?.perDefine}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <RHFEditor
                      name={'description'}
                      label={'Description'}
                      style={{ height: '12rem' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <RHFAutocomplete
                      name={'timeZone'}
                      required
                      label={'Time Zone'}
                      options={timeZone}
                      size={'small'}
                      getOptionLabel={(option: any) => option?.label}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>

          <Grid item lg={6} xs={12}>
            <Box
              border={1}
              borderColor={'custom.light_lavender_gray'}
              borderRadius={2}
              p={2.5}
              height={'100%'}
            >
              {loadingStatus ? (
                <SkeletonForm />
              ) : (
                <>
                  <Typography
                    variant={'formTopHeading'}
                    color={'blue.dull_blue'}
                  >
                    Service Hours
                  </Typography>

                  <Box mt={2} height={400} overflow={'auto'}>
                    {weekDays?.map((day) => {
                      const fieldValue = watch(day);

                      return (
                        <Fragment key={day}>
                          <Box
                            mb={2}
                            p={'1rem 2rem'}
                            border={'0.06rem solid'}
                            borderColor={'custom.light_lavender_gray'}
                            borderRadius={2}
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <RHFSwitch
                              name={day + '.switch'}
                              sx={{ textTransform: 'capitalize' }}
                              label={day}
                            />

                            {fieldValue?.timings?.map(
                              (time: any, index: number) => (
                                <Typography
                                  key={time?.id ?? day}
                                  variant={'body2'}
                                  color={'grey.0'}
                                  sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                >
                                  {!!time?.startTime &&
                                    otherDateFormat(
                                      new Date(time?.startTime),
                                      TIME_FORMAT?.UI,
                                    )}
                                  {!!time?.endTime &&
                                    `-${otherDateFormat(
                                      new Date(time?.endTime),
                                      TIME_FORMAT?.UI,
                                    )}`}
                                  {!!time?.endTime &&
                                    index !== fieldValue?.timings?.length - 1 &&
                                    ','}
                                </Typography>
                              ),
                            )}
                          </Box>

                          {fieldValue?.switch && (
                            <WorkingHoursFieldArray
                              name={day + '.timings'}
                              control={control}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={2}
          bgcolor={'grey.200'}
          p={2}
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          alignItems={'center'}
          gap={2}
        >
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />

          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
          >
            <Search
              size={'small'}
              label={'Search here'}
              setSearchBy={setSearch}
              backgroundColor={'common.white'}
            />

            <RHFAutocomplete
              name={'importHolidays'}
              options={holidaysDataOptions}
              size={'small'}
              sx={{
                width: 200,
                '& .MuiFormControl-root': {
                  display: 'block',
                },
              }}
              placeholder={'Import Holidays'}
              isOptionEqualToValue={(option: any, newValue: any) =>
                option === newValue
              }
            />

            <Button
              variant={'contained'}
              disableElevation
              onClick={() => setOpenAddHolidayModal(true)}
              className={'small'}
            >
              Add
            </Button>
          </Box>
        </Box>

        <TanstackTable
          columns={tableColumns}
          data={manipulatedHolidaysData}
          isLoading={loadingStatus}
          isFetching={loadingStatus}
          isError={getHolidaysStatus?.isError}
        />

        <Box display="flex" gap={2} justifyContent={'flex-end'} mt={3}>
          <LoadingButton
            variant={'outlined'}
            color={'inherit'}
            onClick={() => {
              router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
            }}
            className={'small'}
            disabled={loadingStatus}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={'contained'}
            type={'submit'}
            className={'small'}
            loading={loadingStatus}
          >
            {businessHourId ? 'Update' : 'Save'}
          </LoadingButton>
        </Box>
      </FormProvider>

      {openAddHolidayModal && (
        <AddHoliday
          setHolidaysData={setHolidaysData}
          openAddHolidayModal={openAddHolidayModal}
          setOpenAddHolidayModal={setOpenAddHolidayModal}
          businessHourId={businessHourId}
        />
      )}
    </>
  );
};
