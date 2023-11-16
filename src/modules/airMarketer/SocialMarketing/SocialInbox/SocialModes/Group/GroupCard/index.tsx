import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { DeleteIcon, PinIcon } from '@/assets/icons';

import { styles } from './GroupCard.style';

const GroupCard = ({ chatGroupsData }: any) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const theme = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);

  const handleChatSelect = (chatId: string) => {
    if (selectedValues.includes(chatId)) {
      setSelectedValues(selectedValues?.filter((id: string) => id !== chatId));
    } else {
      setSelectedValues([...selectedValues, chatId]);
    }
  };

  useEffect(() => {
    if (selectedValues) {
      if (selectedValues.includes(chatGroupsData?.chatId)) {
        setIsCardHover(true);
      }
    }
  }, [isCardHover, selectedValues]);

  return (
    <>
      <Box
        sx={styles?.contactsCardMain(isCardHover)}
        onMouseOver={() => setIsCardHover(true)}
        onMouseLeave={() => setIsCardHover(false)}
      >
        {isCardHover && (
          <Checkbox
            onClick={() => {
              handleChatSelect(chatGroupsData?.chatId);
            }}
            checked={
              selectedValues
                ? selectedValues?.includes(chatGroupsData?.chatId)
                : false
            }
          />
        )}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image
                width={isCardHover ? 32 : 24}
                height={isCardHover ? 32 : 24}
                src={chatGroupsData?.userAvatar}
                alt="avatar"
              />
              <Box sx={{ maxWidth: '210px' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: '600', whiteSpace: 'nowrap' }}
                >
                  {chatGroupsData?.userName}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {isCardHover && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Box onClick={() => setIsDeleteModal(true)}>
                    <DeleteIcon />
                  </Box>
                  <PinIcon />
                </Box>
              )}
            </Box>
          </Box>
          <Typography variant="body3" sx={{ color: theme?.palette?.grey[600] }}>
            {chatGroupsData?.lastMessage}
          </Typography>
          <br />
          <Typography variant="body3" sx={{ color: '#6E7191' }}>
            {chatGroupsData?.time}
          </Typography>
        </Box>
      </Box>

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

export default GroupCard;
