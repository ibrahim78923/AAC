import { Grid, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import ViewDetailVuesaxIcon from '../../assets/icons/modules/view-detail-Icon/view-details-vuesax-icon';
import CustomTimePicker from './timepicker';
import {
  ViewDetailBackArrowIcon,
  ViewDetailCallIcon,
  ViewDetailKababMenuIcon,
  ViewDetailMeetingIcon,
} from '@/assets/icons';
import SmsImage from '@/assets/images/modules/viewdetails/sms-image.png';
import Image from 'next/image';

export default function ToofPage() {
  const theme = useTheme();
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
          <ViewDetailVuesaxIcon />
          <CustomTimePicker />

          <ViewDetailMeetingIcon />
          <ViewDetailCallIcon />
          <Image src={SmsImage} width={24} height={24} alt="Badge" />
          <ViewDetailKababMenuIcon />
        </Grid>
      </Grid>
    </>
  );
}
