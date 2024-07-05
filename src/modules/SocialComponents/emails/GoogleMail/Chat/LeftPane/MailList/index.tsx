import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './NotificationCard.styles';
import { useAppSelector } from '@/redux/store';
import { API_STATUS, DATE_TIME_FORMAT, EMAIL_TABS_TYPES } from '@/constants';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  setActiveGmailRecord,
  setGmailCurrentPage,
  setGmailList,
  setSelectedGmailRecords,
} from '@/redux/slices/email/gmail/slice';
import { usePatchGmailMessageMutation } from '@/services/commonFeatures/email/gmail';
import { isNullOrEmpty } from '@/utils';
import { PaperClipIcon } from '@/assets/icons';

const MailList = ({
  emailsByFolderIdData,
  isLoadingEmailsByFolderIdData,
  refetch,
  gmailTabType,
  pageToken,
}: any) => {
  const theme = useTheme();
  const [isDataEnd, setIsDataEnd] = useState<any>(true);
  const [dataArray, setDataArray] = useState<any>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();

  const selectedGmailRecords: any = useAppSelector(
    (state: any) => state?.gmail?.selectedGmailRecords,
  );

  const activeGmailRecord = useAppSelector(
    (state: any) => state?.gmail?.activeGmailRecord,
  );

  const gmailCurrentPage: any = useAppSelector(
    (state: any) => state?.gmail?.gmailCurrentPage,
  );

  const gmailList: any = useAppSelector(
    (state: any) => state?.gmail?.gmailList,
  );

  const handleCheckboxClick = (email: any) => {
    const safeSelectedRecords = Array.isArray(selectedGmailRecords)
      ? selectedGmailRecords
      : [];
    const isAlreadySelected = safeSelectedRecords?.some(
      (item: any) => item?.id === email?.id,
    );

    if (isAlreadySelected) {
      const updatedSelection = safeSelectedRecords?.filter(
        (item: any) => item?.id !== email?.id,
      );
      dispatch(setSelectedGmailRecords(updatedSelection));
    } else {
      dispatch(setSelectedGmailRecords([...safeSelectedRecords, email]));
    }
  };

  const handleSelectAll = () => {
    const totalEmails = emailsByFolderIdData?.length || 0;
    const selectedCount = selectedGmailRecords?.length;

    if (selectedCount === totalEmails) {
      dispatch(setSelectedGmailRecords([]));
    } else {
      dispatch(setSelectedGmailRecords(emailsByFolderIdData));
    }
  };

  const [patchGmailMessage] = usePatchGmailMessageMutation();

  const handelMailClick = async (item: any) => {
    if (item) {
      dispatch(setActiveGmailRecord(item));

      if (item?.readMessage) {
        const payload = {
          messageId: item?.messageId,
          read: true,
          starred: false,
        };
        try {
          await patchGmailMessage({
            body: payload,
          })?.unwrap();
          dispatch(setGmailList('clear'));
        } catch (error: any) {
          enqueueSnackbar('Something went wrong while updating message!', {
            variant: 'error',
          });
        }
      }
    }
  };

  useEffect(() => {
    setDataArray(emailsByFolderIdData);
  }, [emailsByFolderIdData]);

  const boxRef = useRef(null);
  const handleScroll = (e: any) => {
    const bottom =
      e?.target?.scrollHeight -
        e?.target?.scrollTop -
        e?.target?.clientHeight <=
      50;
    if (bottom) {
      if (isNullOrEmpty(pageToken?.data?.nextPageToken)) {
        setIsDataEnd(false);
        return;
      }
      if (isLoadingEmailsByFolderIdData === API_STATUS?.PENDING) {
        null;
      } else {
        dispatch(setGmailCurrentPage(pageToken?.data?.nextPageToken));
      }
    }
  };

  useEffect(() => {
    if (isNullOrEmpty(pageToken?.data?.nextPageToken) || isRefresh) {
      setIsDataEnd(false);
    } else {
      setIsDataEnd(true);
    }
  }, [emailsByFolderIdData]);

  useEffect(() => {
    const boxElement: any = boxRef?.current;
    boxElement.addEventListener('scroll', handleScroll);
    return () => {
      boxElement.removeEventListener('scroll', handleScroll);
    };
  }, [isLoadingEmailsByFolderIdData, gmailCurrentPage]);

  useEffect(() => {
    if (emailsByFolderIdData?.data) {
      dispatch(
        setGmailList(emailsByFolderIdData?.data?.map((item: any) => item)),
      );
    }
  }, [emailsByFolderIdData?.data]);

  const loadingCheck =
    gmailList?.length === 0 || isRefresh
      ? isLoadingEmailsByFolderIdData === API_STATUS?.PENDING
      : false;

  useEffect(() => {
    if (isLoadingEmailsByFolderIdData === API_STATUS?.FULFILLED) {
      setIsRefresh(false);
    }
  }, [isLoadingEmailsByFolderIdData]);

  function decodeHtmlEntities(str: any) {
    const entityMap = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
    };

    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, function (match: any) {
      return entityMap[match];
    });
  }

  function hasNonEmptyFilename(emailParts: any) {
    return emailParts?.some(
      (partArray: any) => partArray?.some((part: any) => part?.filename !== ''),
    );
  }

  return (
    <Box minHeight={'calc(100vh - 350px)'} sx={{ overflowY: 'auto' }}>
      <Box sx={styles?.notificationWrap}>
        <FormControlLabel
          label="Select All"
          control={
            <Checkbox
              color="primary"
              name="Id"
              onClick={handleSelectAll}
              checked={
                emailsByFolderIdData?.length > 0
                  ? selectedGmailRecords?.length ===
                    emailsByFolderIdData?.length
                  : false
              }
            />
          }
        />
        <Button
          variant="text"
          sx={{
            color: theme?.palette?.slateBlue?.main,
            fontWeight: '400',
            textDecoration: 'underline',
          }}
          onClick={() => {
            refetch();
            setIsRefresh(true);
          }}
        >
          Refresh
        </Button>
      </Box>

      {gmailTabType?.name?.toLowerCase() === EMAIL_TABS_TYPES?.TRASH && (
        <Box
          sx={{
            background: theme?.palette?.grey[100],
            padding: '20px',
            borderRadius: '10px',
            marginTop: '-20px',
          }}
        >
          <Typography variant="body2" sx={{ color: theme?.palette?.grey[800] }}>
            Messages that have been in Trash more than 30 days will be
            automatically deleted.{' '}
            <strong>
              <u style={{ cursor: 'pointer' }} onClick={handleSelectAll}>
                Empty Trash now
              </u>
            </strong>
          </Typography>
        </Box>
      )}

      <Box sx={{ maxHeight: '62vh', overflow: 'auto' }} ref={boxRef}>
        {isLoadingEmailsByFolderIdData === API_STATUS?.REJECTED ? (
          <Box>
            <Typography variant="body2" color={theme?.palette?.error?.main}>
              Something went wrong
            </Typography>
          </Box>
        ) : (
          <>
            {loadingCheck ? (
              <>
                <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
              </>
            ) : (
              <>
                {dataArray && (
                  <>
                    {dataArray?.length > 0 ? (
                      dataArray?.map((item: any) => (
                        <>
                          <Box
                            key={uuidv4()}
                            sx={styles?.card(theme)}
                            style={{
                              background:
                                activeGmailRecord?.id === item?.id
                                  ? theme?.palette?.grey[100]
                                  : theme?.palette?.common?.white,
                            }}
                          >
                            <Checkbox
                              checked={selectedGmailRecords?.some(
                                (email: any) => email?.id === item?.id,
                              )}
                              onChange={() => handleCheckboxClick(item)}
                            />
                            <Box onClick={() => handelMailClick(item)}>
                              {gmailTabType?.name ===
                              EMAIL_TABS_TYPES?.SCHEDULE ? (
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: item?.readMessage ? 700 : '',
                                    color: theme?.palette?.success?.main,
                                  }}
                                >
                                  {'['} Scheduled {']'}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: item?.readMessage ? 700 : '',
                                    wordBreak: 'break-all',
                                  }}
                                >
                                  {' '}
                                  {item?.name}{' '}
                                </Typography>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  width: '19vw',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  fontWeight: item?.readMessage ? 400 : 700,
                                }}
                              >
                                {gmailTabType?.name?.toLowerCase() ===
                                EMAIL_TABS_TYPES?.DRAFT ? (
                                  <>
                                    <span
                                      style={{
                                        color: theme?.palette?.error?.main,
                                      }}
                                    >
                                      [DRAFT]
                                    </span>{' '}
                                    {item?.toRecipients?.map((item: any) => (
                                      <>{item?.emailAddress?.address}; </>
                                    ))}
                                  </>
                                ) : (
                                  <>{item?.from?.emailAddress?.name ?? ''} </>
                                )}
                              </Typography>
                              <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                pr={2}
                              >
                                <Typography
                                  variant="body3"
                                  sx={{
                                    fontWeight: item?.readMessage ? 700 : 600,
                                    wordBreak: 'break-all',
                                  }}
                                  color={'primary'}
                                  margin={'8px 0px'}
                                >
                                  {item?.subject === 'undefined'
                                    ? '(No subject)'
                                    : item?.subject}
                                </Typography>

                                {hasNonEmptyFilename(item?.attchImages) && (
                                  <PaperClipIcon
                                    color={theme?.palette?.primary?.main}
                                  />
                                )}
                              </Box>

                              <Typography
                                variant="body3"
                                margin={'3px 0px'}
                                sx={{
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 3,
                                  overflow: 'hidden',
                                  wordBreak: 'break-all',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {decodeHtmlEntities(item?.snippet ?? '---')}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme?.palette?.grey[900],
                                  fontSize: '12px',
                                }}
                              >
                                {dayjs(item?.date).format(
                                  DATE_TIME_FORMAT?.MMMDDYYYY,
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      ))
                    ) : (
                      <>No record found</>
                    )}
                  </>
                )}
                {isDataEnd && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress size={25} />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
const SkeletonBox = () => {
  return (
    <Box
      sx={{
        mb: 4,
        padding: '0px 35px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Box>
        <Skeleton variant="rectangular" width={25} height={25} />
      </Box>
      <Box>
        <Skeleton variant="rectangular" width={250} height={30} />
        <Skeleton
          variant="rectangular"
          width={230}
          height={15}
          sx={{ mt: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={230}
          height={50}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};
export default MailList;
