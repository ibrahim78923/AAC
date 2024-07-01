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
  DotsBoldIcon,
  EmailReplyIcon,
  ForwardIcon,
  MailColoredIcon,
  ProfileCircleIcon,
  ReplyAllIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './RightPane.styles';
import SendEmailDrawer from '../../SendEmail';
import {
  API_STATUS,
  FILE_TYPES,
  CREATE_EMAIL_TYPES,
  DATE_TIME_FORMAT,
  EMAIL_TABS_TYPES,
  Gmail_CONST,
  indexNumbers,
} from '@/constants';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import Draft from './Draft';
import {
  useGetGmailMessageDetailsQuery,
  useLogoutTokenMutation,
} from '@/services/commonFeatures/email/gmail';
import {
  setCurrentForwardMessage,
  setCurrentGmailAssets,
  setGmailSearch,
} from '@/redux/slices/email/gmail/slice';
import dayjs from 'dayjs';
import HomeIcon from '@mui/icons-material/Home';
import UserDetailsDrawer from '../../UserDetailsDrawer';
import { useRouter } from 'next/router';
import { SOCIAL_FEATURES_GMAIL } from '@/routesConstants/paths';
import { enqueueSnackbar } from 'notistack';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import Image from 'next/image';
import { PdfImage } from '@/assets/images';
import { Buffer } from 'buffer';

const RightPane = () => {
  const theme = useTheme();
  const router = useRouter();

  const dispatch = useDispatch();

  const gmailTabType: any = useAppSelector(
    (state: any) => state?.gmail?.gmailTabType,
  );

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [isUserDetailDrawerOpen, setIsUserDetailDrawerOpen] = useState(false);
  const [isUserDetail, setIsUserDetail] = useState();
  const [mailType, setMailType] = useState('');
  const [searchValue, setSearchValue] = useState<any>('');
  const [isMessageDetailsRequest, setIsMessageDetailsRequest] = useState(true);

  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [logoutMail] = useLogoutTokenMutation();

  const activeGmailRecord = useAppSelector(
    (state: any) => state?.gmail?.activeGmailRecord,
  );
  const loggedInState = useAppSelector(
    (state: any) => state?.gmail?.loggedInState,
  );

  const { data: messageDetailsData, status: statusMessageDetailsData } =
    useGetGmailMessageDetailsQuery(
      {
        params: {
          threadId: activeGmailRecord?.threadId,
        },
      },
      { skip: isMessageDetailsRequest },
    );

  const sortedMessagesDataArray = messageDetailsData?.data && [
    ...messageDetailsData?.data,
  ];

  useEffect(() => {
    if (activeGmailRecord?.threadId) {
      setIsMessageDetailsRequest(false);
    }
  }, [activeGmailRecord?.threadId]);

  const handelMoreinfo = (id: any) => {
    if (selectedRecordId === id) {
      setSelectedRecordId('');
    } else {
      setSelectedRecordId(id);
    }
  };

  const EmailLogout = async () => {
    const payload = {
      platform: 'gmail',
      email: 'ren78057@jzport.com',
      token: 'wewr32412',
      refreshToken: 'dgdfg34',
      expiresOn: '2024-06-12T12:03:58.257Z',
    };
    try {
      await logoutMail({ body: payload })?.unwrap();
      enqueueSnackbar('logout to gmail successfully', {
        variant: 'success',
      });
      router?.push(
        `${SOCIAL_FEATURES_GMAIL?.MAIN_EMAIL_PAGE}?redirect=${true}`,
      );
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  useEffect(() => {
    dispatch(setGmailSearch(searchValue));
  }, [searchValue]);

  return (
    <Box>
      <Box sx={styles?.rightSide}>
        <Search
          searchBy={searchValue}
          setSearchBy={setSearchValue}
          size="medium"
          placeholder="Search Here"
          style={{ background: 'white' }}
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
            sx={{ height: '33px', background: 'white' }}
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => EmailLogout()}
          >
            logout
          </Button>
          <Link
            href={`${SOCIAL_FEATURES_GMAIL?.MAIN_EMAIL_PAGE}?redirect=${true}`}
          >
            <Button
              variant="outlined"
              sx={{ height: '33px', background: 'white' }}
              color="inherit"
              startIcon={<HomeIcon />}
            >
              Emails
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

      {gmailTabType?.name?.toLowerCase() === EMAIL_TABS_TYPES?.DRAFT ? (
        <>
          <Draft />
        </>
      ) : (
        <>
          {activeGmailRecord?.threadId ? (
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
                  <Typography variant="h4">
                    {activeGmailRecord?.subject === 'undefined'
                      ? '(No subject)'
                      : activeGmailRecord?.subject}
                  </Typography>
                  {sortedMessagesDataArray?.length > 0 ? (
                    sortedMessagesDataArray?.map((obj: any) => (
                      <Box key={uuidv4()} sx={styles?.rightSideCard}>
                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setIsUserDetailDrawerOpen(true);
                            setIsUserDetail(obj);
                          }}
                        >
                          {obj?.userImg || <ProfileCircleIcon />}
                        </Box>

                        <Box flex={1}>
                          <Box sx={styles?.emailWrap}>
                            <Box flex={1} sx={{ cursor: 'pointer' }}>
                              <Typography variant="h5">
                                {obj?.payload?.headers?.find(
                                  (header: any) =>
                                    header?.name === Gmail_CONST?.FROM,
                                )?.value ?? '--'}
                              </Typography>
                              <Typography variant="body2">
                                {obj?.payload?.headers?.find(
                                  (header: any) =>
                                    header?.name === Gmail_CONST?.TO,
                                )?.value ?? '--'}
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
                                {obj?.payload?.headers
                                  ?.find(
                                    (header: any) =>
                                      header?.name === Gmail_CONST?.DATE,
                                  )
                                  ?.value.replace(/ [+-]\d{4}$/, '') ?? '--'}
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
                                    setMailType(CREATE_EMAIL_TYPES?.REPLY_ALL);
                                    dispatch(
                                      setCurrentGmailAssets({
                                        threadId: obj?.threadId,
                                        id: obj?.id,
                                        from:
                                          obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value === loggedInState
                                            ? obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.TO,
                                              )?.value
                                            : obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.FROM,
                                              )?.value,
                                        others: {
                                          from: `${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          sent: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.DATE,
                                          )?.value,
                                          to: ` ${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          subject: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.SUBJECT,
                                          )?.value,
                                        },
                                      }),
                                    );
                                  }}
                                >
                                  <ReplyAllIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip placement="top" arrow title={'Reply'}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setIsOpenSendEmailDrawer(true);
                                    setMailType(CREATE_EMAIL_TYPES?.REPLY);
                                    dispatch(
                                      setCurrentGmailAssets({
                                        threadId: obj?.threadId,
                                        id: obj?.id,
                                        from:
                                          obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value === loggedInState
                                            ? obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.TO,
                                              )?.value
                                            : obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.FROM,
                                              )?.value,
                                        others: {
                                          from: `${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          sent: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.DATE,
                                          )?.value,
                                          to: ` ${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          subject: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.SUBJECT,
                                          )?.value,
                                        },
                                      }),
                                    );
                                  }}
                                >
                                  <EmailReplyIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip placement="top" arrow title={'Forward'}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    dispatch(
                                      setCurrentForwardMessage(
                                        decodeBase64(
                                          obj?.payload?.parts[
                                            indexNumbers?.ZERO
                                          ]?.body?.data,
                                        ),
                                      ),
                                    );
                                    setIsOpenSendEmailDrawer(true);
                                    setMailType(CREATE_EMAIL_TYPES?.FORWARD);
                                    dispatch(
                                      setCurrentGmailAssets({
                                        threadId: obj?.threadId,
                                        id: obj?.id,
                                        // messageBody: obj?.snippet,
                                        from:
                                          obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value === loggedInState
                                            ? obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.TO,
                                              )?.value
                                            : obj?.payload?.headers?.find(
                                                (header: any) =>
                                                  header?.name ===
                                                  Gmail_CONST?.FROM,
                                              )?.value,
                                        others: {
                                          from: `${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          sent: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.DATE,
                                          )?.value,
                                          to: ` ${obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.FROM,
                                          )?.value}
                                    ${'>'}`,
                                          subject: obj?.payload?.headers?.find(
                                            (header: any) =>
                                              header?.name ===
                                              Gmail_CONST?.SUBJECT,
                                          )?.value,
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

                          {obj?.payload?.parts?.map((item: any) => {
                            if (item?.mimeType === 'text/html') {
                              return (
                                <>
                                  {' '}
                                  <DecodeBase64
                                    base64String={item?.body?.data}
                                  />{' '}
                                </>
                              );
                            }
                          })}

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
                                      marginTop: '10px',
                                      borderRadius: '8px',
                                      overflow: 'hidden',
                                      display: 'flex',
                                    }}
                                  >
                                    <ImageComponent
                                      base64={item?.data}
                                      contentType={item?.mimeType}
                                      fileName={item?.filename}
                                    />
                                  </Box>
                                </>
                              );
                            })}
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
                                  <strong>From :</strong>
                                  {obj?.payload?.headers?.find(
                                    (header: any) =>
                                      header?.name === Gmail_CONST?.FROM,
                                  )?.value ?? '--'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body3">
                                  <strong>Sent :</strong>{' '}
                                  {dayjs(
                                    obj?.payload?.headers?.find(
                                      (header: any) =>
                                        header?.name === Gmail_CONST?.DATE,
                                    )?.value ?? '--',
                                  ).format(DATE_TIME_FORMAT?.MMMDDYYYY)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body3">
                                  <strong>To : </strong>
                                  {obj?.payload?.headers?.find(
                                    (header: any) =>
                                      header?.name === Gmail_CONST?.TO,
                                  )?.value ?? '--'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body3">
                                  <strong>Subject : </strong>{' '}
                                  {obj?.payload?.headers?.find(
                                    (header: any) =>
                                      header?.name === Gmail_CONST?.SUBJECT,
                                  )?.value ?? '--'}
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
                  height: '80vh',
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
        isUserDetail={isUserDetail}
      />
    </Box>
  );
};

function ImageComponent({ base64, contentType, fileName }: any) {
  const buffer = Buffer?.from(base64, 'base64');
  const decode = buffer?.toString('base64');
  const src = `data:${contentType};base64,${decode}`;
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
            width={130}
            height={130}
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
  } else {
    return null;
  }
}
export function decodeBase64(base64: any) {
  try {
    const buffer = Buffer?.from(base64, 'base64');
    return buffer?.toString('utf-8');
  } catch (e) {
    return '';
  }
}

export const DecodeBase64 = ({ base64String }: any) => {
  const [decodedText, setDecodedText] = useState('');

  useEffect(() => {
    setDecodedText(decodeBase64(base64String));
  }, [base64String]);

  return (
    <>
      <Typography dangerouslySetInnerHTML={{ __html: decodedText }} />
    </>
  );
};

export default RightPane;
