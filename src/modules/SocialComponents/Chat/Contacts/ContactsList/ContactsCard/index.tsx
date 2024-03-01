import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { DeleteIcon, PinIcon } from '@/assets/icons';

import { styles } from './ContactsCard.style';
import { AlertModals } from '@/components/AlertModals';
import { UserDefault } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setActiveChat,
  setActiveChatId,
  setActiveConversation,
  setActiveParticipant,
  setActiveReceiverId,
  setChatContacts,
  setChatMessages,
} from '@/redux/slices/chat/slice';
import { getSession } from '@/utils';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { useUpdateChatMutation } from '@/services/chat';

const ContactsCard = ({
  cardData,
  setSelectedValues,
  selectedValues,
  handleManualRefetch,
}: any) => {
  const theme = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const dispatch = useAppDispatch();
  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const currentUserId = user?._id;

  const currentUserIndex = cardData?.item?.participants?.findIndex(
    (participant: any) => participant?._id === currentUserId,
  );
  const filteredParticipants = cardData?.item?.participants?.filter(
    (participant: any) => participant?._id !== currentUserId,
  );

  const chatMode = useAppSelector(
    (state) => state?.chat?.chatModeState?.chatModeState,
  );
  const constIsModeGroup = chatMode === 'groupChat';

  const handleChatSelect = (_id: string) => {
    if (selectedValues.includes(_id)) {
      setSelectedValues(selectedValues?.filter((id: string) => id !== _id));
    } else {
      setSelectedValues([...selectedValues, _id]);
    }
  };

  const [updateChat] = useUpdateChatMutation();

  const updateChatHandler = async (requestType: any) => {
    const payloadMap: any = {
      isPinned: { isPinned: !cardData?.item?.isPinned },
      isDeleted: { isDeleted: !cardData?.item?.isDeleted },
    };
    const payload = payloadMap[requestType] || {};
    try {
      const response = await updateChat({
        body: payload,
        id: cardData?.item?.conversationId,
      })?.unwrap();
      enqueueSnackbar('successfully', {
        variant: 'success',
      });
      dispatch(
        setChatContacts({
          ...cardData?.item,
          isDeleted: response?.data?.isDeleted,
          isPinned: response?.data?.isPinned,
        }),
      );
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };
  const handleCurrentUserSelect = () => {
    dispatch(setChatMessages([])),
      dispatch(setActiveChatId(cardData?.item?._id)),
      dispatch(setActiveChat(cardData?.item)),
      dispatch(
        setActiveReceiverId(
          cardData?.item?.participants
            ?.filter((_: any, index: any) => index !== currentUserIndex)
            ?.map((participant: any) => participant?._id),
        ),
      ),
      dispatch(setActiveConversation(cardData?.item)),
      dispatch(
        setActiveParticipant({
          firstName: constIsModeGroup
            ? cardData?.item?.groupName
            : filteredParticipants[0]?.firstName,
          lastName: constIsModeGroup ? '' : filteredParticipants[0]?.lastName,
          email: constIsModeGroup ? '' : filteredParticipants[0]?.email,
          phone: constIsModeGroup ? '' : filteredParticipants[0]?.phoneNumber,
        }),
      );
  };

  useEffect(() => {
    if (selectedValues) {
      if (selectedValues.includes(cardData?.item?._id)) {
        setIsCardHover(true);
      }
    }
  }, [isCardHover, selectedValues]);

  const handleButtonClick = () => {
    handleCurrentUserSelect();
    handleManualRefetch();
  };

  const activeConversation = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  const isActiveUser = cardData?.item?.conversationId?.includes(
    activeConversation?.conversationId?.length
      ? activeConversation?.conversationId
      : null,
  );

  const handelDeleteChatList = () => {
    updateChatHandler('isDeleted');
    setIsDeleteModal(false);
  };
  return (
    <>
      <Box
        sx={styles?.contactsCardMain(isCardHover, theme, isActiveUser)}
        style={{ position: 'relative' }}
        onMouseOver={() => setIsCardHover(true)}
        onMouseLeave={() => setIsCardHover(false)}
      >
        {isCardHover && (
          <Checkbox
            onClick={() => {
              handleChatSelect(cardData?.item?._id);
            }}
            checked={
              selectedValues
                ? selectedValues?.includes(cardData?.item?._id)
                : false
            }
          />
        )}
        <Box style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              // onClick={handleCurrentUserSelect, handleManualRefetch}
              onClick={handleButtonClick}
            >
              <Image
                width={isCardHover ? 32 : 24}
                height={isCardHover ? 32 : 24}
                src={UserDefault}
                alt="avatar"
              />
              <Box sx={{ maxWidth: '220px' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: '600', whiteSpace: 'nowrap' }}
                >
                  {chatMode === 'groupChat' ? (
                    <>{cardData?.item?.groupName}</>
                  ) : (
                    <>
                      {filteredParticipants[0]?.firstName}&nbsp;
                      {filteredParticipants[0]?.lastName}
                    </>
                  )}
                </Typography>
              </Box>
              {cardData?.item?.unReadMessagesCount > 0 && (
                <Box sx={styles?.chatNotification}>
                  {cardData?.item?.unReadMessagesCount}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                position: 'absolute',
                right: '10px',
              }}
            >
              {isCardHover && (
                <Box
                  onClick={() => setIsDeleteModal(true)}
                  sx={{ cursor: 'pointer' }}
                >
                  <DeleteIcon />
                </Box>
              )}
              {cardData?.item?.isPinned ? (
                <Box
                  onClick={() => updateChatHandler('isPinned')}
                  sx={{ cursor: 'pointer' }}
                >
                  <PinIcon color={theme?.palette?.warning?.main} />
                </Box>
              ) : (
                <>
                  {isCardHover && (
                    <Box onClick={() => updateChatHandler('isPinned')}>
                      <PinIcon color={theme?.palette?.custom?.main} />
                    </Box>
                  )}
                </>
              )}
            </Box>
            {/* </Box> */}
          </Box>
          <Box
            sx={{
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              marginTop: '6px',
              marginBottom: '5px',
            }}
          >
            {cardData?.item?.lastMessage?.content}
          </Box>
          <Typography variant="body3" sx={{ color: theme?.palette?.grey[900] }}>
            {dayjs(cardData?.item?.lastMessage?.createdAt).format(
              TIME_FORMAT?.UI,
            )}
          </Typography>
        </Box>
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={handelDeleteChatList}
      />
    </>
  );
};

export default ContactsCard;
