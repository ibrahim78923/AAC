import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CreateGroupModal from './CreateGroupModal';
import GroupsCard from './GroupsCard';
import useScroll from '@/hooks/useScroll';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PlusRoundedIcon } from '@/assets/icons';
import { styles } from './Contacts.style';
// import { v4 as uuidv4 } from 'uuid';
// import { contactGroups } from './Contacts.data';
import useContactsGroup from './useContactsGroup';

const ContactsGroup = () => {
  const theme = useTheme();
  const { dataGetContactGroups } = useContactsGroup();

  const {
    containerRef,
    handleScroll,
    isRightButtonDisabled,
    isLeftButtonDisabled,
  } = useScroll();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groupModalType, setGroupModalType] = useState('');

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
            onClick={() => {
              setIsCreateModalOpen(true);
              setGroupModalType('create');
            }}
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
                info={group}
                key={group?._id}
                setGroupModalType={setGroupModalType}
                setIsCreateModalOpen={setIsCreateModalOpen}
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
        groupModalType={groupModalType}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
    </>
  );
};

export default ContactsGroup;
