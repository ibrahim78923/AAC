import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { AddPeopleDropdown } from '../AddPeopleDropdown';

export const ShareModal: React.FC<{
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openShare, setOpenShare }) => {
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
        <AddPeopleDropdown
          name="shareSurveyPeople"
          label="Share With"
          size="small"
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
