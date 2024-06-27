import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DocumentBlueIcon,
  DocumentIcon,
  DotsBoldIcon,
  EmailReplyIcon,
  ForwardIcon,
  MailColoredIcon,
  ReplyAllIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './RightPane.styles';
import SendEmailDrawer from '../../SendEmail';
import {
  API_STATUS,
  CREATE_EMAIL_TYPES,
  EMAIL_TABS_TYPES,
  FILE_TYPES,
} from '@/constants';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
  setCurrentEmailAssets,
  setSearchTerm,
} from '@/redux/slices/email/outlook/slice';
import Draft from './Draft';
import {
  useGetMailDetailsOutlookQuery,
  useLogoutOutlookMutation,
} from '@/services/commonFeatures/email/outlook';
import UserDetailsDrawer from '../../UserDetailsDrawer';
import { END_POINTS } from '@/routesConstants/endpoints';
import { HomeRounded, LogoutRounded } from '@mui/icons-material';
import ProfileNameIcon from '@/components/ProfileNameIcon';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PdfImage } from '@/assets/images';

const RightPane = ({
  isOpenSendEmailDrawer,
  setIsOpenSendEmailDrawer,
  mailType,
  setMailType,
}: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const mailTabType: any = useAppSelector(
    (state: any) => state?.outlook?.mailTabType,
  );

  const [isUserDetailDrawerOpen, setIsUserDetailDrawerOpen] = useState(false);

  const [searchValue, setSearchValue] = useState<any>('');
  const [isMessageDetailsRequest, setIsMessageDetailsRequest] = useState(true);

  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [activeThread, setActiveThread] = useState();

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

  useEffect(() => {
    dispatch(setSearchTerm(searchValue));
  }, [searchValue]);

  // logoutOutlook
  const [postDraftOtherEmail, { isLoading: isLogoutLoading }] =
    useLogoutOutlookMutation();
  const handleLogout = async () => {
    const payload = {
      platform: 'outlook',
      email: 'dummy@mail.com',
      token: '123ABC',
      refreshToken: 'ABC123',
      expiresOn: '2024-06-11T12:03:58.257Z',
    };
    try {
      await postDraftOtherEmail({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Logout Success', {
        variant: 'success',
      });
      router.push(`${END_POINTS?.EMAIL_VIEW}?redirect=${true}`);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
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
          backgroundColor={theme?.palette?.common?.white}
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
            sx={{ height: '33px', background: theme?.palette?.common?.white }}
            color="inherit"
            startIcon={
              isLogoutLoading ? (
                <CircularProgress size={15} />
              ) : (
                <LogoutRounded />
              )
            }
            onClick={handleLogout}
          >
            Logout
          </Button>

          <Link href={`${END_POINTS?.EMAIL_VIEW}?redirect=${true}`}>
            <Button
              variant="outlined"
              sx={{ height: '33px', background: theme?.palette?.common?.white }}
              color="inherit"
              startIcon={<HomeRounded />}
            >
              Back to Emails
            </Button>
          </Link>

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
                        sortedMessagesDataArray?.map((obj: any) => {
                          const nameParts = obj?.from?.emailAddress?.name
                            .trim()
                            .split('-');
                          return (
                            <Box key={uuidv4()} sx={styles?.rightSideCard}>
                              <Box
                                onClick={() => {
                                  setIsUserDetailDrawerOpen(true);
                                  setActiveThread(obj);
                                }}
                                sx={{ cursor: 'pointer' }}
                              >
                                {obj?.userImg || (
                                  <ProfileNameIcon
                                    firstName={
                                      obj?.from?.emailAddress?.name
                                        ?.trim()
                                        ?.split(' ')[0]
                                    }
                                    lastName={
                                      nameParts[1] ??
                                      obj?.from?.emailAddress?.name
                                        ?.trim()
                                        ?.split(' ')[1]
                                    }
                                  />
                                )}
                              </Box>
                              <Box flex={1}>
                                <Box sx={styles?.emailWrap}>
                                  <Box flex={1} sx={{ cursor: 'pointer' }}>
                                    <Typography
                                      variant="h5"
                                      sx={{ cursor: 'default' }}
                                    >
                                      {obj?.from?.emailAddress?.name}
                                    </Typography>
                                    {obj?.toRecipients.map((item: any) => (
                                      <Typography
                                        variant="body2"
                                        key={uuidv4()}
                                        sx={{ cursor: 'default' }}
                                      >
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
                                    <Tooltip
                                      placement="top"
                                      arrow
                                      title={'Reply All'}
                                    >
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setIsOpenSendEmailDrawer(true);
                                          setMailType(
                                            CREATE_EMAIL_TYPES?.REPLY_ALL,
                                          );
                                          dispatch(
                                            setCurrentEmailAssets({
                                              messageId: obj?.id,
                                              id: obj?.id,
                                              from:
                                                obj?.from?.emailAddress
                                                  ?.address === loggedInState
                                                  ? obj?.toRecipients.map(
                                                      (item: any) =>
                                                        item?.emailAddress
                                                          ?.address,
                                                    )
                                                  : obj?.from?.emailAddress
                                                      ?.address,
                                              others: {
                                                from: `${obj?.from[0]
                                                  ?.name} ${'<'}
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
                                    </Tooltip>

                                    <Tooltip
                                      placement="top"
                                      arrow
                                      title={'Reply'}
                                    >
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setIsOpenSendEmailDrawer(true);
                                          setMailType(
                                            CREATE_EMAIL_TYPES?.REPLY,
                                          );
                                          dispatch(
                                            setCurrentEmailAssets({
                                              messageId: obj?.id,
                                              id: obj?.id,
                                              from: obj?.from?.emailAddress
                                                ?.address,
                                              others: {
                                                from: `${obj?.from?.emailAddress
                                                  ?.name} ${'<'}
                                                 ${obj?.from?.emailAddress
                                                   ?.address}
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
                                    </Tooltip>

                                    <Tooltip
                                      placement="top"
                                      arrow
                                      title={'Forward'}
                                    >
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setIsOpenSendEmailDrawer(true);
                                          setMailType(
                                            CREATE_EMAIL_TYPES?.FORWARD,
                                          );
                                          dispatch(
                                            setCurrentEmailAssets({
                                              messageId: obj?.id,
                                              id: obj?.id,
                                              from: obj?.from?.emailAddress
                                                ?.address,
                                              others: {
                                                from: `${obj?.from?.emailAddress
                                                  ?.name} ${'<'}
                                                 ${obj?.from?.emailAddress
                                                   ?.address}
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
                                    </Tooltip>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                    mb: 2,
                                  }}
                                >
                                  {obj?.attachments?.map((item: any) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <ImageComponent
                                            base64={item?.contentBytes}
                                            contentType={item?.contentType}
                                            fileName={item?.name}
                                          />
                                        </Box>
                                      </>
                                    );
                                  })}
                                </Box>
                                <Box
                                  mt={0.5}
                                  sx={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    '& a': {
                                      color: theme?.palette?.primary?.main,
                                    },
                                  }}
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
                                        <strong>Subject : </strong>{' '}
                                        {obj?.subject}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          );
                        })
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

      <UserDetailsDrawer
        isOpenDrawer={isUserDetailDrawerOpen}
        setIsOpenDrawer={setIsUserDetailDrawerOpen}
        isUserDetail={activeThread}
      />
    </Box>
  );
};

function ImageComponent({ base64, contentType, fileName }: any) {
  const src = `data:${contentType};base64,${base64}`;
  const theme = useTheme();

  if (contentType?.startsWith(FILE_TYPES?.IMAGE)) {
    return (
      <Box
        sx={{
          background: theme?.palette?.grey[300],
        }}
      >
        <a href={src} target="_blank" rel="noopener noreferrer">
          <Image
            src={src}
            alt="attachment"
            width={0}
            height={0}
            style={{ width: 'auto', maxWidth: '130px', height: 'auto' }}
          />
        </a>
      </Box>
    );
  } else if (contentType === FILE_TYPES?.PDF) {
    return (
      <a href={src} download={fileName}>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            backgroundColor: theme.palette.grey[400],
            padding: '5px 10px',
            textTransform: 'capitalize',
          }}
        >
          <Image src={PdfImage} alt="pdf" width={20} height={20} />
          <Typography sx={{ fontSize: '14px' }}>{fileName}</Typography>
        </Box>
      </a>
    );
  } else if (contentType === FILE_TYPES?.DOC) {
    return (
      <a href={src} download={fileName}>
        <DocumentBoxWrapper>
          <DocumentBlueIcon />
          <Typography sx={{ fontSize: '14px' }}>{fileName}</Typography>
        </DocumentBoxWrapper>
      </a>
    );
  } else if (contentType?.startsWith(FILE_TYPES?.TEXT)) {
    return (
      <a href={src} download={fileName}>
        <DocumentBoxWrapper>
          <DocumentIcon />
          <Typography sx={{ fontSize: '14px' }}>{fileName}</Typography>
        </DocumentBoxWrapper>
      </a>
    );
  } else {
    return (
      <a href={src} download={fileName}>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            backgroundColor: theme?.palette?.grey[400],
            padding: '5px 10px',
            textTransform: 'capitalize',
          }}
        >
          <Typography sx={{ fontSize: '14px' }}>{fileName}</Typography>
        </Box>
      </a>
    );
  }
}

export const DocumentBoxWrapper = ({ children }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        backgroundColor: theme?.palette?.grey[400],
        padding: '5px 10px',
        textTransform: 'capitalize',
      }}
    >
      {children}
    </Box>
  );
};

export default RightPane;
