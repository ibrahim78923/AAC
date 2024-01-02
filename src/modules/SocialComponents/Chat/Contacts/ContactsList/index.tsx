import React, { useEffect, useState } from 'react';

import { Box, Button, Checkbox, CircularProgress } from '@mui/material';

import ContactsCard from './ContactsCard';
import Search from '@/components/Search';
import AddGroupModal from './AddGroupModal';
import ChatDropdown from '../../ChatDropdown';
import { AlertModals } from '@/components/AlertModals';

import { FilterSharedIcon, PlusIcon } from '@/assets/icons';

import { styles } from './ContactsList.style';

import { v4 as uuidv4 } from 'uuid';
import { useGetChatsContactsQuery } from '@/services/chat';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setChatContacts,
  setChatContactsLoading,
} from '@/redux/slices/chat/slice';
import { isNullOrEmpty } from '@/utils';

const ContactList = ({ chatMode, handleManualRefetch }: any) => {
  const dispatch = useAppDispatch();

  const { data: contactsData, status } = useGetChatsContactsQuery({
    isGroup: chatMode === 'groupChat' ? true : false,
  });

  const [searchContacts, setSearchContacts] = useState('');
  const [isAddGroupModal, setIsAddGroupModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (chatMode === 'groupChat') {
      null;
    } else {
      if (contactsData?.data?.chats.length > 0) {
        dispatch(setChatContacts(contactsData?.data?.chats));
      }
    }
  }, [contactsData?.data?.chats]);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(setChatContactsLoading(true));
    } else {
      dispatch(setChatContactsLoading(false));
    }
  }, [status]);

  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);
  const isChatContactsLoading = useAppSelector(
    (state) => state?.chat?.isChatContactsLoading,
  );

  const chatsTypeToShow = chatMode === 'groupChat' ? [] : chatContacts;

  const menuItemsData = [
    {
      menuLabel: 'Pinned',
      handler: handleClose,
    },
    {
      menuLabel: 'Archived',
      handler: handleClose,
    },
    {
      menuLabel: 'Deleted',
      handler: handleClose,
    },
    {
      menuLabel: 'Mark as unread',
      handler: handleClose,
    },
    {
      menuLabel: 'Muted',
      handler: handleClose,
    },
  ];

  return (
    <>
      <Box sx={styles?.wrapperContactList}>
        <Box sx={styles?.contactListHeader}>
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
          <Button
            sx={styles?.filterButton}
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <FilterSharedIcon />
          </Button>
          <ChatDropdown
            anchorEl={anchorEl}
            actionMenuOpen={actionMenuOpen}
            handleClose={handleClose}
            menuData={menuItemsData}
          />
        </Box>
        {chatMode === 'groupChat' && (
          <Button
            variant="contained"
            sx={{ width: '100%', marginTop: '15px', height: '36px' }}
            onClick={() => setIsAddGroupModal(true)}
          >
            <PlusIcon />
            &nbsp;&nbsp;Create New Group
          </Button>
        )}
        <Box mt={2} sx={{ overflow: 'scroll', maxHeight: '52vh' }}>
          {isChatContactsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {!isNullOrEmpty(chatsTypeToShow) ? (
                chatsTypeToShow?.map((item: any) => (
                  <ContactsCard
                    key={uuidv4()}
                    cardData={{ item }}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    handleManualRefetch={handleManualRefetch}
                  />
                ))
              ) : (
                <Box>No Data Found</Box>
              )}
            </>
          )}
        </Box>
      </Box>
      <AddGroupModal
        setIsAddGroupModal={setIsAddGroupModal}
        isAddGroupModal={isAddGroupModal}
      />
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ContactList;
