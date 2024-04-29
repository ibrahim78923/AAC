import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import {
  DotsBoldIcon,
  EmailReplyIcon,
  ForwardIcon,
  ProfileCircleIcon,
  ReplyAllIcon,
  SettingsIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './RightPane.styles';
import { emailsData } from '../Chat.data';
import SendEmailDrawer from '../../SendEmail';
import EmailSettingDrawer from '../../EmailSettingDrawer';
import { CREATE_EMAIL_TYPES } from '@/constants';

const RightPane = () => {
  const theme = useTheme();

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [isEmailSettingsDrawerOpen, setIsEmailSettingsDrawerOpen] =
    useState(false);
  const [mailType, setMailType] = useState('');
  const [searchValue, setSearchValue] = useState<any>('');

  return (
    <Box>
      <Box sx={styles?.rightSide}>
        <Search
          searchBy={searchValue}
          setSearchBy={setSearchValue}
          size="medium"
          placeholder="Search Here"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '13px',
          }}
        >
          <Button
            variant="outlined"
            sx={{ height: '33px' }}
            color="inherit"
            startIcon={<SettingsIcon />}
            onClick={() => setIsEmailSettingsDrawerOpen(true)}
          >
            Email Settings
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenSendEmailDrawer(true);
              setMailType(CREATE_EMAIL_TYPES?.NEW_EMAIL);
            }}
            sx={{ height: '33px' }}
          >
            Send Email
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          background: theme?.palette?.common?.white,
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Typography variant="h4">
          Lorem ipsum dolor sit amet consectetur. Amet turpis.
        </Typography>

        {/* mail display section  */}

        {emailsData?.length > 0 ? (
          emailsData?.map((obj: any) => (
            <Box key={uuidv4()} sx={styles?.rightSideCard}>
              {obj.userImg || <ProfileCircleIcon />}
              <Box flex={1}>
                <Box sx={styles?.emailWrap}>
                  <Box flex={1} sx={{ cursor: 'pointer' }}>
                    <Typography variant="h5">
                      {obj?.firstName} {obj?.lastName} {obj?.reff}
                    </Typography>
                    <Typography variant="body2">To: {obj?.to}</Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} gap={'14px'}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={400}
                      sx={{
                        borderRight: `1px solid ${theme?.palette.custom.light_grayish_blue}`,
                        paddingRight: '15px',
                      }}
                    >
                      {obj?.date}
                    </Typography>
                    <IconButton size="small">
                      <ReplyAllIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setIsOpenSendEmailDrawer(true);
                        setMailType(CREATE_EMAIL_TYPES?.REPLY);
                      }}
                    >
                      <EmailReplyIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setIsOpenSendEmailDrawer(true);
                        setMailType(CREATE_EMAIL_TYPES?.FORWARD);
                      }}
                    >
                      <ForwardIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  mt={1}
                  sx={{ fontSize: '14px', fontWeight: '400' }}
                  dangerouslySetInnerHTML={{ __html: obj?.messageBody }}
                />
                <IconButton sx={{ transform: 'rotate(90deg)' }}>
                  <DotsBoldIcon />
                </IconButton>
                {obj?.emailLogs?.map((item: any) => (
                  <Box
                    key={uuidv4()}
                    sx={{
                      borderLeft: `1px solid ${theme?.palette?.grey[500]}`,
                      padding: '5px 0px 5px 20px',
                    }}
                  >
                    <Box>
                      <Typography variant="body3">
                        <strong>From :</strong> {item?.from}{' '}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body3">
                        <strong>Sent :</strong> {item?.sent}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body3">
                        <strong>To :</strong> {item?.to}{' '}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body3">
                        <strong>Subject:</strong> {item?.subject}{' '}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={styles?.content}>
            <Typography variant="subtitle1">No Content to show!!</Typography>
          </Box>
        )}
      </Box>

      <SendEmailDrawer
        openDrawer={isOpenSendEmailDrawer}
        setOpenDrawer={setIsOpenSendEmailDrawer}
        drawerType={mailType}
      />
      <EmailSettingDrawer
        isOpenDrawer={isEmailSettingsDrawerOpen}
        setIsOpenDrawer={setIsEmailSettingsDrawerOpen}
      />
    </Box>
  );
};

export default RightPane;
