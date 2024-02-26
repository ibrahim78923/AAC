import { Box, Button, Typography } from '@mui/material';
import {
  AddPlusPrimaryIcon,
  WhiteMessageIcon,
  WhiteTrashIcon,
} from '@/assets/icons';

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

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'12px'}
          sx={{
            backgroundColor: '#38CAB5',
            marginTop: '20px',
            padding: '15px',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <Box>
            <WhiteMessageIcon />
          </Box>
          <Box>
            <Typography variant="body2">Meeting with CEO</Typography>
            <Typography variant="body3">
              Presentation about the Air Applecart project
            </Typography>
          </Box>
          <Box>
            <Typography variant="body3">1 day</Typography>
            <WhiteTrashIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};
