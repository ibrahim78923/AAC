import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const ConnectAds = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3">Ads</Typography>
      <Typography sx={{ mt: 3, fontWeight: 400 }} variant="h6">
        See which ads are turning visitors into customers
      </Typography>
      <Typography sx={{ mt: 2, fontWeight: 300 }} variant="body2">
        You all-in-one place to manage all your Facebook, Instagram,
        <br /> LinkedIn, and Google ad campaigns.
      </Typography>
      <List
        sx={{
          fontSize: '14px',
          color: '#6B7280',
          '& li': {
            position: 'relative',
            '&::before': {
              position: 'absolute',
              content: `''`,
              left: 0,
              top: '18px',
              borderRadius: '50px',
              padding: '2px',
              background: '#6B7280',
            },
          },
        }}
      >
        <ListItem>Tie ad spend directly to company revenue.</ListItem>
        <ListItem>See who is interacting with each ad.</ListItem>
        <ListItem>Re-engage with existing contacts.</ListItem>
        <ListItem>Align advertising with the rest of your marketing.</ListItem>
      </List>
      <Typography sx={{ mt: 2, fontWeight: 300 }}>
        Once you connect an account, you may be eligible for $500 USD in <br />{' '}
        ad credits. Learn more about the{' '}
        <span style={{ color: '#38CAB5' }}>LinkedIn offer</span> and{' '}
        <span style={{ color: '#38CAB5' }}>Google Offer</span>.
      </Typography>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() =>
          router.push('/air-marketer/connect-ads/connect-ad-account')
        }
      >
        Connect accounts
      </Button>
    </Box>
  );
};

export default ConnectAds;
