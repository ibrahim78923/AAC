import {
  Box,
  ToggleButton,
  Typography,
  ToggleButtonGroup,
} from '@mui/material';

import ContactList from './ContactsList';

import { useContacts } from './Contacts.hook';

import { styles } from './Contact.style';

const Contacts = () => {
  const { chatMode, handleSelection } = useContacts({});

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Typography variant="h4">Chats</Typography>
        <Box sx={styles.wrapperButtons}>
          <ToggleButtonGroup
            value={chatMode}
            exclusive
            onChange={handleSelection}
            aria-label="text alignment"
          >
            <ToggleButton
              value="personalChat"
              sx={styles.toggleButtonLeft}
              aria-label="left-aligned"
            >
              Personal Chat
            </ToggleButton>
            <ToggleButton
              value="groupChat"
              sx={styles.toggleButtonRight}
              aria-label="right-aligned"
            >
              Group chat
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <ContactList chatMode={chatMode} />
    </>
  );
};

export default Contacts;
