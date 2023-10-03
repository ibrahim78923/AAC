import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import ViewDetailVuesaxIcon from '../../../assets/icons/modules/view-detail-Icon/view-details-vuesax-icon';
import {
  ViewDetailBackArrowIcon,
  ViewDetailCallIcon,
  ViewDetailKababMenuIcon,
  ViewDetailMeetingIcon,
} from '@/assets/icons';
import SmsImage from '@/assets/images/modules/viewdetails/sms-image.png';
import DetailTimePicker from './TimePicker';

export default function ToofPage() {
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
          <ViewDetailVuesaxIcon />
          <DetailTimePicker />
          <ViewDetailMeetingIcon />
          <ViewDetailCallIcon />
          <Image src={SmsImage} width={24} height={24} alt="Badge" />
          <ViewDetailKababMenuIcon />
        </Grid>
      </Grid>
    </>
  );
}
