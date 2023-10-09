import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { Grid, Typography, Box } from '@mui/material';
import SmsImage from '@/assets/images/modules/viewdetails/sms-image.png';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import ViewDetailCallIcon from '@/assets/icons/modules/view-detail-Icon/view-details-call-icon';
import ViewDetailKababMenuIcon from '@/assets/icons/modules/view-detail-Icon/view-details-kababmenu-icon';
import ViewDetailMeetingIcon from '@/assets/icons/modules/view-detail-Icon/view-details-meeting-icon';
import DetailTimePicker from './TimePicker';
import { headerStyle } from './Header.styles';
import { ViewDetailVuesaxIcon } from '@/assets/icons';

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
          <Box sx={headerStyle?.iconBoxStyling}>
            <ViewDetailVuesaxIcon />
          </Box>
          <Box sx={headerStyle?.iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={headerStyle?.iconBoxStyling}>
            <ViewDetailMeetingIcon />
          </Box>
          <Box sx={headerStyle?.iconBoxStyling}>
            <ViewDetailCallIcon />
          </Box>
          <Box sx={headerStyle?.iconBoxStyling}>
            <Image src={SmsImage} width={24} height={24} alt="Badge" />
          </Box>
          <Box sx={headerStyle?.iconKabaMenuStyle}>
            <ViewDetailKababMenuIcon />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
