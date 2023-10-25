import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from './Email.styles';
import { EmailInfoIcon } from '@/assets/icons';
import { EmailArray } from '@/mock/modules/superAdmin/Email';
import Settings from '@/assets/icons/modules/superAdmin/email/Settings';
import { v4 as uuidv4 } from 'uuid';

const Email = () => {
  const theme = useTheme();
  return (
    <>
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
        <Box sx={styles.settingIcon}>
          <Settings />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Email Settings
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ color: '#374151' }}>
        Select Your Email Provider:
      </Typography>
      <Typography variant="body2" sx={styles.emailAlert}>
        <EmailInfoIcon />
        Dummy@gmail.com is Hosted by Gmail. We recommend you select this
        provider
      </Typography>
      <Box display="flex" alignItems="center" gap="24px" flexWrap="wrap">
        {EmailArray.map((item) => (
          <Box key={uuidv4()} sx={styles.socialMedia}>
            {item.Icon}
            <Typography variant="h6">{item.Text}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default Email;
