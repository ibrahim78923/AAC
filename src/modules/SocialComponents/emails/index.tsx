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
import {
  EmailInfoIcon,
  GmailIcon,
  OutlookIcon,
  PencilEditIcon,
} from '@/assets/icons';
import { OthersMail } from '@/assets/images';
import Image from 'next/image';
import OtherMailDrawer from './OthersMail/OtherMailDrawer';
import { useGetMailFoldersQuery } from '@/services/commonFeatures/email/others';
import { enqueueSnackbar } from 'notistack';
import { END_POINTS } from '@/routesConstants/endpoints';
import { useRouter } from 'next/router';
import { DRAWER_TYPES } from '@/constants/strings';
import {
  useGetAuthURLOutlookQuery,
  useGetMailFoldersOutlookQuery,
} from '@/services/commonFeatures/email/outlook';
import {
  useGetAuthURLGmailQuery,
  useGetGmailFoldersQuery,
} from '@/services/commonFeatures/email/gmail';
import EmailSettingDrawer from './EmailSettingDrawer';

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
        router.push(END_POINTS?.CONVERSATION_OTHERS_EMAIL_VIEW);
      } else {
        enqueueSnackbar('Unable to configure email', {
          variant: 'error',
        });
        setIsOtherEmailDrawerOpen(true);
        setIsOtherEmailDrawerType(DRAWER_TYPES?.ADD);
      }
    }
  };

  const { data: outlookFoldersData, isLoading: outlookFoldersLoading } =
    useGetMailFoldersOutlookQuery({});
  const { data: gmailFoldersData, isLoading: gmailFoldersLoading } =
    useGetGmailFoldersQuery({});

  // outlook
  const { data: authURLOutlook } = useGetAuthURLOutlookQuery({});
  const handleOutLookClick = () => {
    if (!outlookFoldersLoading) {
      if (outlookFoldersData?.data?.length > 0) {
        router.push(END_POINTS?.CONVERSATION_OUTLOOK_EMAIL_VIEW);
      } else {
        const oauthUrl = `${authURLOutlook?.data}`;
        window.open(oauthUrl);
      }
    }
  };
  // gmail
  const { data: authUrlData } = useGetAuthURLGmailQuery({});
  const handleGmailClick = () => {
    if (!gmailFoldersLoading) {
      if (gmailFoldersData?.data?.labels?.length > 0) {
        router.push(END_POINTS?.CONVERSATION_GMAIL_EMAIL_VIEW);
      } else {
        const oauthUrl = `${authUrlData?.data}`;
        window.open(oauthUrl);
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
          <Box
            sx={{
              cursor: gmailFoldersLoading ? 'not-allowed' : 'pointer',
              ...styles?.emailArray(theme),
            }}
            onClick={handleGmailClick}
          >
            <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
              {gmailFoldersLoading && (
                <CircularProgress size={20} thickness={4} />
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: 'fit-content',
                padding: '16px',
              }}
            >
              <GmailIcon />
              <Typography variant="h6">Gmail</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              cursor: outlookFoldersLoading ? 'not-allowed' : 'pointer',
              ...styles?.emailArray(theme),
            }}
            onClick={handleOutLookClick}
          >
            <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
              {outlookFoldersLoading && (
                <CircularProgress size={20} thickness={4} />
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: 'fit-content',
                padding: '16px',
              }}
            >
              <OutlookIcon />
              <Typography variant="h6">Microsoft Outlook</Typography>
            </Box>
          </Box>

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
