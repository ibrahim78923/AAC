import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from './Email.styles';

const Email = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={styles.emailWrapper}>
        <Box>
          <Typography variant="h3" sx={styles.heading(theme)}>
            Connect Your Inbox to Air Applecart
          </Typography>
          <Typography variant="body2" sx={styles.paragraph(theme)}>
            Manage your work email in a private inbox that stays in sync with
            your email provider.
          </Typography>
        </Box>
        <Button>Email Settings</Button>
      </Box>
      <Typography variant="h4" sx={{ color: '#374151' }}>
        Select Your Email Provider:
      </Typography>
      <Box sx={{ ...styles.emailWrapper, gap: '20px' }}>
        <Typography variant="button" sx={styles.heading}>
          Dummy@gmail.com is Hosted by Gmail. We recommend you select this
          provider
        </Typography>
      </Box>
    </Box>
  );
};
export default Email;
