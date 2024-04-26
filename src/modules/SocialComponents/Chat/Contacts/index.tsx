import {
  Box,
  ToggleButton,
  Typography,
  ToggleButtonGroup,
} from '@mui/material';

import ContactList from './ContactsList';

import { useContacts } from './useContacts.hook';

import { styles } from './Contact.style';

const Contacts = ({ handleManualRefetch }: any) => {
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
              value="personalChat"
              sx={styles?.toggleButtonLeft(theme)}
              aria-label="left-aligned"
            >
              <Typography variant="body2" fontWeight={'400'}>
                Personal Chat
              </Typography>
            </ToggleButton>
            <ToggleButton
              value="groupChat"
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
