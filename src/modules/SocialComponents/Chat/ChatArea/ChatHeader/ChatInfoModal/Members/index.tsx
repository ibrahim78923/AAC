import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Members.style';
import AddMembers from './AddMembers';
import { useAppSelector } from '@/redux/store';
import { UserDefault } from '@/assets/images';
import { useUpdateChatMutation } from '@/services/chat';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setActiveConversation } from '@/redux/slices/chat/slice';
import { LoadingButton } from '@mui/lab';

const Members = () => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const [isAddMembers, setIsAddMembers] = useState(false);
  const [activeUserId, setActiveUserId] = useState('');
  const [isLoadingAddParticipant, setIsLoadingAddParticipant] = useState(false);

  const [isShowAllParticipants, setIsShowAllParticipants] = useState(true);

  const [response, setResponse] = useState<any>({});
  const activeConversation = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  useEffect(() => {
    if (Object?.keys(response)?.length) {
      dispatch(
        setActiveConversation({
          ...activeConversation,
          participants: response?.data?.participants,
        }),
      );
    }
  }, [response]);

  const [updateChat, { isLoading }] = useUpdateChatMutation();
  const updateChatHandler = async (id: any) => {
    const payload = {
      participants: [id],
      isRemove: true,
      isDeleted: true,
    };
    try {
      const apiResponse = await updateChat({
        body: payload,
        id: activeConversation?._id,
      })?.unwrap();
      setResponse(apiResponse);
      enqueueSnackbar('User removed successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occurred while removing participants', {
        variant: 'error',
      });
    }
  };

  const dataToShow = isShowAllParticipants
    ? activeConversation?.participants
    : activeConversation?.participants?.slice(0, 3);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.custom?.grayish_blue }}
          >
            {activeConversation?.participants?.length} Members
          </Typography>
        </Box>
        {isAddMembers && (
          <Box sx={styles?.addMembersWrapper}>
            <AddMembers
              setIsAddMembers={setIsAddMembers}
              setIsLoadingAddParticipant={setIsLoadingAddParticipant}
            />
          </Box>
        )}
        <Box sx={{ height: '262px', overflow: 'scroll' }}>
          {dataToShow?.map((item: any) => (
            <Box sx={styles?.boxMemberCard} key={uuidv4()}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src={UserDefault} alt="user" width={24} height={24} />
                <Typography variant="body3" sx={{ fontWeight: '500' }}>
                  {item?.firstName} {item?.lastName}
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
                  <>
                    {isLoading && activeUserId === item?._id ? (
                      <>
                        <CircularProgress size={20} />
                      </>
                    ) : (
                      <Typography
                        variant="body3"
                        sx={{
                          color: theme?.palette?.error?.main,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          updateChatHandler(item?._id);
                          setActiveUserId(item?._id);
                        }}
                      >
                        Remove
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            sx={{ width: '100%' }}
            onClick={() => setIsShowAllParticipants(!isShowAllParticipants)}
          >
            {isShowAllParticipants
              ? 'View Less'
              : `Show ${activeConversation?.participants?.length - 3} more`}
          </Button>
          <LoadingButton
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => setIsAddMembers(true)}
            loading={isLoadingAddParticipant}
          >
            Add Participants
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default Members;
