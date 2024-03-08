import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { ArchiveIcon, DeleteIcon, PinIcon } from '@/assets/icons';

import { styles } from './TeamsCard.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS } from '@/constants/permission-keys';

const TeamsCard = ({ chatGroupsData, setPostMode }: any) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const theme = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);

  const handleChatSelect = (chatId: string) => {
    if (selectedValues?.includes(chatId)) {
      setSelectedValues(selectedValues?.filter((id: string) => id !== chatId));
    } else {
      setSelectedValues([...selectedValues, chatId]);
    }
  };

  useEffect(() => {
    if (selectedValues) {
      if (selectedValues?.includes(chatGroupsData?.chatId)) {
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
        <Box
          sx={{ width: '100%' }}
          onClick={() => setPostMode(chatGroupsData?.socialMode)}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                paddingRight: '5px',
              }}
            >
              {isCardHover && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <PermissionsGuard
                    permissions={[
                      AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS?.DELETE_TEAMS_MEMBERS,
                    ]}
                  >
                    <Box onClick={() => setIsDeleteModal(true)}>
                      <DeleteIcon />
                    </Box>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[
                      AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS?.PIN_MEMBER,
                    ]}
                  >
                    <PinIcon />
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[
                      AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS?.TAG_MEMBER,
                    ]}
                  >
                    <ArchiveIcon />
                  </PermissionsGuard>
                </Box>
              )}
            </Box>
          </Box>

          <Typography variant="body3" sx={{ color: theme?.palette?.grey[600] }}>
            {chatGroupsData?.lastMessage}
          </Typography>
          <br />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body3" sx={{ color: '#6E7191' }}>
              {chatGroupsData?.time}
            </Typography>
            <Image src={chatGroupsData?.socialIcon} alt="avatar" />
          </Box>
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

export default TeamsCard;
