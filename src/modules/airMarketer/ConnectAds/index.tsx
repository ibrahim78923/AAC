import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const ConnectAds = () => {
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
      <ListItem sx={{ fontSize: '14px', color: '#6B7280' }}>
        <ListItemText>Tie ad spend directly to company revenue.</ListItemText>
        <ListItemText>See who is interacting with each ad.</ListItemText>
        <ListItemText>Re-engage with existing contacts.</ListItemText>
        <ListItemText>
          Align advertising with the rest of your marketing.
        </ListItemText>
      </ListItem>
      <Typography sx={{ mt: 2, fontWeight: 300 }}>
        Once you connect an account, you may be eligible for $500 USD in <br />{' '}
        ad credits. Learn more about the{' '}
        <span style={{ color: '#38CAB5' }}>LinkedIn offer</span> and{' '}
        <span style={{ color: '#38CAB5' }}>Google Offer</span>.
      </Typography>
    </Box>
  );
};

export default ConnectAds;
