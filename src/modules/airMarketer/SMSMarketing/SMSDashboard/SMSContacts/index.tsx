import { Box, Button, Stack, Typography } from '@mui/material';

import useSMSContacts from './useSMSContacts';

import { styles } from './SMSContacts.style';

const SMSContacts = () => {
  const { theme } = useSMSContacts();
  return (
    <Box sx={styles.SMSContactsCardStyle}>
      <Typography variant="h4" sx={styles.heading(theme)}>
        SMS Contacts
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Total Contacts: 786</Typography>
        <Typography>New Contacts: 94</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2">Latest Added</Typography>
        <Button size="small">View All</Button>
      </Stack>
    </Box>
  );
};

export default SMSContacts;
