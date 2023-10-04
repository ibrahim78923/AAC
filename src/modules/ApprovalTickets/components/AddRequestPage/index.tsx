import { useState } from 'react';
import { AddImage } from '@/assets/images';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import AddRequestApprovalDrawer from '../AddRequestApprovalDrawer';

const AddRequestPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <>
      <Typography variant="h5">Approvals</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: theme?.palette?.grey?.[900] }}>
          No Approval Found
        </Typography>
        <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
          <Image src={AddImage} alt="add-icon" />
          <Typography variant="body2" sx={{ ml: '5px' }}>
            Request Approval{' '}
          </Typography>
        </Button>
      </Box>
      <AddRequestApprovalDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default AddRequestPage;
