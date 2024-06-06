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
import { API_STATUS, CREATE_EMAIL_TYPES, EMAIL_TABS_TYPES } from '@/constants';
// import { useGetMessageDetailsQuery } from '@/services/commonFeatures/email/others';
import { useAppSelector } from '@/redux/store';
// import { UnixDateFormatter } from '@/utils/dateTime';
import { useDispatch } from 'react-redux';
import { setCurrentEmailAssets } from '@/redux/slices/email/outlook/slice';
import Draft from './Draft';
import { useGetMailDetailsOutlookQuery } from '@/services/commonFeatures/email/outlook';

const RightPane = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const mailTabType: any = useAppSelector(
    (state: any) => state?.outlook?.mailTabType,
  );

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [isEmailSettingsDrawerOpen, setIsEmailSettingsDrawerOpen] =
    useState(false);
  const [mailType, setMailType] = useState('');
  const [searchValue, setSearchValue] = useState<any>('');
  const [isMessageDetailsRequest, setIsMessageDetailsRequest] = useState(true);

  const [selectedRecordId, setSelectedRecordId] = useState('');

  const activeRecord = useAppSelector(
    (state: any) => state?.outlook?.activeRecord,
  );
  const loggedInState = useAppSelector(
    (state: any) => state?.outlook?.loggedInState,
  );

  const {
    data: messageDetailsData,
    status: statusMessageDetailsData,
    isError,
  } = useGetMailDetailsOutlookQuery(
    {
      params: {
        conversationId: activeRecord?.conversationId,
      },
    },
    { skip: isMessageDetailsRequest },
  );

  const sortedMessagesDataArray =
    messageDetailsData?.data && [...messageDetailsData?.data?.value].reverse();

  useEffect(() => {
    if (activeRecord?.conversationId) {
      setIsMessageDetailsRequest(false);
      null;
    }
  }, [activeRecord?.conversationId]);

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

      {mailTabType?.displayName?.toLowerCase() === EMAIL_TABS_TYPES?.DRAFTS ? (
        <>
          <Draft />
        </>
      ) : (
        <>
          {activeRecord?.id ? (
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
                <>
                  {isError ? (
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
                          color: theme?.palette?.error?.main,
                        }}
                      >
                        Something went wrong
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background: theme?.palette?.common?.white,
                        borderRadius: '8px',
                        padding: '20px',
                      }}
                    >
                      <Typography variant="h4">
                        {activeRecord?.subject}
                      </Typography>
                      {sortedMessagesDataArray?.length > 0 ? (
                        sortedMessagesDataArray?.map((obj: any) => (
                          <Box key={uuidv4()} sx={styles?.rightSideCard}>
                            {obj?.userImg || <ProfileCircleIcon />}
                            <Box flex={1}>
                              <Box sx={styles?.emailWrap}>
                                <Box flex={1} sx={{ cursor: 'pointer' }}>
                                  <Typography variant="h5">
                                    {obj?.from?.emailAddress?.name}
                                  </Typography>
                                  {obj?.toRecipients.map((item: any) => (
                                    <Typography variant="body2" key={uuidv4()}>
                                      To: {item?.emailAddress?.name}
                                    </Typography>
                                  ))}
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
                                    {obj?.createdDateTime}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setIsOpenSendEmailDrawer(true);
                                      setMailType(
                                        CREATE_EMAIL_TYPES?.REPLY_ALL,
                                      );
                                      dispatch(
                                        setCurrentEmailAssets({
                                          messageId: obj?.messageId,
                                          id: obj?.id,
                                          from:
                                            obj?.from?.emailAddress?.address ===
                                            loggedInState
                                              ? obj?.toRecipients.map(
                                                  (item: any) =>
                                                    item?.emailAddress?.address,
                                                )
                                              : obj?.from?.emailAddress
                                                  ?.address,
                                          others: {
                                            from: `${obj?.from[0]?.name} ${'<'}
                                                ${obj?.from[0]?.email}
                                                ${'>'}`,
                                            sent: obj?.date,
                                            to: `<>`,
                                            subject: obj?.subject,
                                            body: '',
                                          },
                                        }),
                                      );
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
                                          messageId: obj?.id,
                                          id: obj?.id,
                                          from: obj?.from?.emailAddress
                                            ?.address,
                                          others: {
                                            from: `${obj?.from?.emailAddress?.name} ${'<'}
                                                 ${obj?.from?.emailAddress?.address}
                                                 ${'>'}`,
                                            sent: obj?.createdDateTime,
                                            to: `<>`,
                                            subject: obj?.subject,
                                            body: '',
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
                                      dispatch(
                                        setCurrentEmailAssets({
                                          messageId: obj?.id,
                                          id: obj?.id,
                                          from: obj?.from?.emailAddress
                                            ?.address,
                                          others: {
                                            from: `${obj?.from?.emailAddress?.name} ${'<'}
                                                 ${obj?.from?.emailAddress?.address}
                                                 ${'>'}`,
                                            sent: obj?.createdDateTime,
                                            to: `<>`,
                                            subject: obj?.subject,
                                            body: obj?.body?.content,
                                          },
                                        }),
                                      );
                                    }}
                                  >
                                    <ForwardIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                              <Box
                                mt={0.5}
                                sx={{ fontSize: '14px', fontWeight: '400' }}
                                dangerouslySetInnerHTML={{
                                  __html: obj?.body?.content,
                                }}
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
                                      <strong>From :</strong>
                                      {obj?.from?.emailAddress?.name}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body3">
                                      <strong>Sent :</strong>{' '}
                                      {obj?.createdDateTime}
                                    </Typography>
                                  </Box>

                                  <Box>
                                    <Typography variant="body3">
                                      <strong>To : </strong>
                                    </Typography>
                                    {obj?.toRecipients?.map((item: any) => (
                                      <Typography
                                        variant="body3"
                                        key={uuidv4()}
                                      >
                                        {item?.emailAddress?.name}
                                      </Typography>
                                    ))}
                                  </Box>

                                  <Box>
                                    <Typography variant="body3">
                                      <strong>Subject : </strong> {obj?.subject}
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
