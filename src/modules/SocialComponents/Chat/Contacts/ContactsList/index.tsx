import React, { useState } from 'react';

import { Box, Button, Checkbox } from '@mui/material';

import ContactsCard from './ContactsCard';
import Search from '@/components/Search';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

import {
  chatContactsData,
  chatGroupsData,
} from '@/mock/modules/SocialComponents/Chat';

import { styles } from './ContactsList.style';

import { v4 as uuidv4 } from 'uuid';

const ContactList = ({ chatMode }: any) => {
  const [searchContacts, setSearchContacts] = useState('');

  const chatsTypeToShow =
    chatMode === 'groupChat' ? chatGroupsData : chatContactsData;

  return (
    <>
      <Box sx={styles.wrapperContactList}>
        <Box sx={styles.contactListHeader}>
          <Box sx={{ display: 'flex' }}>
            <Checkbox checked={false} />
            <Search
              label={'Search here'}
              searchBy={searchContacts}
              setSearchBy={setSearchContacts}
              width="100%"
              size="small"
            />
          </Box>
          <Button sx={styles.filterButton}>
            <FilterSharedIcon />
          </Button>
        </Box>
        {chatMode === 'groupChat' && (
          <Button
            variant="contained"
            sx={{ width: '100%', marginTop: '15px', height: '36px' }}
          >
            <PlusSharedIcon />
            &nbsp;&nbsp;Create New Group
          </Button>
        )}
        <Box mt={2}>
          {chatsTypeToShow.map((item) => (
            <ContactsCard key={uuidv4()} cardData={item} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ContactList;
