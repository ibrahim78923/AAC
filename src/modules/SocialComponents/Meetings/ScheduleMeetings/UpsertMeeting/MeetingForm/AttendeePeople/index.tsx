import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useAttendeePeople } from './useAttendeePeople';
import {
  fullName,
  fullNameInitial,
  generateColorFromName,
} from '@/utils/avatarUtils';
import { generateImage } from '@/utils/avatarUtils';
import {
  meetingPeople,
  peopleTypes,
  suggestedData,
} from './AttendeePeople.data';
import { DateRangePickerIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const AttendeePeople = (props: any) => {
  const { contactDropdown, peopleData, organizer, handleDateValues, router } =
    useAttendeePeople(props);
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
          apiQuery={contactDropdown}
          externalParam={{ limit: 100 }}
          required
          getOptionLabel={(option: any) =>
            fullName(option?.firstName, option?.lastName)
          }
          multiple={router?.query?.type === peopleTypes?.group}
          size="small"
          placeholder="Invite Someone"
          fullWidth
        />
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {meetingPeople(organizer, peopleData)?.map(
            (item: any) =>
              item?.firstName && (
                <Box
                  display={'flex'}
                  gap={1}
                  alignItems={'center'}
                  key={item?.id}
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
      <Box
        p={2}
        border="1.5px solid"
        borderColor="grey.0"
        borderRadius={2}
        mt={1.5}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1" fontWeight={500} color="grey.600">
            Suggested Slots
          </Typography>
          <Button sx={{ fontWeight: 500 }}>Check Availability</Button>
        </Box>
        <Grid container spacing={2} mt={0}>
          {suggestedData?.map((item: any) => (
            <Grid item lg={6} sm={6} xs={12} key={item?.id}>
              <Box
                p={1}
                border="1px solid"
                borderColor="primary.main"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                gap={1}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDateValues(item)}
              >
                <Typography variant="subtitle2">
                  Available: {item?.available}
                </Typography>
                <Typography variant="body4" color="custom.main">
                  {item?.from} - {item?.to}
                </Typography>
                <Typography
                  variant="body3"
                  color="custom.main"
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  <DateRangePickerIcon />
                  {dayjs(item?.date?.toString())?.format(DATE_TIME_FORMAT?.WDM)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
