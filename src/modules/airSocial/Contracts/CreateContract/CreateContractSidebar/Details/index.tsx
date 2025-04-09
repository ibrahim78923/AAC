import React from 'react';
import { Avatar, AvatarGroup, Box, Tooltip } from '@mui/material';
import { styles } from './Details.style';
import { getSession } from '@/utils';
import { IMG_URL } from '@/config';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export default function Details({ dataContractById }: any) {
  const { user } = getSession();
  return (
    <Box sx={styles?.ownerDetailsContainer}>
      <Box sx={styles?.detailsTitle}>Owner</Box>

      <Box sx={styles?.ownerDetails}>
        <Avatar src={`${IMG_URL}${user?.avatar?.url}`} sx={styles?.ownerAvatar}>
          {'JD'}
        </Avatar>
        <Box sx={styles?.ownerInfo}>
          <Box sx={styles?.ownerRole}>
            {user?.firstName} {user?.lastName}
          </Box>
          <Box sx={styles?.ownerEmail}>{user?.email}</Box>
        </Box>
      </Box>

      <Box sx={styles?.otherDetails}>
        <Box sx={styles?.detailsTitle}>Other details</Box>

        <Box component={'ul'} sx={styles?.otherDetailsList}>
          <Box component={'li'}>
            <Box className="listItemLabel">Creation Date</Box>
            <Box className="listItemMeta">
              {dayjs(dataContractById?.data?.createdAt)?.format(
                DATE_TIME_FORMAT?.DD_MMM_YYYY,
              )}
            </Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">Contract ID</Box>
            <Box className="listItemMeta">{dataContractById?.data?._id}</Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">
              Attachment(s) text extraction (OCR) status
            </Box>
            <Box className="listItemMeta">{dataContractById?.data?.status}</Box>
          </Box>
        </Box>
      </Box>

      <Box sx={styles?.userAccessDetails}>
        <Box sx={styles?.detailsTitle}>Users with access</Box>
        {dataContractById?.data?.sharedWithUsers?.length < 1 ? (
          <Box sx={styles?.ownerRole}>no user with access</Box>
        ) : (
          <Box sx={styles?.usrsAccess}>
            <AvatarGroup max={8} sx={styles?.avatarGroup}>
              {dataContractById?.data?.sharedWithUsers?.map(
                (sharedUser: any) => {
                  const initials = `${
                    sharedUser?.sharedUserData?.firstName?.[0] || ''
                  }${sharedUser?.sharedUserData?.lastName?.[0] || ''}`;
                  const fullName = `${
                    sharedUser?.sharedUserData?.firstName || ''
                  } ${sharedUser?.sharedUserData?.lastName || ''}`;
                  return (
                    <Tooltip key={uuidv4()} title={fullName} arrow>
                      <Avatar
                        alt={`${sharedUser?.sharedUserData?.firstName} ${sharedUser?.sharedUserData?.lastName}`}
                        src={
                          sharedUser?.sharedUserData?.avatar?.url
                            ? `${IMG_URL}${sharedUser?.sharedUserData?.avatar?.url}`
                            : initials
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        {!sharedUser?.sharedUserData?.avatar?.url && initials}
                      </Avatar>
                    </Tooltip>
                  );
                },
              )}
            </AvatarGroup>
          </Box>
        )}
      </Box>
    </Box>
  );
}
