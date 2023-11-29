import { Box, Button, Stack, Typography } from '@mui/material';

import useSMSContacts from './useSMSContacts';

import { smsContactsArray } from '../SMSDashboard.data';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './SMSContacts.style';

const SMSContacts = () => {
  const { theme } = useSMSContacts();
  return (
    <Box sx={styles?.SMSContactsCardStyle}>
      <Typography variant="h4" sx={styles?.heading(theme)}>
        SMS Contacts
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box display="flex">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            Total Contacts:
          </Typography>
          <Typography variant="h5" fontWeight="500">
            {' '}
            786
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            New Contacts:
          </Typography>
          <Typography variant="h5" fontWeight="500">
            {' '}
            94
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="subtitle2"
          sx={{ color: theme?.palette?.secondary?.main }}
        >
          Latest Added
        </Typography>
        <Button variant="text" size="small">
          View All
        </Button>
      </Stack>

      <Box className="cardWrapper">
        {smsContactsArray?.map((item: any) => (
          <Stack
            key={uuidv4()}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="innerCard"
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {item?.avatar}
              <Typography
                variant="body2"
                fontWeight="500"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                {item?.name}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.grey[600] }}
            >
              {item?.phone}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default SMSContacts;
