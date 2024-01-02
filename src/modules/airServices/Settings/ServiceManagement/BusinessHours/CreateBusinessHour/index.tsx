import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  FormProvider,
  RHFAutocomplete,
  RHFEditor,
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { WorkingHoursFieldArray } from './WorkingHoursFieldArray';
import dayjs from 'dayjs';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  holidaysDropDownData,
  holidaysListsColumn,
  importHolidaysDropDown,
  selectWorkingHours,
  serviceHour,
  weekDays,
} from './CreateBusinessHour.data';
import { DateFilter } from './DateFilter';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { LoadingButton } from '@mui/lab';
import { AddHoliday } from './AddHoliday';
import { useCreateBusinessHour } from './useCreateBusinessHour';
import { AIR_SERVICES } from '@/constants';
import { timeZone } from '@/constants/time-zone';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const CreateBusinessHour = () => {
  const {
    router,
    businessHourMethod,
    control,
    watch,
    setValue,
    onSubmitRequest,
    buttonName,
    setButtonName,
    getHolidaysStatus,
    setHolidaysData,
    page,
    pageLimit,
    setPage,
    setPageLimit,
    dateRange,
    setDateRange,
    search,
    setSearch,
    manipulatedHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
    loadingStatus,
    singleBusinessHour,
  } = useCreateBusinessHour();
  return (
    <>
      <Box
        borderBottom="0.06rem solid"
        borderColor="custom.light_lavender_gray"
        mb={2.5}
      >
        <PageTitledHeader
          title="Business Hours"
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS)}
        />
      </Box>
      <FormProvider methods={businessHourMethod} onSubmit={onSubmitRequest}>
        <Grid container spacing={3}>
          <Grid item lg={6} xs={12}>
            <Box
              border="0.06rem solid"
              borderColor="custom.light_lavender_gray"
              borderRadius={2}
              p={2.5}
            >
              {singleBusinessHour?.isLoading ? (
                <SkeletonForm />
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RHFTextField name="name" label="Name" size="small" />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFEditor
                      name="description"
                      label="Description"
                      style={{ height: '12.3rem' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFAutocomplete
                      name="timeZone"
                      label="Time Zone"
                      options={timeZone?.map((timeZone) => timeZone?.label)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box
              border="0.06rem solid"
              borderColor="custom.light_lavender_gray"
              borderRadius={2}
              p={2.5}
            >
              {singleBusinessHour?.isLoading ? (
                <SkeletonForm />
              ) : (
                <Box>
                  <Typography
                    variant="formTopHeading"
                    color="blue.dull_blue"
                    mb={2}
                  >
                    Service Hours
                  </Typography>
                  <RHFRadioGroup name="serviceHours" options={serviceHour} />
                  {watch('serviceHours') === selectWorkingHours ? (
                    <Box mt={2} height={339} overflow="scroll">
                      {weekDays?.map((day) => {
                        const fieldValue = watch(day);
                        return (
                          <>
                            <Box
                              key={day}
                              mb={2}
                              p=".67rem 1rem"
                              border="0.06rem solid"
                              borderColor="custom.light_lavender_gray"
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
                                    variant="body2"
                                    color="grey.0"
                                    sx={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      display: '-webkit-box',
                                      WebkitLineClamp: '1',
                                      WebkitBoxOrient: 'vertical',
                                    }}
                                  >
                                    {!!time?.startTime &&
                                      dayjs(new Date(time?.startTime))?.format(
                                        'h:mm A',
                                      )}
                                    {!!time?.endTime &&
                                      `-${dayjs(
                                        new Date(time?.endTime),
                                      )?.format('h:mm A')}`}{' '}
                                    {!!time?.endTime &&
                                      index !==
                                        fieldValue?.timings?.length - 1 &&
                                      ', '}
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
                          </>
                        );
                      })}
                    </Box>
                  ) : (
                    <Box mt={2} height={339} overflow="scroll">
                      <Typography
                        variant="formTopHeading"
                        color="blue.dull_blue"
                        my={2}
                      >
                        Important Holidays
                      </Typography>
                      <Box my={2}>
                        <RHFAutocomplete
                          name="importHolidays"
                          options={Object.keys(holidaysDropDownData)}
                          size="small"
                        />
                      </Box>
                      <Typography color="blue.dull_blue" my={2}>
                        Important: importing will only add this year’s holydays
                        to the list.. The list will not be automatically updates
                        next year
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        mt="4rem"
                        gap={2}
                      >
                        <Button
                          onClick={() => setValue('serviceHours', 'SELECTED')}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          loading={getHolidaysStatus?.isFetching}
                          onClick={() => setButtonName(watch('importHolidays'))}
                          variant="contained"
                          disableElevation
                        >
                          Import
                        </LoadingButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box overflow="auto" mt={2}>
          <Box
            component="span"
            position="relative"
            display="block"
            minWidth={850}
            pt={3}
          >
            <Grid
              container
              bgcolor="grey.200"
              position="absolute"
              zIndex={10}
              top={0}
            >
              <Grid item xs={4} px={2} pt={2}>
                <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
              </Grid>
              <Grid item xs={8} pt={1} px={2}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap={2}
                >
                  <Box>
                    <Search
                      size="small"
                      label="Search"
                      searchBy={search}
                      setSearchBy={setSearch}
                    />
                  </Box>
                  {watch('serviceHours') === selectWorkingHours && (
                    <SingleDropdownButton
                      dropdownOptions={importHolidaysDropDown(setButtonName)}
                      dropdownName={`${
                        buttonName ? buttonName : 'Import Holidays'
                      }`}
                      variant="contained"
                      color="primary"
                      component={LoadingButton}
                      loading={getHolidaysStatus?.isFetching}
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        '&: hover': { bgcolor: 'primary.light' },
                      }}
                      disableElevation
                    />
                  )}
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => setOpenAddHolidayModal(true)}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <TanstackTable
              columns={holidaysListsColumn(setHolidaysData)}
              data={manipulatedHolidaysData}
              isFetching={
                getHolidaysStatus?.isFetching || singleBusinessHour?.isLoading
              }
              isError={getHolidaysStatus?.isError}
              isSuccess={getHolidaysStatus?.isSuccess || true}
              currentPage={page}
              count={Math.ceil(manipulatedHolidaysData?.length / pageLimit)}
              pageLimit={pageLimit}
              totalRecords={manipulatedHolidaysData?.length}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isPagination
            />
          </Box>
        </Box>
        <Box display="flex" gap={2} justifyContent="flex-end" mt={8}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => {
              router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
            }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loadingStatus}
          >
            {businessHourId ? 'Update' : 'Save'}
          </LoadingButton>
        </Box>
      </FormProvider>
      <AddHoliday
        setHolidaysData={setHolidaysData}
        openAddHolidayModal={openAddHolidayModal}
        setOpenAddHolidayModal={setOpenAddHolidayModal}
        businessHourId={businessHourId}
      />
    </>
  );
};
