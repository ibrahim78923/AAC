import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { DeleteIcon, PinIcon } from '@/assets/icons';

import { styles } from './ContactsCard.style';
import { AlertModals } from '@/components/AlertModals';

const ContactsCard = ({ cardData, setSelectedValues, selectedValues }: any) => {
  const theme = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleOptionSelect = (value: string) => {
    if (selectedValues && selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val: string) => val !== value));
    } else {
      setSelectedValues([...(selectedValues || []), value]);
    }
  };

  return (
    <>
      <Box
        sx={styles.contactsCardMain(isCardHover)}
        onMouseOver={() => setIsCardHover(true)}
        onMouseLeave={() => setIsCardHover(false)}
      >
        {isCardHover && (
          <Checkbox
            onClick={() => {
              handleOptionSelect(cardData.chatID);
            }}
            checked={
              selectedValues ? selectedValues.includes(cardData.chatID) : false
            }
          />
        )}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image
                width={isCardHover ? 32 : 24}
                height={isCardHover ? 32 : 24}
                src={cardData.userAvatar}
                alt="avatar"
              />
              <Box sx={{ maxWidth: '210px' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: '600', whiteSpace: 'nowrap' }}
                >
                  {cardData?.userName}
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
              <Box sx={styles.chatNotification}>12</Box>
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
          <Typography variant="body3" sx={{ color: theme.palette.grey[600] }}>
            {cardData.lastMessage}
          </Typography>
          <br />
          <Typography variant="body3" sx={{ color: '#6E7191' }}>
            {cardData.time}
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

export default ContactsCard;
