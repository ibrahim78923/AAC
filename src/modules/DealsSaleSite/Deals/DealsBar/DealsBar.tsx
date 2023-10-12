import { Typography, Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DealsBar = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        ></Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Button variant="outlined" sx={{ gap: '8px' }}></Button>
          <Button variant="contained" sx={{ gap: '8px' }}>
            {' '}
            <AddCircleIcon /> Create Deal
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DealsBar;
