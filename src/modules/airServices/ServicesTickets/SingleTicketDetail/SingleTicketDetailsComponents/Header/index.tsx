import Image from 'next/image';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import SmsImage from '@/assets/images/modules/viewdetails/sms-image.png';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import ViewDetailCallIcon from '@/assets/icons/modules/view-detail-Icon/view-details-call-icon';
import ViewDetailKababMenuIcon from '@/assets/icons/modules/view-detail-Icon/view-details-kababmenu-icon';
import ViewDetailMeetingIcon from '@/assets/icons/modules/view-detail-Icon/view-details-meeting-icon';
import DetailTimePicker from './TimePicker';

import { ViewDetailVuesaxIcon } from '@/assets/icons';
import { styles } from './Header.style';

export default function Header() {
  const theme: any = useTheme();

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        maxWidth={'100%'}
      >
        <Grid
          item
          sx={{
            display: 'flex',
          }}
        >
          <ViewDetailBackArrowIcon />
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            #INC-3-
          </Typography>
          <Typography variant="h6" component="span">
            What’s wrong with my email?
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <Box sx={styles?.iconBoxStyling}>
            <ViewDetailVuesaxIcon />
          </Box>
          <Box sx={styles?.iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={styles?.iconBoxStyling}>
            <ViewDetailMeetingIcon />
          </Box>
          <Box sx={styles?.iconBoxStyling}>
            <ViewDetailCallIcon />
          </Box>
          <Box sx={styles?.iconBoxStyling}>
            <Image src={SmsImage} width={24} height={24} alt="Badge" />
          </Box>
          <Box sx={styles?.iconKabaMenuStyle}>
            <ViewDetailKababMenuIcon />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
