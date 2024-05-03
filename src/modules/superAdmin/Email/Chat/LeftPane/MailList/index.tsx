import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetEmailsByFolderIdQuery } from '@/services/commonFeatures/email';
import {
  setActiveRecord,
  setSelectedRecords,
} from '@/redux/slices/email/slice';
import { PAGINATION } from '@/config';
import { API_STATUS } from '@/constants';

const MailList = () => {
  const theme = useTheme();
  const mailTabType: any = useAppSelector(
    (state: any) => state?.email?.mailTabType,
  );

  const [isGetEmailsRequest, setIsGetEmailsRequest] = useState(true);

  const dispatch: any = useAppDispatch();

  const {
    data: emailsByFolderIdData,
    status: isLoadingEmailsByFolderIdData,
    refetch,
  } = useGetEmailsByFolderIdQuery(
    {
      params: {
        page: PAGINATION?.CURRENT_PAGE,
        limit: PAGINATION?.PAGE_LIMIT,
        folderId: mailTabType?.id,
      },
    },
    { skip: isGetEmailsRequest },
  );

  useEffect(() => {
    if (mailTabType) {
      setIsGetEmailsRequest(false);
    }
  }, [mailTabType]);

  const selectedRecords = useAppSelector(
    (state: any) => state?.email?.selectedRecords,
  );

  const activeRecord = useAppSelector(
    (state: any) => state?.email?.activeRecord,
  );

  const handleCheckboxClick = (email: any) => {
    const safeSelectedRecords: any = Array.isArray(selectedRecords)
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
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </Box>

      {isLoadingEmailsByFolderIdData === API_STATUS?.PENDING ? (
        <>
          <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
        </>
      ) : (
        <>
          {emailsByFolderIdData?.data ? (
            <>
              {emailsByFolderIdData?.data?.length > 0 ? (
                emailsByFolderIdData?.data?.map((item: any) => (
                  <Box
                    key={uuidv4()}
                    sx={styles?.card}
                    style={{
                      background:
                        activeRecord?.id === item?.id
                          ? theme?.palette?.grey[100]
                          : theme?.palette?.common?.white,
                    }}
                    onClick={() => dispatch(setActiveRecord(item))}
                  >
                    <Checkbox
                      checked={selectedRecords?.some(
                        (email: any) => email?.id === item?.id,
                      )}
                      onChange={() => handleCheckboxClick(item)}
                    />
                    <Box>
                      <Typography variant="h6">
                        {item?.from[0]?.name} {item?.lastName} {item?.reff}
                      </Typography>
                      <Typography
                        variant="body3"
                        sx={{ fontWeight: '600' }}
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
                      <Typography variant="body2">{item?.time}</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <>No record found</>
              )}
            </>
          ) : (
            <>{[1, 2, 3]?.map((index) => <SkeletonBox key={index} />)}</>
          )}
        </>
      )}
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
