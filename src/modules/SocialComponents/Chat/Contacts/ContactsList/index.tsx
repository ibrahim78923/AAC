import React, { useEffect, useState } from 'react';

import { Box, Button, Checkbox, Skeleton, useTheme } from '@mui/material';

import ContactsCard from './ContactsCard';
import Search from '@/components/Search';
import AddGroupModal from './AddGroupModal';
import ChatDropdown from '../../ChatDropdown';
import { AlertModals } from '@/components/AlertModals';

import { DeleteIcon, FilterSharedIcon, PlusIcon } from '@/assets/icons';

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
  const theme = useTheme();
  const [isDeletedFilter, setIsDeletedFilter] = useState(false);
  const [unReadFilter, setUnReadFilter] = useState(false);
  const [isMutedFilter, setIsMutedFilter] = useState(false);
  const [isPinnedFilter, setIsPinnedFilter] = useState(false);
  const [isArchivedFilter, setIsArchivedFilter] = useState(false);

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

  const dispatch = useAppDispatch();

  const paramsObj: any = {};
  paramsObj['isDeleted'] = isDeletedFilter;
  paramsObj['unRead'] = unReadFilter;
  paramsObj['isMuted'] = isMutedFilter;
  paramsObj['isPinned'] = isPinnedFilter;
  paramsObj['isArchived'] = isArchivedFilter;
  paramsObj['search'] = searchContacts;
  const queryParams = Object?.entries(paramsObj)
    ?.map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
    ?.join('&');
  const query = `&${queryParams}`;

  const { data: contactsData, status } = useGetChatsContactsQuery({
    isGroup: chatMode === 'groupChat' ? true : false,
    query,
  });

  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);
  const isChatContactsLoading = useAppSelector(
    (state) => state?.chat?.isChatContactsLoading,
  );

  const chatsTypeToShow = chatContacts;

  const handleSelectAll = () => {
    if (selectedValues?.length === chatsTypeToShow?.length) {
      setSelectedValues([]);
    } else {
      const result = chatsTypeToShow?.map((item: any) => item?._id);
      setSelectedValues(result);
    }
  };
  const showAllRecordsHandler = () => {
    setIsArchivedFilter(false);
    setIsPinnedFilter(false);
    setIsMutedFilter(false);
    setUnReadFilter(false);
    setIsDeletedFilter(false);
  };

  useEffect(() => {
    if (contactsData?.data?.chats) {
      dispatch(setChatContacts(contactsData?.data?.chats));
    }
  }, [contactsData?.data?.chats, chatMode]);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(setChatContactsLoading(true));
    } else {
      dispatch(setChatContactsLoading(false));
    }
  }, [status]);

  const menuItemsData = [
    {
      menuLabel: 'All',
      handler: showAllRecordsHandler,
    },
    {
      menuLabel: 'Pinned',
      handler: () => {
        showAllRecordsHandler();
        setIsPinnedFilter(true);
        handleClose();
      },
    },
    {
      menuLabel: 'Archived',
      handler: () => {
        showAllRecordsHandler();
        setIsArchivedFilter(true);
        handleClose();
      },
    },
    {
      menuLabel: 'Deleted',
      handler: () => {
        showAllRecordsHandler();
        setIsDeletedFilter(true);
        handleClose();
      },
    },
    {
      menuLabel: 'Mark as unread',
      handler: () => {
        showAllRecordsHandler();
        setUnReadFilter(true);
        handleClose();
      },
    },
    {
      menuLabel: 'Muted',
      handler: () => {
        showAllRecordsHandler();
        setIsMutedFilter(true);
        handleClose();
      },
    },
  ];

  return (
    <>
      <Box sx={styles?.wrapperContactList}>
        <Box sx={styles?.contactListHeader}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Checkbox
              onClick={handleSelectAll}
              checked={
                chatsTypeToShow?.length > 0 &&
                chatsTypeToShow?.length === selectedValues?.length
              }
            />
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Search
                label={'Search by name'}
                searchBy={searchContacts}
                setSearchBy={setSearchContacts}
                width="100%"
                size="small"
              />
            </Box>
          </Box>

          {chatsTypeToShow?.length > 0 &&
          chatsTypeToShow?.length === selectedValues?.length ? (
            <Box sx={{ marginLeft: '10px' }}>
              <DeleteIcon color={theme?.palette?.error?.main} />
            </Box>
          ) : (
            <Button
              sx={styles?.filterButton}
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              <FilterSharedIcon />
            </Button>
          )}

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
            <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
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

const SkeletonBox = () => {
  return (
    <Box sx={{ mb: 4, padding: '0px 35px' }}>
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={250} height={30} />
      </Box>
      <Skeleton
        variant="rectangular"
        width={230}
        height={15}
        sx={{ ml: 1, mt: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={230}
        height={15}
        sx={{ ml: 1, mt: 1 }}
      />
    </Box>
  );
};
export default ContactList;
