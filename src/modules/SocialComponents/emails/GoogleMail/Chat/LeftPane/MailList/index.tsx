import {
  Box,
  Button,
  Checkbox,
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
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  setActiveGmailRecord,
  setSelectedGmailRecords,
} from '@/redux/slices/email/gmail/slice';
import { usePatchGmailMessageMutation } from '@/services/commonFeatures/email/gmail';

const MailList = ({
  emailsByFolderIdData,
  isLoadingEmailsByFolderIdData,
  refetch,
  mailTabType,
}: any) => {
  const theme = useTheme();

  const [dataArray, setDataArray] = useState<any>([]);

  const dispatch = useDispatch();

  const selectedGmailRecords: any = useAppSelector(
    (state: any) => state?.gmail?.selectedGmailRecords,
  );

  const activeGmailRecord = useAppSelector(
    (state: any) => state?.gmail?.activeGmailRecord,
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
          unread: true,
          starred: false,
        };
        try {
          const response = await patchGmailMessage({
            body: payload,
          })?.unwrap();
          const updatedData = dataArray?.data?.map((item: any) =>
            item?.id === response?.data?.id ? response?.data : item,
          );
          setDataArray((prevState: any) => ({
            ...prevState,
            data: updatedData,
          }));
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
          onClick={() => refetch()}
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

      <Box sx={{ maxHeight: '62vh', overflow: 'auto' }}>
        {isLoadingEmailsByFolderIdData === API_STATUS?.REJECTED ? (
          <Box>
            <Typography variant="body2" color={theme?.palette?.error?.main}>
              Something went wrong
            </Typography>
          </Box>
        ) : (
          <>
            {isLoadingEmailsByFolderIdData === API_STATUS?.PENDING ? (
              <>
                <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
              </>
            ) : (
              <>
                {emailsByFolderIdData && (
                  <>
                    {emailsByFolderIdData?.length > 0 ? (
                      emailsByFolderIdData?.map((item: any) => (
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
                            onClick={() => handelMailClick(item)}
                          >
                            <Checkbox
                              checked={selectedGmailRecords?.some(
                                (email: any) => email?.id === item?.id,
                              )}
                              onChange={() => handleCheckboxClick(item)}
                            />
                            <Box>
                              {mailTabType?.display_name ===
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
                                  }}
                                >
                                  {' '}
                                  {item?.name}{' '}
                                </Typography>
                              )}

                              <Typography
                                variant="body3"
                                sx={{
                                  fontWeight: item?.readMessage ? 700 : 600,
                                }}
                                color={'primary'}
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
                                }}
                              >
                                {item?.snippet}
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
