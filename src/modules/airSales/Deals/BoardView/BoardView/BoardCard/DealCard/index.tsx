import { Box, Typography, Avatar, Checkbox, AvatarGroup } from '@mui/material';

import { styles } from './DealCard.style';

import {
  CallIcon,
  EmailDealsIcon,
  MeetingDealsIcon,
  NotesDealsIcon,
  TaskDealsIcon,
} from '@/assets/icons';

const DealCard = () => {
  return (
    <Box sx={styles?.card}>
      <Box sx={styles?.cardHeader}>
        <Box sx={styles?.dealOwner}>
          {/* <Avatar sx={styles.avatar} alt="Remy Sharp" src={avatarImage.src}>R</Avatar> */}
          <Box>
            <Typography sx={styles?.ownerName}>Olivia Rhye</Typography>
            <Box sx={styles?.orgName}>Air Apple Cart</Box>
          </Box>
        </Box>
        <Box>
          <Checkbox />
        </Box>
      </Box>

      <Box sx={styles?.cardBody}>
        <Box sx={styles?.spaceBetween}>
          <Typography sx={styles?.label} variant="body3">
            Amount
          </Typography>
          <Typography sx={styles?.title} variant="body3">
            £20
          </Typography>
        </Box>
        <Box sx={styles?.spaceBetween}>
          <Typography sx={styles?.label} variant="body3">
            Close Date
          </Typography>
          <Typography sx={styles?.title} variant="body3">
            03/10/2023
          </Typography>
        </Box>
        <Box sx={styles?.spaceBetween}>
          <Typography sx={styles?.label} variant="body3">
            Priority
          </Typography>
          <Typography
            sx={{ fontWeight: '600', color: 'warning.main' }}
            variant="body3"
          >
            Medium
          </Typography>
        </Box>
      </Box>

      <Box sx={styles?.cardFooter}>
        <Box component="ul" sx={styles?.activities}>
          <Box component="li">
            <EmailDealsIcon />
          </Box>
          <Box component="li">
            <CallIcon />
          </Box>
          <Box component="li">
            <MeetingDealsIcon />
          </Box>
          <Box component="li">
            <NotesDealsIcon />
          </Box>
          <Box component="li">
            <TaskDealsIcon />
          </Box>
        </Box>
        <Box>
          <AvatarGroup sx={styles?.avatarGroup} max={2}>
            <Avatar sx={{ backgroundColor: '#000' }}>A</Avatar>
            <Avatar>A</Avatar>
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default DealCard;
