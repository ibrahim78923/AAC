import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DotsBoldIcon,
  EmailReplyIcon,
  ForwardIcon,
  MailColoredIcon,
  ProfileCircleIcon,
  ReplyAllIcon,
  SettingsIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './RightPane.styles';
import SendEmailDrawer from '../../SendEmail';
import EmailSettingDrawer from '../../EmailSettingDrawer';
import { API_STATUS, CREATE_EMAIL_TYPES } from '@/constants';
import { useGetMessageDetailsQuery } from '@/services/commonFeatures/email';
import { useAppSelector } from '@/redux/store';
import { UnixDateFormatter } from '@/utils/dateTime';
import { useDispatch } from 'react-redux';
import { setCurrentEmailAssets } from '@/redux/slices/email/slice';

const RightPane = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [isEmailSettingsDrawerOpen, setIsEmailSettingsDrawerOpen] =
    useState(false);
  const [mailType, setMailType] = useState('');
  const [searchValue, setSearchValue] = useState<any>('');
  const [isMessageDetailsRequest, setIsMessageDetailsRequest] = useState(true);

  const [selectedRecordId, setSelectedRecordId] = useState('');

  const activeRecord = useAppSelector(
    (state: any) => state?.email?.activeRecord,
  );
  const loggedInState = useAppSelector(
    (state: any) => state?.email?.loggedInState,
  );

  const { data: messageDetailsData, status: statusMessageDetailsData } =
    useGetMessageDetailsQuery(
      {
        params: {
          threadId: activeRecord?.thread_id,
        },
      },
      { skip: isMessageDetailsRequest },
    );

  const sortedMessagesDataArray =
    messageDetailsData?.data && [...messageDetailsData?.data].reverse();

  useEffect(() => {
    if (activeRecord?.thread_id) {
      setIsMessageDetailsRequest(false);
    }
  }, [activeRecord?.thread_id]);

  const handelMoreinfo = (id: any) => {
    if (selectedRecordId === id) {
      setSelectedRecordId('');
    } else {
      setSelectedRecordId(id);
    }
  };

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

      {activeRecord?.thread_id ? (
        <>
          {statusMessageDetailsData === API_STATUS?.PENDING ? (
            <>
              <Box
                sx={{
                  background: theme?.palette?.common?.white,
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '70vh',
                }}
              >
                <CircularProgress />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                background: theme?.palette?.common?.white,
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Typography variant="h4">{activeRecord?.subject}</Typography>
              {sortedMessagesDataArray?.length > 0 ? (
                sortedMessagesDataArray?.map((obj: any) => (
                  <Box key={uuidv4()} sx={styles?.rightSideCard}>
                    {obj?.userImg || <ProfileCircleIcon />}
                    <Box flex={1}>
                      <Box sx={styles?.emailWrap}>
                        <Box flex={1} sx={{ cursor: 'pointer' }}>
                          <Typography variant="h5">
                            {obj?.from[0]?.name}
                            {/* {obj?.firstName} {obj?.lastName} {obj?.reff} */}
                          </Typography>
                          <Typography variant="body2">
                            To: {obj?.to[0]?.name}{' '}
                          </Typography>
                        </Box>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          gap={'14px'}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight={400}
                            sx={{
                              borderRight: `1px solid ${theme?.palette?.custom?.light_grayish_blue}`,
                              paddingRight: '15px',
                            }}
                          >
                            <UnixDateFormatter
                              timestamp={obj?.date}
                              timeZone="Asia/Karachi"
                            ></UnixDateFormatter>
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setIsOpenSendEmailDrawer(true);
                              setMailType(CREATE_EMAIL_TYPES?.REPLY_ALL);
                            }}
                          >
                            <ReplyAllIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setIsOpenSendEmailDrawer(true);
                              setMailType(CREATE_EMAIL_TYPES?.REPLY);
                              dispatch(
                                setCurrentEmailAssets({
                                  threadId: obj?.thread_id,
                                  id: obj?.id,
                                  from:
                                    obj?.from[0]?.email === loggedInState
                                      ? obj?.to[0]?.email
                                      : obj?.from[0]?.email,
                                  others: {
                                    from: `${obj?.from[0]?.name} ${'<'}
                                    ${obj?.from[0]?.email}
                                    ${'>'}`,
                                    sent: obj?.date,
                                    to: `${obj?.from[0]?.name} ${'<'}
                                    ${obj?.from[0]?.email}
                                    ${'>'}`,
                                    subject: obj?.subject,
                                  },
                                }),
                              );
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
                        mt={0.5}
                        sx={{ fontSize: '14px', fontWeight: '400' }}
                        dangerouslySetInnerHTML={{ __html: obj?.body }}
                      />
                      <IconButton
                        sx={{ transform: 'rotate(90deg)' }}
                        onClick={() => handelMoreinfo(obj?.id)}
                      >
                        <DotsBoldIcon />
                      </IconButton>
                      {selectedRecordId === obj?.id && (
                        <Box
                          sx={{
                            borderLeft: `1px solid ${theme?.palette?.grey[500]}`,
                            padding: '5px 0px 5px 20px',
                          }}
                        >
                          <Box>
                            <Typography variant="body3">
                              <strong>From :</strong> {obj?.from[0]?.name} {'<'}
                              {obj?.from[0]?.email}
                              {'>'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body3">
                              <strong>Sent :</strong>{' '}
                              <UnixDateFormatter
                                timestamp={obj?.date}
                                timeZone="Asia/Karachi"
                              ></UnixDateFormatter>
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body3">
                              <strong>To :</strong>
                              {obj?.to[0]?.name} {'<'}
                              {obj?.to[0]?.email}
                              {'>'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body3">
                              <strong>Subject:</strong> {obj?.subject}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={styles?.content}>
                  <Typography variant="subtitle1">
                    No Content to show!!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </>
      ) : (
        <>
          <Box
            sx={{
              background: theme?.palette?.common?.white,
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <MailColoredIcon />
              <Typography variant="body2" sx={{ opacity: '0.7', mt: 1 }}>
                Select an item to read
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: '0.7', fontSize: '12px' }}
              >
                Nothing is Selected
              </Typography>
            </Box>
          </Box>
        </>
      )}

      <SendEmailDrawer
        openDrawer={isOpenSendEmailDrawer}
        setOpenDrawer={setIsOpenSendEmailDrawer}
        drawerType={mailType}
        setMailType={setMailType}
      />
      <EmailSettingDrawer
        isOpenDrawer={isEmailSettingsDrawerOpen}
        setIsOpenDrawer={setIsEmailSettingsDrawerOpen}
      />
    </Box>
  );
};

export default RightPane;
