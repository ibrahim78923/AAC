import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useAttendeePeople } from './useAttendeePeople';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { generateImage } from '@/utils/avatarUtils';
import { meetingPeople, suggestedData } from './AttendeePeople.data';
import { DateRangePickerIcon } from '@/assets/icons';

export const AttendeePeople = (props: any) => {
  const { contactDropdown, watchPeople, organizer } = useAttendeePeople(props);
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
          getOptionLabel={(option: any) =>
            fullName(option?.firstName, option?.lastName)
          }
          size="small"
          placeholder="Invite Someone"
          fullWidth
        />
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {meetingPeople(organizer, watchPeople)?.map(
            (item) =>
              item?.firstName && (
                <Box
                  display={'flex'}
                  gap={1}
                  alignItems={'center'}
                  key={item?.id}
                >
                  <Avatar
                    sx={{ bgcolor: 'blue.main', width: 40, height: 40 }}
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
          {suggestedData?.map((item) => (
            <Grid item xs={6} key={item?.id}>
              <Box
                p={1}
                border="1px solid"
                borderColor="primary.main"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                gap={1}
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
                  <DateRangePickerIcon /> {item?.date}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
