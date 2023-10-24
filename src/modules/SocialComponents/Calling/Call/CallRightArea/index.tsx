import React from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { styles } from './CallRightArea.style';
import { CallFilledImage } from '@/assets/images';
import Image from 'next/image';
import UserDetailCard from '../UserDetailCard';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns } from './CallRightArea.data';

const CallRightArea = ({ callsMode, activeCallsSelectedData }: any) => {
  const theme = useTheme();

  const getColumns = columns();

  return (
    <Box>
      {callsMode === 'calls' &&
        (activeCallsSelectedData ? (
          <Box>
            <UserDetailCard />
            <Box sx={{ padding: '20px' }}>
              <TanstackTable
                columns={getColumns}
                data={activeCallsSelectedData?.callingDetails}
              />
            </Box>
          </Box>
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
              <Box sx={styles.rightWrapper}>
                <Box sx={styles.callingWrapper}>calls</Box>
              </Box>
            </Grid>
          </Grid>
        ))}
    </Box>
  );
};

export default CallRightArea;
