import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';

export const ShareModal = ({ openShare, setOpenShare }: any) => {
  const userDropdown = useLazyAllUserDropdownQuery();
  return (
    <Dialog
      open={openShare}
      onClose={() => setOpenShare(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <Box p={2}>
        <Box
          justifyContent={'space-between'}
          alignItems={'center'}
          display={'flex'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="h4">Share Survey</Typography>
          <Close
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenShare(false)}
          />
        </Box>
        <br />
        <RHFAutocompleteAsync
          name="sendSurveyPeople"
          label="Share With"
          placeholder="Enter People"
          size="small"
          multiple
          apiQuery={userDropdown}
          getOptionLabel={(option: any) =>
            option?.email ? option?.email : option
          }
          isOptionEqualToValue={(option: any, newValue: any) =>
            newValue?.email
              ? option?.email === newValue?.email
              : option?.email === newValue
          }
        />
        <br />
        <Box display="flex" justifyContent="end">
          <Button variant="contained" onClick={() => setOpenShare(false)}>
            Share
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
