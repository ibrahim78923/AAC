import { Box, Button, Typography, useTheme } from '@mui/material';
import {
  AddPlusPrimaryIcon,
  WhiteMessageIcon,
  WhiteTrashIcon,
} from '@/assets/icons';

export const ToDoList = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: '20px',
          marginTop: '60px',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          To-Do
        </Typography>
        <Button
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            height: '70px',
            width: '100%',
          }}
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
            backgroundColor: theme?.palette?.primary?.main,
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
              Presentation about the Air Applecart projects
            </Typography>
          </Box>
          <Box display={'grid'} gap={'15px'}>
            <Typography variant="body3">1 day</Typography>
            <WhiteTrashIcon />
          </Box>
        </Box>

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'12px'}
          sx={{
            backgroundColor: theme?.palette?.warning?.main,
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
            <Typography variant="body2">Lunch</Typography>
            <Typography variant="body3">
              Lunch with stakeholders at Glascow at 01:30 PM
            </Typography>
          </Box>
          <Box display={'grid'} gap={'15px'}>
            <Typography variant="body3">1 day</Typography>
            <WhiteTrashIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};
