'use client';
import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { RecipientI, UserDetailsDrawerI } from './EmailSettingDrawer.interface';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { BlueArrowIcon, BluePhoneIcon } from '@/assets/icons';
import ProfileNameIcon from '@/components/ProfileNameIcon';
import { v4 as uuidv4 } from 'uuid';

const UserDetailsDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
  isUserDetail,
}: UserDetailsDrawerI) => {
  const theme = useTheme();
  const nameParts =
    isUserDetail && isUserDetail?.from?.emailAddress?.name?.trim()?.split('-');
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
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box>
              {isUserDetail?.userImg || (
                <ProfileNameIcon
                  firstName={
                    isUserDetail?.from?.emailAddress?.name
                      ?.trim()
                      ?.split(' ')[0]
                  }
                  lastName={
                    (nameParts && nameParts[1]) ??
                    isUserDetail?.from?.emailAddress?.name
                      ?.trim()
                      ?.split(' ')[1]
                  }
                />
              )}
            </Box>
            <Box>
              <Box flex={1} sx={{ cursor: 'pointer' }}>
                <Typography
                  variant="body1"
                  fontWeight={'600'}
                  color={theme?.palette?.grey[800]}
                >
                  {isUserDetail?.from?.emailAddress?.name ?? '--'}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Typography variant="body3">To: </Typography>
                  {isUserDetail?.toRecipients?.map((item: RecipientI) => (
                    <Typography variant="body3" key={uuidv4()}>
                      {item?.emailAddress?.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton>
              <BlueArrowIcon />
            </IconButton>
            <IconButton>
              <BluePhoneIcon />
            </IconButton>
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
            {isUserDetail?.from?.emailAddress?.address}
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
            {isUserDetail?.from?.emailAddress?.phone ?? '--'}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          fontWeight={'600'}
          mt={3}
          mb={2}
          color={theme?.palette?.slateBlue?.main}
        >
          Email
        </Typography>
      </>
    </CommonDrawer>
  );
};

export default UserDetailsDrawer;
