import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { groupMembers } from '@/mock/modules/SocialComponents/Chat';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Members.style';
import AddMembers from './AddMembers';
import { useAppSelector } from '@/redux/store';
import { UserDefault } from '@/assets/images';
import { useUpdateChatMutation } from '@/services/chat';
import { enqueueSnackbar } from 'notistack';

const Members = () => {
  const theme = useTheme();
  const [isAddMembers, setIsAddMembers] = useState(false);

  const activeConversation = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  const [updateChat] = useUpdateChatMutation();
  const updateChatHandler = async (id: any) => {
    const updatedParticipants = activeConversation.participants.filter(
      (participant: any) => participant._id !== id,
    );

    const payload = {
      ...activeConversation,
      participants: updatedParticipants,
    };

    try {
      await updateChat({
        body: payload,
        id: activeConversation?.conversationId,
      })?.unwrap();
      enqueueSnackbar('successfully', {
        variant: 'success',
      });
      // dispatch(
      //   setActiveConversation({
      //     ...activeConversation,
      //     isDeleted: response?.data?.isDeleted,
      //     isArchived: response?.data?.isArchived,
      //     isMuted: response?.data?.isMuted,
      //     unRead: response?.data?.unRead,
      //   }),
      // )
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.custom?.grayish_blue }}
          >
            {groupMembers?.length} Members
          </Typography>
        </Box>
        {isAddMembers && (
          <Box sx={styles?.addMembersWrapper}>
            <AddMembers setIsAddMembers={setIsAddMembers} />
          </Box>
        )}
        <Box sx={{ height: '262px', overflow: 'scroll' }}>
          {activeConversation.participants.slice(0, 5).map((item: any) => (
            <Box sx={styles.boxMemberCard} key={uuidv4()}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src={UserDefault} alt="user" width={24} height={24} />
                <Typography variant="body3" sx={{ fontWeight: '500' }}>
                  {item.firstName} {item.lastName}
                </Typography>
              </Box>
              <Box>
                {activeConversation?.groupAdmins.includes(item?._id) ? (
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.primary?.main }}
                  >
                    Admin
                  </Typography>
                ) : (
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.error?.main }}
                    onClick={() => updateChatHandler(item?._id)}
                  >
                    Remove
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button sx={{ width: '100%' }}>View Less</Button>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => setIsAddMembers(true)}
          >
            Add Participation
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Members;
