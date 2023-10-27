import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CommonModal from '@/components/CommonModal';

export const UpsertFolder = () => {
  const [handleOpen, setHandleOpen] = useState(true);
  return (
    <CommonModal
      open={handleOpen}
      handleClose={() => setHandleOpen(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={'Create new folder'}
      okText={'Create Folder'}
      footerFill={undefined}
    >
      <Typography variant="body2" padding={'.2rem'}>
        Name
      </Typography>
      <TextField
        type="text"
        size="small"
        placeholder="Enter Folder Name"
        fullWidth
      />
      <Typography variant="body2" padding={'.2rem'}>
        Description
      </Typography>
      <TextField type="text" size="small" placeholder="#example" fullWidth />

      <Box
        sx={{
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <Button variant="outlined" onClick={() => setHandleOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained">Create</Button>
      </Box>
    </CommonModal>
  );
};
