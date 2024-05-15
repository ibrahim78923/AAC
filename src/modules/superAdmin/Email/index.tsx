import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { styles } from './Email.styles';
import { Settings } from '@mui/icons-material';
import { EmailInfoIcon, PencilEditIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { emailsDataArray } from './Email.data';
import { OthersMail } from '@/assets/images';
import Image from 'next/image';
import EmailSettingDrawer from './EmailSettingDrawer';
import OtherMailDrawer from './OtherMailDrawer';
import { useGetMailFoldersQuery } from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';
import { END_POINTS } from '@/routesConstants/endpoints';
import { useRouter } from 'next/router';
import { DRAWER_TYPES } from '@/constants/strings';

const Email = () => {
  const theme = useTheme();

  const [isEmailSettingsDrawerOpen, setIsEmailSettingsDrawerOpen] =
    useState(false);

  const [isOtherEmailDrawerOpen, setIsOtherEmailDrawerOpen] = useState(false);
  const [isOtherEmailDrawerType, setIsOtherEmailDrawerType] = useState('');

  const { data: foldersData, isLoading } = useGetMailFoldersQuery({});

  const router = useRouter();
  const handelRedirect = () => {
    if (!isLoading) {
      if (foldersData?.data) {
        router.push(END_POINTS?.CONVERSATION_EMAIL_VIEW);
      } else {
        enqueueSnackbar('Unable to configure email', {
          variant: 'error',
        });
        setIsOtherEmailDrawerOpen(true);
        setIsOtherEmailDrawerType(DRAWER_TYPES?.ADD);
      }
    }
  };

  return (
    <>
      <>
        <Box sx={styles?.emailWrapper}>
          <Box>
            <Typography variant="h3" sx={styles?.heading(theme)}>
              Connect Your Inbox to Air Applecart
            </Typography>
            <Typography variant="body2" sx={styles?.paragraph(theme)}>
              Manage your work email in a private inbox that stays in sync with
              your email provider.
            </Typography>
          </Box>
          <Box
            sx={styles?.settingIcon}
            onClick={() => setIsEmailSettingsDrawerOpen(true)}
          >
            <Settings />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Email Settings
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{ color: theme?.palette?.slateBlue?.main }}
        >
          Select Your Email Provider:
        </Typography>
        <Typography variant="body2" sx={styles?.emailAlert}>
          <EmailInfoIcon />
          Dummy@gmail.com is Hosted by Gmail. We recommend you select this
          provider
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={'15px'}>
          {emailsDataArray?.map((item: any) => (
            <Box key={uuidv4()} sx={styles?.emailArray(theme)}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: 'fit-content',
                  padding: '16px',
                }}
              >
                {item?.icon}
                <Typography variant="h6">{item?.label}</Typography>
              </Box>
            </Box>
          ))}
          <Box sx={styles?.emailArray}>
            <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
              {isLoading ? (
                <CircularProgress size={20} thickness={4} />
              ) : (
                <>
                  {foldersData?.data && (
                    <>
                      <IconButton
                        onClick={() => {
                          setIsOtherEmailDrawerOpen(true);
                          setIsOtherEmailDrawerType(DRAWER_TYPES?.EDIT);
                        }}
                      >
                        <PencilEditIcon />
                      </IconButton>
                    </>
                  )}
                </>
              )}
            </Box>
            <Box
              onClick={handelRedirect}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: 'fit-content',
                padding: '16px',
              }}
            >
              <Image src={OthersMail} alt="other" />
              <Typography variant="h6">Others</Typography>
            </Box>
          </Box>
        </Box>
        <EmailSettingDrawer
          isOpenDrawer={isEmailSettingsDrawerOpen}
          setIsOpenDrawer={setIsEmailSettingsDrawerOpen}
        />
        <OtherMailDrawer
          openDrawer={isOtherEmailDrawerOpen}
          setOpenDrawer={setIsOtherEmailDrawerOpen}
          isOtherEmailDrawerType={isOtherEmailDrawerType}
          setIsOtherEmailDrawerType={setIsOtherEmailDrawerType}
        />
      </>
      {/* <EmailChat /> */}
    </>
  );
};

export default Email;
