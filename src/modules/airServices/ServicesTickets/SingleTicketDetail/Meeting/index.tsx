import { Avatar, Box, Typography } from '@mui/material';
import { PremiumIcon } from '@/assets/icons';

export const Meeting = () => {
  return (
    <Box bgcolor={'blue.link_blue'} borderRadius={4} p={2}>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar variant={'square'} sx={{ bgcolor: 'transparent' }}>
          <PremiumIcon />
        </Avatar>
        <Typography variant={'h3'}>Premium Feature</Typography>
      </Box>
      <Typography variant={'body1'} ml={5}>
        Please connect with the sales team to discuss in further
      </Typography>
    </Box>
  );
};
