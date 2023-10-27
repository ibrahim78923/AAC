import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import UserDetailCard from '../UserDetailCard';
import DialingPad from './DialingPad';
import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns } from './CallRightArea.data';

import { CallFilledImage, UsersAvatarRoundedImage } from '@/assets/images';
import { ArrowBackIcon } from '@/assets/icons';

import { styles } from './CallRightArea.style';
import ChatCalling from './ChatCalling';

const CallRightArea = ({
  callsMode,
  activeCallsSelectedData,
  isActiveCalling,

  activeMessageData,
}: any) => {
  const theme = useTheme();

  const getColumns = columns();

  return (
    <Box>
      {callsMode === 'calls' &&
        (activeCallsSelectedData ? (
          isActiveCalling ? (
            <Box sx={{ padding: '20px' }}>
              <ArrowBackIcon />
              <Box
                sx={{
                  height: '70vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={styles.callingAreaBx(theme)}>
                  <Typography
                    variant="h2"
                    fontWeight={500}
                    textAlign={'center'}
                    color={theme.palette.custom.grayish_blue}
                  >
                    {activeCallsSelectedData?.phone}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    textAlign={'center'}
                    mb={2}
                    color={theme.palette.custom.bright}
                  >
                    Calling...
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={UsersAvatarRoundedImage}
                      width={96}
                      height={96}
                      style={{ borderRadius: '50%' }}
                      alt="user"
                    />
                    <Typography
                      variant="h3"
                      color={theme.palette.custom.grayish_blue}
                    >
                      Johny Doe
                    </Typography>
                  </Box>
                  <Box>
                    <Grid container spacing={2}></Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <UserDetailCard
                image={activeCallsSelectedData?.userImage}
                name={activeCallsSelectedData?.userName}
                phone={activeCallsSelectedData?.phone}
              />
              <Box sx={{ padding: '20px' }}>
                <TanstackTable
                  columns={getColumns}
                  data={activeCallsSelectedData?.callingDetails}
                />
              </Box>
            </Box>
          )
        ) : (
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Box sx={styles.leftWrapper}>
                <Box sx={styles.leftInset}>
                  <Image src={CallFilledImage} alt="call" />
                  <Typography
                    variant="h2"
                    textAlign={'center'}
                    color={theme.palette.grey[800]}
                  >
                    Air AppleCart Calling Feature
                  </Typography>
                  <Typography
                    variant="h4"
                    color={theme.palette.custom.grayish_blue}
                    fontWeight={500}
                    textAlign={'center'}
                  >
                    Increase your productivity by using our real-time web
                    calling feature.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Box sx={styles.rightWrapper(theme)}>
                <Box sx={styles.callingWrapper(theme)}>
                  <DialingPad />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}

      {callsMode === 'messages' && activeMessageData && (
        <ChatCalling activeMessageData={activeMessageData} />
      )}
    </Box>
  );
};

export default CallRightArea;
