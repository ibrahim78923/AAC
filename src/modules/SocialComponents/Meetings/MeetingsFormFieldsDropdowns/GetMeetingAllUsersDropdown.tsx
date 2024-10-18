import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { capitalizeFirstWord } from '@/utils/api';
import { Box, Typography } from '@mui/material';
import { peopleTypes } from '../ScheduleMeetings/UpsertMeeting/MeetingForm/AttendeePeople/AttendeePeople.data';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';

const GetMeetingAllUsersDropdown = (props: any) => {
  const { router, userDropdown } = props;
  const USER = 'user';
  return (
    <>
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
              <Typography variant={'body2'} color={'grey.600'} fontWeight={500}>
                {`${capitalizeFirstWord(
                  option?.firstName,
                )}  ${capitalizeFirstWord(option?.lastName)}`}
              </Typography>
            </Box>
            <Box>
              <Typography variant={'body2'} color={'grey.500'} fontWeight={500}>
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
    </>
  );
};

export default GetMeetingAllUsersDropdown;
