'use client';
import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { UserDetailsDrawerI } from './EmailSettingDrawer.interface';
import { Box, Typography, useTheme } from '@mui/material';
import {
  BlueArrowIcon,
  BluePhoneIcon,
  ProfileCircleIcon,
} from '@/assets/icons';
import { Gmail_CONST } from '@/constants';

const UserDetailsDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
  isUserDetail,
}: UserDetailsDrawerI) => {
  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Related Contacts'}
      cancelText={'Cancel'}
      footer={false}
    >
      <>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {isUserDetail?.userImg || <ProfileCircleIcon />}

          <Box>
            <Box flex={1} sx={{ cursor: 'pointer' }}>
              <Typography
                variant="body1"
                fontWeight={'600'}
                color={theme?.palette?.grey[800]}
              >
                {isUserDetail?.payload?.headers?.find(
                  (header: any) => header?.name === Gmail_CONST?.FROM,
                )?.value ?? '--'}
              </Typography>
              <Typography variant="body3" color={theme?.palette?.grey[600]}>
                To:{' '}
                {isUserDetail?.payload?.headers?.find(
                  (header: any) => header?.name === Gmail_CONST?.TO,
                )?.value ?? '--'}
              </Typography>
            </Box>
          </Box>
          <Box>
            <BlueArrowIcon />
          </Box>
          <Box>
            <BluePhoneIcon />
          </Box>
        </Box>

        <Typography
          variant="body1"
          fontWeight={'600'}
          mt={3}
          mb={2}
          color={theme?.palette?.slateBlue?.main}
        >
          Details
        </Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ background: theme?.palette?.grey[100], padding: '10px' }}
        >
          <Typography
            variant="body3"
            fontWeight={'600'}
            color={theme?.palette?.blue?.dull_blue}
          >
            Email
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.light}>
            {isUserDetail?.payload?.headers?.find(
              (header: any) => header?.name === Gmail_CONST?.TO,
            )?.value ?? '--'}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ background: theme?.palette?.grey[100], padding: '10px' }}
        >
          <Typography
            variant="body3"
            fontWeight={'600'}
            color={theme?.palette?.blue?.dull_blue}
          >
            Phone
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.light}>
            {isUserDetail?.payload?.headers?.find(
              (header: any) => header?.name === Gmail_CONST?.PHONE,
            )?.value ?? '--'}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          fontWeight={'600'}
          mt={3}
          mb={2}
          color={theme?.palette?.slateBlue?.main}
        >
          Details
        </Typography>
      </>
    </CommonDrawer>
  );
};

export default UserDetailsDrawer;
