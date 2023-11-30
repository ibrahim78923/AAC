import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBack
          sx={{
            cursor: 'pointer',
          }}
        />
        <Typography variant="h3" textTransform="capitalize">
          asset type & fields
        </Typography>
      </Box>
      <Button variant="contained">New Asset Type</Button>
    </Box>
  );
};

export default Header;
