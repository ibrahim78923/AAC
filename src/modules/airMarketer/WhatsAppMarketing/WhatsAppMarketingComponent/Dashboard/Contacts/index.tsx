import { Box, Button, Stack, Typography } from '@mui/material';

import { smsContactsArray } from '../Dashboard.data';

import useContacts from './useContacts';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Contacts.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

const SMSContacts = () => {
  const { theme } = useContacts();
  return (
    <Box sx={{ pr: '24px' }}>
      <Box sx={styles?.SMSContactsCardStyle}>
        <Typography variant="h4" sx={styles?.heading(theme)}>
          Contacts
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            <Box component={'span'} sx={{ color: 'primary.main' }}>
              Total Contacts:
            </Box>
            786
          </Typography>
          <Typography>
            <Box component={'span'} sx={{ color: 'primary.main' }}>
              New Contacts:
            </Box>
            94
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Latest Added</Typography>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.VIEW_CONTACT,
            ]}
          >
            <Button size="small">View All</Button>
          </PermissionsGuard>
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
                <Typography>{item?.name}</Typography>
              </Box>
              <Typography>{item?.phone}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SMSContacts;
