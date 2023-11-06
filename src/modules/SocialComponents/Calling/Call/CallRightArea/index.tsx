import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import UserDetailCard from '../UserDetailCard';
import DialingPad from './DialingPad';
import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns } from './CallRightArea.data';

import { CallFilledImage } from '@/assets/images';

import { styles } from './CallRightArea.style';
import ChatCalling from './ChatCalling';
import CallProcessCard from './CallProcessCard';

const CallRightArea = ({
  callsMode,
  activeCallsSelectedData,
  isActiveCalling,
  activeMessageData,
  setIsActiveCalling,
  setActiveCallsSelectedData,
}: any) => {
  const theme = useTheme();
  const getColumns = columns();
  return (
    <Box>
      {callsMode === 'calls' &&
        (activeCallsSelectedData && activeCallsSelectedData ? (
          isActiveCalling ? (
            <CallProcessCard
              phoneNo={activeCallsSelectedData.phone}
              name={activeCallsSelectedData.userName}
              setIsActiveCalling={setIsActiveCalling}
            />
          ) : (
            <Box>
              <UserDetailCard
                image={activeCallsSelectedData?.userImage}
                name={activeCallsSelectedData?.userName}
                phone={activeCallsSelectedData?.phone}
                isMessage={true}
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

      {callsMode === 'messages' &&
        activeMessageData &&
        (isActiveCalling ? (
          <CallProcessCard
            phoneNo={activeCallsSelectedData.userPhone}
            name={activeCallsSelectedData.userName}
            setIsActiveCalling={setIsActiveCalling}
          />
        ) : (
          <ChatCalling
            isActiveCalling={isActiveCalling}
            setActiveCallsSelectedData={setActiveCallsSelectedData}
            setIsActiveCalling={setIsActiveCalling}
            activeMessageData={activeMessageData}
          />
        ))}
    </Box>
  );
};

export default CallRightArea;
