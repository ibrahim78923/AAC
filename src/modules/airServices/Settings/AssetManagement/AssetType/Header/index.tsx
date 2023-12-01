import { AIR_SERVICES } from '@/constants';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
    >
      <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
        <ArrowBack
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
            });
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
