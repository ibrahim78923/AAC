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
import {
  setActiveRecord,
  setMailCurrentPage,
  setMailList,
  setSelectedRecords,
  setUpdateMailList,
} from '@/redux/slices/email/outlook/slice';
import {
  API_STATUS,
  EMAIL_TABS_TYPES,
  OUTLOOK_EMAIL_TABS_TYPES,
  TIME_FORMAT,
} from '@/constants';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { usePatchOutlookEmailMessageMutation } from '@/services/commonFeatures/email/outlook';
import { enqueueSnackbar } from 'notistack';
import { PaperClipIcon } from '@/assets/icons';

const MailList = ({
  emailsByFolderIdData,
  isLoadingEmailsByFolderIdData,
  mailTabType,
  setIsRefresh,
  isRefresh,
  handelRefresh,
  manualActionsTrack,
}: any) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const breakScrollOperation: any = useAppSelector(
    (state: any) => state?.outlook?.breakScrollOperation,
  );

  const selectedRecords: any = useAppSelector(
    (state: any) => state?.outlook?.selectedRecords,
  );
  const mailCurrentPage: any = useAppSelector(
    (state: any) => state?.outlook?.mailCurrentPage,
  );
  const activeRecord = useAppSelector(
    (state: any) => state?.outlook?.activeRecord,
  );
  const handleCheckboxClick = (email: any) => {
    const safeSelectedRecords = Array.isArray(selectedRecords)
      ? selectedRecords
      : [];
    const isAlreadySelected = safeSelectedRecords?.some(
      (item: any) => item?.id === email?.id,
    );

    if (isAlreadySelected) {
      const updatedSelection = safeSelectedRecords?.filter(
        (item: any) => item?.id !== email?.id,
      );
      dispatch(setSelectedRecords(updatedSelection));
    } else {
      dispatch(setSelectedRecords([...safeSelectedRecords, email]));
    }
  };

  const handleSelectAll = () => {
    const totalEmails = emailsByFolderIdData?.data?.length || 0;
    const selectedCount = selectedRecords?.length;
    if (selectedCount === totalEmails) {
      dispatch(setSelectedRecords([]));
    } else {
      dispatch(setSelectedRecords(emailsByFolderIdData?.data));
    }
  };

  const [patchOutlookEmailMessage] = usePatchOutlookEmailMessageMutation();

  const handelMailClick = async (item: any) => {
    if (item) {
      dispatch(setActiveRecord(item));
      if (!item?.isRead) {
        try {
          const response = await patchOutlookEmailMessage({
            body: {
              messageId: item?.id,
              read: true,
            },
          })?.unwrap();
          dispatch(setUpdateMailList(response?.data));
        } catch (error: any) {
          enqueueSnackbar('Something went wrong while updating message!', {
            variant: 'error',
          });
        }
      }
    }
  };

  const boxRef = useRef(null);
  const handleScroll = (e: any) => {
    const bottom =
      e?.target?.scrollHeight -
        e?.target?.scrollTop -
        e?.target?.clientHeight <=
      50;
    if (bottom) {
      if (breakScrollOperation) {
        return;
      }
      if (isLoadingEmailsByFolderIdData === API_STATUS?.PENDING) {
        null;
      } else {
        dispatch(setMailCurrentPage(mailCurrentPage + 1));
      }
    }
  };
  useEffect(() => {
    const boxElement: any = boxRef?.current;
    boxElement.addEventListener('scroll', handleScroll);
    return () => {
      boxElement.removeEventListener('scroll', handleScroll);
    };
  }, [isLoadingEmailsByFolderIdData, mailCurrentPage]);

  const mailList: any = useAppSelector(
    (state: any) => state?.outlook?.mailList,
  );

  useEffect(() => {
    if (emailsByFolderIdData?.data) {
      dispatch(
        setMailList(emailsByFolderIdData?.data?.map((item: any) => item)),
      );
    }
  }, [emailsByFolderIdData?.data, manualActionsTrack]);

  const loadingCheck =
    mailList?.length === 0 || isRefresh
      ? isLoadingEmailsByFolderIdData === API_STATUS?.PENDING
      : false;

  useEffect(() => {
    if (isLoadingEmailsByFolderIdData === API_STATUS?.FULFILLED) {
      setIsRefresh(false);
    }
  }, [isLoadingEmailsByFolderIdData]);

  return (
    <Box
      minHeight={'calc(100vh - 350px)'}
      sx={{
        overflowY: 'auto',
        scrollbarColor: `${theme.palette?.grey[700]} ${theme.palette?.grey[400]}`,
      }}
    >
      <Box sx={styles?.notificationWrap}>
        <FormControlLabel
          label="Select All"
          control={
            <Checkbox
              color="primary"
              name="Id"
              onClick={handleSelectAll}
              checked={
                emailsByFolderIdData?.data?.length > 0
                  ? selectedRecords?.length ===
                    emailsByFolderIdData?.data?.length
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
          onClick={handelRefresh}
        >
          Refresh
        </Button>
      </Box>

      {mailTabType?.display_name?.toLowerCase() === EMAIL_TABS_TYPES?.TRASH && (
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
              <u>Empty Trash now</u>
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
                {mailList && (
                  <>
                    {mailList?.length > 0 ? (
                      mailList?.map((item: any) => (
                        <>
                          {mailTabType?.id === item?.parentFolderId && (
                            <>
                              <Box
                                key={uuidv4()}
                                sx={styles?.card(theme)}
                                style={{
                                  background:
                                    activeRecord?.id === item?.id
                                      ? theme?.palette?.grey[100]
                                      : theme?.palette?.common?.white,
                                }}
                              >
                                <Checkbox
                                  checked={selectedRecords?.some(
                                    (email: any) => email?.id === item?.id,
                                  )}
                                  onChange={() => handleCheckboxClick(item)}
                                />
                                <Box onClick={() => handelMailClick(item)}>
                                  {mailTabType?.display_name ===
                                  EMAIL_TABS_TYPES?.SCHEDULE ? (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: item?.isRead ? '' : 700,
                                        color: theme?.palette?.success?.main,
                                      }}
                                    >
                                      {'['} Scheduled {']'}
                                    </Typography>
                                  ) : (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingRight: '20px',
                                      }}
                                    >
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          width: '19vw',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontWeight: item?.isRead ? '' : 700,
                                        }}
                                      >
                                        <>
                                          {mailTabType?.displayName?.toLowerCase() ===
                                          EMAIL_TABS_TYPES?.DRAFTS ? (
                                            <>
                                              <span
                                                style={{
                                                  color:
                                                    theme?.palette?.error?.main,
                                                }}
                                              >
                                                [DRAFT]
                                              </span>{' '}
                                              {item?.toRecipients?.map(
                                                (item: any) => (
                                                  <>
                                                    {
                                                      item?.emailAddress
                                                        ?.address
                                                    }
                                                    ;{' '}
                                                  </>
                                                ),
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {mailTabType?.displayName?.toLowerCase() ===
                                              OUTLOOK_EMAIL_TABS_TYPES?.SENT?.toLowerCase() ? (
                                                <>
                                                  {item?.toRecipients?.map(
                                                    (item: any) =>
                                                      item?.emailAddress
                                                        ?.address,
                                                  ) ?? '--'}{' '}
                                                </>
                                              ) : (
                                                <>
                                                  {item?.from?.emailAddress
                                                    ?.name ?? '--'}{' '}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      </Typography>
                                      {item?.hasAttachments && (
                                        <PaperClipIcon
                                          color={theme?.palette?.primary?.main}
                                        />
                                      )}
                                    </Box>
                                  )}

                                  <Typography
                                    variant="body3"
                                    sx={{
                                      fontWeight: item?.isRead ? 600 : 700,
                                    }}
                                    color={theme?.palette?.custom?.bright}
                                    margin={'8px 0px'}
                                  >
                                    {item?.subject}
                                  </Typography>
                                  <Typography
                                    variant="body3"
                                    margin={'3px 0px'}
                                    sx={{
                                      display: '-webkit-box',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 3,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {item?.bodyPreview}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: theme?.palette?.grey[900],
                                      fontSize: '12px',
                                    }}
                                  >
                                    {dayjs(item?.lastModifiedDateTime)?.format(
                                      TIME_FORMAT?.UI,
                                    )}
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          )}
                        </>
                      ))
                    ) : (
                      <>No record found</>
                    )}
                  </>
                )}
                {breakScrollOperation === false && (
                  <>
                    {isLoadingEmailsByFolderIdData === API_STATUS?.PENDING && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress size={30} />
                      </Box>
                    )}
                  </>
                )}
                {mailList?.length > 0 && (
                  <>
                    {breakScrollOperation === true && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        No more records
                      </Box>
                    )}
                  </>
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
