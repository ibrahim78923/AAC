import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { Avatar, Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { useAttendeePeople } from './useAttendeePeople';
import {
  fullName,
  fullNameInitial,
  generateColorFromName,
} from '@/utils/avatarUtils';
import { generateImage } from '@/utils/avatarUtils';
import { meetingPeople, peopleTypes } from './AttendeePeople.data';
import { DateRangePickerIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import ApiErrorState from '@/components/ApiErrorState';
import { ROUTER_CONSTANTS } from '@/constants/strings';
import NoData from '@/components/NoData';
import { CustomTooltip } from '@/components/CustomTooltip';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import { capitalizeFirstWord } from '@/utils/api';

export const AttendeePeople = (props: any) => {
  const {
    userDropdown,
    peopleData,
    organizer,
    handleDateValues,
    router,
    handleFetchMeetingSlots,
    status,
    slotsData,
    watchStartDate,
    meetingType,
    bookedStatus,
    bookedSlotsData,
    watchPeople,
  } = useAttendeePeople(props);
  const USER = 'user';

  return (
    <>
      <Box
        p={2}
        border="1.5px solid"
        borderColor="grey.0"
        borderRadius={2}
        mt={1.5}
      >
        <RHFAutocompleteAsync
          name="people"
          label="People"
          apiQuery={userDropdown}
          required
          getOptionLabel={(option: any) =>
            `${option?.firstName}  ${option?.lastName}`
          }
          renderOption={(option: any) => (
            <Box display={'flex'} gap={1} width={'100%'}>
              <Box>
                <Typography
                  variant={'body2'}
                  color={'grey.600'}
                  fontWeight={500}
                >
                  {`${capitalizeFirstWord(
                    option?.firstName,
                  )}  ${capitalizeFirstWord(option?.lastName)}`}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant={'body2'}
                  color={'grey.500'}
                  fontWeight={500}
                >
                  {option?.type === USER ? (
                    <PersonIcon sx={{ color: 'primary.main' }} />
                  ) : (
                    <ContactsIcon sx={{ color: 'custom.lime_green' }} />
                  )}
                </Typography>
              </Box>
            </Box>
          )}
          multiple={router?.query?.type === peopleTypes?.group}
          size="small"
          placeholder="Invite Someone"
          fullWidth
        />
        <Box
          display="flex"
          flexDirection="column"
          gap={1.5}
          mt={2}
          maxHeight={180}
          overflow="scroll"
        >
          {meetingPeople(organizer, peopleData)?.map(
            (item: any) =>
              item?.firstName && (
                <Box
                  display={'flex'}
                  gap={1}
                  alignItems={'center'}
                  key={item?._id}
                >
                  <Avatar
                    sx={{
                      bgcolor: generateColorFromName(
                        item?.firstName + item?.lastName,
                      ),
                      width: 40,
                      height: 40,
                    }}
                    src={generateImage(item?.avatar)}
                  >
                    <Typography variant="body3" textTransform={'uppercase'}>
                      {fullNameInitial(item?.firstName, item?.lastName)}
                    </Typography>
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="slateBlue.main"
                    >
                      {fullName(item?.firstName, item?.lastName)}
                    </Typography>
                    <Typography variant="body3">{item?.status}</Typography>
                  </Box>
                </Box>
              ),
          )}
        </Box>
      </Box>
      {peopleData?.length && watchPeople ? (
        <>
          <Box
            p={2}
            border="1.5px solid"
            borderColor="grey.0"
            borderRadius={2}
            mt={1.5}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight={500} color="grey.600">
                Suggested Slots
              </Typography>
              <Button
                sx={{ fontWeight: 500 }}
                onClick={() => {
                  handleFetchMeetingSlots();
                }}
              >
                Check Availability
              </Button>
            </Box>
            {status?.isLoading || status?.isFetching ? (
              <Skeleton />
            ) : slotsData && Object?.keys(slotsData)?.length > 0 ? (
              <Grid container spacing={2} mt={0}>
                {Object?.entries(slotsData)?.map(([slot, slotValues]: any) => {
                  const [startTime, endTime] = slot?.split('-');
                  const availability = slot || {};
                  const noTimeAvailable =
                    Object?.keys(availability)?.length === 0;
                  const unavailableUserNames = slotValues?.unavailable
                    ?.map((user: any) => user?.name)
                    ?.join(', ');

                  const totalCounts: any = Object?.values(availability)?.reduce(
                    (acc: any, timeRange: any) => {
                      acc.totalAvailableCount +=
                        timeRange?.available?.length || 0;
                      acc.totalUnavailableCount +=
                        timeRange?.unavailable?.length || 0;
                      return acc;
                    },
                    { totalAvailableCount: 0, totalUnavailableCount: 0 },
                  );

                  return (
                    <CustomTooltip
                      title={
                        meetingType === ROUTER_CONSTANTS?.GROUP
                          ? `${unavailableUserNames}`
                          : null
                      }
                      key={slot}
                    >
                      {!!!noTimeAvailable ? (
                        <Grid item lg={6} sm={6} xs={12}>
                          <Box
                            p={1}
                            border="1px solid"
                            borderColor="primary.main"
                            borderRadius={2}
                            display="flex"
                            flexDirection="column"
                            gap={1}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleDateValues(startTime, endTime);
                            }}
                          >
                            <Typography variant="subtitle2">
                              Available:
                              {meetingType === ROUTER_CONSTANTS?.GROUP
                                ? `${peopleData?.length} / ${
                                    totalCounts?.totalAvailableCount +
                                      totalCounts?.totalUnavailableCount || 1
                                  }`
                                : 'Everyone'}
                            </Typography>
                            <Typography variant="body4" color="custom.main">
                              {startTime}-{endTime}
                            </Typography>
                            <Typography
                              variant="body3"
                              color="custom.main"
                              display="flex"
                              alignItems="center"
                              gap={0.5}
                            >
                              <DateRangePickerIcon />
                              {dayjs(watchStartDate)?.format(
                                DATE_TIME_FORMAT?.WDM,
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <NoData height="20vh" message="No Slots found" />
                        </Grid>
                      )}
                    </CustomTooltip>
                  );
                })}
              </Grid>
            ) : (
              <NoData height="20vh" message="No Slots found" />
            )}
          </Box>
        </>
      ) : null}
      {!!watchStartDate && (
        <Box
          p={2}
          border="1.5px solid"
          borderColor="grey.0"
          borderRadius={2}
          mt={1.5}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="body1" fontWeight={500} color="grey.600">
              My Booked Slots
            </Typography>
          </Box>
          {bookedStatus?.isLoading || bookedStatus?.isFetching ? (
            <Skeleton />
          ) : bookedStatus?.isError ? (
            <ApiErrorState />
          ) : bookedSlotsData?.length ? (
            <Grid container spacing={2} mt={0}>
              {bookedSlotsData?.map((slot: any) => {
                return (
                  <>
                    <Grid item lg={6} sm={6} xs={12} key={slot?._id}>
                      <Box
                        p={1}
                        border="1px solid"
                        borderColor="primary.main"
                        borderRadius={2}
                        display="flex"
                        flexDirection="column"
                        gap={1}
                      >
                        <Typography variant="body4" color="custom.main">
                          {slot?.startTime}-{slot?.endTime}
                        </Typography>
                        <Typography
                          variant="body3"
                          color="custom.main"
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                        >
                          <DateRangePickerIcon />
                          {dayjs(watchStartDate)?.format(DATE_TIME_FORMAT?.WDM)}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          ) : (
            <NoData height="20vh" message="No Slots found" />
          )}
        </Box>
      )}
    </>
  );
};
