import Image from 'next/image';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import DetailTimePicker from './TimePicker';
import {
  ViewDetailBackArrowIcon,
  ViewDetailCallIcon,
  ViewDetailKababMenuIcon,
  ViewDetailMeetingIcon,
  ViewDetailVuesaxIcon,
} from '@/assets/icons';
import { styles } from './Header.style';
import { SmsImage, VuesaxErrorImage } from '@/assets/images';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useState } from 'react';
import { AddMeetingsDrawer } from '../Meetings/AddMeetingsDrawer';
import { NewEmailDrawer } from './NewEmailDrawer';
import { useHeaderData } from './useHeader';

const Header = () => {
  const { data: detail } = useHeaderData();
  const theme: any = useTheme();
  const { push } = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleView = () => {
    setIsIconVisible(!isIconVisible);
  };

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
            gap: 1,
          }}
        >
          <Box
            onClick={() => push(AIR_SERVICES?.TICKETS)}
            sx={{ cursor: 'pointer' }}
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            {detail?.data?.[0]?.ticketIdNumber}
          </Typography>
          <Typography variant="h6" component="span">
            {detail?.data?.[0]?.subject}
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <Box sx={styles?.iconBoxStyling} onClick={toggleView}>
            {isIconVisible ? (
              <ViewDetailVuesaxIcon />
            ) : (
              <Image
                src={VuesaxErrorImage}
                alt={'VuesaxErrorImage'}
                height={24}
                width={24}
              />
            )}
          </Box>

          <Box sx={styles?.iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={styles?.iconBoxStyling} onClick={() => setDrawerOpen(true)}>
            <ViewDetailMeetingIcon />
          </Box>
          <AddMeetingsDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <Box sx={styles?.iconBoxStyling}>
            <ViewDetailCallIcon />
          </Box>
          <Box
            sx={styles?.iconBoxStyling}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Image src={SmsImage} width={24} height={24} alt="Badge" />
          </Box>
          <NewEmailDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
          <Box sx={styles?.iconKabaMenuStyle}>
            <ViewDetailKababMenuIcon />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
