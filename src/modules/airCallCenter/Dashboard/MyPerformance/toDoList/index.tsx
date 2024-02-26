import { AddPlusPrimaryIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';

export const ToDoList = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginLeft: '10px' }}>
        Incoming Calls
      </Typography>
      <Box
        sx={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Typography>To-Do</Typography>
        <Button
          sx={{ border: '1px solid #E5E7EB', height: '70px', width: '100%' }}
          startIcon={<AddPlusPrimaryIcon />}
        >
          {' '}
          New to do item{' '}
        </Button>
      </Box>
    </>
  );
};
