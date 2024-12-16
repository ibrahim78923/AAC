import React from 'react';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { styles } from './Details.style';
import { AvatarImage } from '@/assets/images';

export default function Details() {
  return (
    <Box sx={styles?.ownerDetailsContainer}>
      <Box sx={styles?.detailsTitle}>Owner</Box>

      <Box sx={styles?.ownerDetails}>
        <Avatar src={AvatarImage.src} sx={styles?.ownerAvatar}>
          {'JD'}
        </Avatar>
        <Box sx={styles?.ownerInfo}>
          <Box sx={styles?.ownerRole}>John Doe</Box>
          <Box sx={styles?.ownerEmail}>compliance@orcalo.co.uk</Box>
        </Box>
      </Box>

      <Box sx={styles?.otherDetails}>
        <Box sx={styles?.detailsTitle}>Other details</Box>

        <Box component={'ul'} sx={styles?.otherDetailsList}>
          <Box component={'li'}>
            <Box className="listItemLabel">Creation Date</Box>
            <Box className="listItemMeta">12 Jul 2023</Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">Contract ID</Box>
            <Box className="listItemMeta">
              f3ce2e1e-4e0c-4f45-96f5-91d1c7356d61
            </Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">
              Attachment(s) text extraction (OCR) status
            </Box>
            <Box className="listItemMeta">Completed</Box>
          </Box>
        </Box>
      </Box>

      <Box sx={styles?.userAccessDetails}>
        <Box sx={styles?.detailsTitle}>Users with access</Box>
        <Box sx={styles?.usrsAccess}>
          <AvatarGroup max={8} sx={styles?.avatarGroup}>
            <Avatar alt="Remy Sharp" src={AvatarImage.src} />
            <Avatar alt="Travis Howard" src={AvatarImage.src} />
            <Avatar alt="Cindy Baker" src={AvatarImage.src} />
            <Avatar alt="Agnes Walker" src={AvatarImage.src} />
            <Avatar alt="Trevor Henderson" src={AvatarImage.src} />
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  );
}
