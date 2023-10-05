import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import AddRequestApprovalDrawer from '../AddRequestApprovalDrawer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { requestmainpagebox } from './AddRequestPage.style';

const AddRequestPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <>
        <Typography variant="h5">Approvals</Typography>
        <Box sx={requestmainpagebox}>
          <Typography
            variant="body2"
            sx={{ color: theme?.palette?.grey?.[900] }}
          >
            No Approval Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
            startIcon={<AddCircleIcon />}
          >
            Request Approval
          </Button>
        </Box>{' '}
      </>
      <AddRequestApprovalDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default AddRequestPage;
