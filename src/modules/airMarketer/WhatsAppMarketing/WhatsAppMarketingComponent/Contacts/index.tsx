import { Box } from '@mui/material';

import Contacts from '@/modules/airSales/Contacts';
import ContactsGroup from './contactsGroup';

const ContactsWhatsappMarketing = () => {
  return (
    <Box sx={{ p: 2 }}>
      <ContactsGroup />
      <Contacts />
    </Box>
  );
};

export default ContactsWhatsappMarketing;
