import React, { useState } from 'react';

import { Box, Button, Checkbox } from '@mui/material';

import ContactsCard from './ContactsCard';
import Search from '@/components/Search';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

import { styles } from './ContactsList.style';

const ContactList = ({ chatMode }: any) => {
  const [searchContacts, setSearchContacts] = useState('');

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
          <ContactsCard />
        </Box>
      </Box>
    </>
  );
};

export default ContactList;
