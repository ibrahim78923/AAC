import {
  Box,
  ToggleButton,
  Typography,
  ToggleButtonGroup,
} from '@mui/material';

import ContactList from './ContactsList';

import { useContacts } from './useContacts.hook';

import { styles } from './Contact.style';
import { ContactsPropsI } from './contacts.interface';
import { CHAT_TYPES } from '@/constants';

const Contacts = ({ handleManualRefetch }: ContactsPropsI) => {
  const { handleSelection, theme, chatMode } = useContacts();

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Typography variant="h4">Chats</Typography>
        <Box sx={styles?.wrapperButtons(theme)}>
          <ToggleButtonGroup
            value={chatMode}
            exclusive
            onChange={handleSelection}
            aria-label="text alignment"
          >
            <ToggleButton
              value={CHAT_TYPES?.PERSONAL_CHAT}
              sx={styles?.toggleButtonLeft(theme)}
              aria-label="left-aligned"
            >
              <Typography variant="body2" fontWeight={'400'}>
                Personal Chat
              </Typography>
            </ToggleButton>
            <ToggleButton
              value={CHAT_TYPES?.GROUP_CHAT}
              sx={styles?.toggleButtonRight(theme)}
              aria-label="right-aligned"
            >
              <Typography variant="body2" fontWeight={'400'}>
                Group chat
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <ContactList
        chatMode={chatMode}
        handleManualRefetch={handleManualRefetch}
      />
    </>
  );
};

export default Contacts;
