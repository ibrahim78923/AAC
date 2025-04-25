import React from 'react';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { styles } from './Details.style';
import { IMG_URL } from '@/config';

interface DetailsProps {
  data: any;
}

export default function Details({ data }: DetailsProps) {
  const { ownerData, createdAt, contractId, sharedWithUsers } = data;

  return (
    <Box sx={styles?.ownerDetailsContainer}>
      <Box sx={styles?.detailsTitle}>Owner</Box>

      <Box sx={styles?.ownerDetails}>
        <Avatar
          src={`${IMG_URL}${ownerData?.avatar?.url}`}
          sx={styles?.ownerAvatar}
        >
          {ownerData?.firstName?.charAt(0)} {ownerData?.lastName?.charAt(0)}
        </Avatar>
        <Box sx={styles?.ownerInfo}>
          <Box sx={styles?.ownerRole}>
            {ownerData?.firstName} {ownerData?.lastName}
          </Box>
          <Box sx={styles?.ownerEmail}>{ownerData?.email}</Box>
        </Box>
      </Box>

      <Box sx={styles?.otherDetails}>
        <Box sx={styles?.detailsTitle}>Other details</Box>

        <Box component={'ul'} sx={styles?.otherDetailsList}>
          <Box component={'li'}>
            <Box className="listItemLabel">Creation Date</Box>
            <Box className="listItemMeta">{createdAt}</Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">Contract ID</Box>
            <Box className="listItemMeta">{contractId || 'N/A'}</Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">
              Attachment(s) text extraction (OCR) status
            </Box>
            <Box className="listItemMeta">Completed</Box>
          </Box>
        </Box>
      </Box>

      {sharedWithUsers?.length > 0 && (
        <Box sx={styles?.userAccessDetails}>
          <Box sx={styles?.detailsTitle}>Users with access</Box>
          <Box sx={styles?.usrsAccess}>
            <AvatarGroup max={8} sx={styles?.avatarGroup}>
              {sharedWithUsers?.map((user: any) => (
                <Avatar
                  key={user?.userId}
                  alt={`${user?.sharedUserData?.firstName} ${user?.sharedUserData?.lastName}`}
                  src={`${IMG_URL}${user?.sharedUserData?.avatar?.url}`}
                >
                  {user?.sharedUserData?.firstName?.charAt(0)}{' '}
                  {user?.sharedUserData?.lastName?.charAt(0)}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
        </Box>
      )}
    </Box>
  );
}
