import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';

export const ShareModal: React.FC<{
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openShare, setOpenShare }) => {
  const userDropdown = useLazyAllUserDropdownQuery();
  const sessionUser: any = getSession();
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
          name="shareSurveyPeople"
          label="Share With"
          placeholder="Enter People"
          size="small"
          multiple
          apiQuery={userDropdown}
          externalParams={{
            limit: 5000,
            role: ROLES?.ORG_EMPLOYEE,
            organization: sessionUser?.user?.organization?._id,
          }}
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
          <Button
            variant="contained"
            className="small"
            onClick={() => setOpenShare(false)}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
