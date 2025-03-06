import React from 'react';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import { styles } from './Details.style';
import { AvatarImage } from '@/assets/images';
import { IMG_URL } from '@/config';

interface DetailsProps {
  data: any;
}

export default function Details({ data }: DetailsProps) {
  return (
    <Box sx={styles?.ownerDetailsContainer}>
      <Box sx={styles?.detailsTitle}>Owner</Box>

      <Box sx={styles?.ownerDetails}>
        <Avatar src={`${IMG_URL}${data?.avatar?.url}`} sx={styles?.ownerAvatar}>
          {data?.firstName?.charAt(0)} {data?.lastName?.charAt(0)}
        </Avatar>
        <Box sx={styles?.ownerInfo}>
          <Box sx={styles?.ownerRole}>
            {data?.firstName} {data?.lastName}
          </Box>
          <Box sx={styles?.ownerEmail}>{data?.email}</Box>
        </Box>
      </Box>

      <Box sx={styles?.otherDetails}>
        <Box sx={styles?.detailsTitle}>Other details</Box>

        <Box component={'ul'} sx={styles?.otherDetailsList}>
          <Box component={'li'}>
            <Box className="listItemLabel">Creation Date</Box>
            <Box className="listItemMeta">{data?.createdAt}</Box>
          </Box>
          <Box component={'li'}>
            <Box className="listItemLabel">Contract ID</Box>
            <Box className="listItemMeta">
              {data?.contractId || 'Not available'}
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
