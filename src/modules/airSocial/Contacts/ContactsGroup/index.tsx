import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CreateGroupModal from './CreateGroupModal';
import GroupsCard from './GroupsCard';
import useScroll from '@/hooks/useScroll';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PlusRoundedIcon } from '@/assets/icons';
import { styles } from './Contacts.style';
import useContactsGroup from './useContactsGroup';

const ContactsGroup = () => {
  const theme = useTheme();
  const {
    dataGetContactGroups,
    isCreateModalOpen,
    modalTitle,
    handleOpenModalCreate,
    handleCloseModalCreate,
    methodsCreateGroup,
    handleCreateGroupSubmit,
    loadingCreateGroup,
    loadingGetContacts,
    dataGetContacts,
    selectedUsers,
    setSelectedUsers,
    setSearchValue,
  } = useContactsGroup();

  const {
    containerRef,
    handleScroll,
    isRightButtonDisabled,
    isLeftButtonDisabled,
  } = useScroll();

  return (
    <>
      <Typography variant="h4" mb={2}>
        Contact Groups
      </Typography>
      <Box sx={{ position: 'relative', mb: 2 }}>
        {!isLeftButtonDisabled && (
          <Button
            sx={styles?.btnLeft}
            onClick={() => handleScroll(-100)}
            disabled={isLeftButtonDisabled}
          >
            <ArrowCircleLeftIcon />
          </Button>
        )}
        <Box sx={styles?.flexCards} ref={containerRef}>
          <Box
            sx={styles?.createGroupCard}
            onClick={() => handleOpenModalCreate('Create', null)}
          >
            <PlusRoundedIcon />
            <Typography
              sx={{
                fontSize: '12px',
                color: theme?.palette?.primary?.main,
                fontWeight: 500,
              }}
            >
              Create Group
            </Typography>
          </Box>
          <>
            {dataGetContactGroups?.data?.contactgroups?.map((group: any) => (
              <GroupsCard
                key={group?._id}
                info={group}
                handleOpenModal={handleOpenModalCreate}
              />
            ))}
          </>
        </Box>

        <Button
          sx={styles?.btnRight}
          onClick={() => handleScroll(100)}
          disabled={isRightButtonDisabled}
        >
          <ArrowCircleRightIcon />
        </Button>
      </Box>

      <CreateGroupModal
        title={modalTitle}
        isOpen={isCreateModalOpen}
        onClose={handleCloseModalCreate}
        methods={methodsCreateGroup}
        onSubmit={handleCreateGroupSubmit}
        contactList={dataGetContacts?.data?.contacts}
        loadingTable={loadingGetContacts}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setSearchValue={setSearchValue}
        loadingPost={loadingCreateGroup}
      />
    </>
  );
};

export default ContactsGroup;
