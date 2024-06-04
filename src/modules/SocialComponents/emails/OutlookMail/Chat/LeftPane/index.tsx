import { FilterIcon } from '@/assets/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MailList from './MailList';
import ActionBtn from './ActionBtn';
import { styles } from './LeftPane.styles';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
  setActiveRecord,
  setMailList,
  setMailTabType,
  setSelectedRecords,
} from '@/redux/slices/email/outlook/slice';
import { useAppSelector } from '@/redux/store';
import CommonDrawer from '@/components/CommonDrawer';
import { PAGINATION } from '@/config';
import {
  useGetEmailsByFolderIdOutlookQuery,
  useGetMailFoldersOutlookQuery,
} from '@/services/commonFeatures/email/outlook';

const LeftPane = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mailTabType: any = useAppSelector(
    (state: any) => state?.outlook?.mailTabType,
  );

  const mailList: any = useAppSelector(
    (state: any) => state?.outlook?.mailList,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { data: foldersData, isLoading } = useGetMailFoldersOutlookQuery({});

  const dataToShow = [
    'Inbox',
    'Sent Items',
    'Drafts',
    'Schedule',
    'Deleted Items',
  ];
  const filteredData = foldersData?.data?.filter((item: any) => {
    return dataToShow
      ?.map((name) => name?.toLowerCase())
      ?.includes(item?.displayName?.toLowerCase());
  });

  const sortedData = dataToShow?.map((item) => {
    return filteredData?.find((data: any) => {
      return data?.displayName?.toLowerCase() === item?.toLowerCase();
    });
  });

  const getButtonLabel = (value: any) => {
    switch (value) {
      case 'inbox':
        return 'inbox';
      case 'drafts':
        return 'Drafts';
      case 'sent items':
        return 'Sent';
      case 'deleted items':
        return 'Deleted';
      default:
        return '';
    }
  };

  const [isGetEmailsRequest, setIsGetEmailsRequest] = useState(true);

  const {
    data: emailsByFolderIdData,
    status: isLoadingEmailsByFolderIdData,
    refetch,
  } = useGetEmailsByFolderIdOutlookQuery(
    {
      params: {
        page: PAGINATION?.CURRENT_PAGE,
        limit: PAGINATION?.PAGE_LIMIT,
      },
      id: mailTabType?.id,
    },
    { skip: isGetEmailsRequest },
  );

  useEffect(() => {
    if (mailTabType) {
      setIsGetEmailsRequest(false);
    }
  }, [mailTabType]);

  useEffect(() => {
    if (emailsByFolderIdData) {
      dispatch(setMailList(emailsByFolderIdData));
    }
  }, [emailsByFolderIdData]);

  const handelToggleTab = (value: any) => {
    if (value?.displayName !== mailTabType?.displayName) {
      dispatch(setMailTabType(value));
      dispatch(setActiveRecord({}));
      dispatch(setSelectedRecords([]));
      refetch();
    }
  };

  return (
    <Box sx={styles?.card(theme)}>
      <Box sx={styles?.emailWrap}>
        <Typography variant="h3">Email</Typography>
        <Box>
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            sx={{ marginRight: '14px', height: '36px' }}
            color="inherit"
            onClick={() => setIsFiltersOpen(true)}
          >
            Filter
          </Button>
          <ActionBtn filteredData={filteredData} />
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {[1, 2, 3, 4, 5]?.map(() => (
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={40}
              key={uuidv4()}
            />
          ))}
        </Box>
      ) : (
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="Basic button group"
          sx={{ mb: 1 }}
        >
          {sortedData?.map((item: any) => (
            <>
              {item && (
                <>
                  <Button
                    key={uuidv4()}
                    onClick={() => handelToggleTab(item)}
                    sx={{
                      border: `1px solid ${theme?.palette?.grey[700]}`,
                      borderRadius: '8px',
                      color: theme?.palette?.secondary?.main,
                      textTransform: 'capitalize',
                      backgroundColor:
                        mailTabType?.displayName?.toLowerCase() ===
                        item?.displayName?.toLowerCase()
                          ? theme?.palette?.grey[400]
                          : '',
                      '&:hover': {
                        backgroundColor:
                          mailTabType?.displayName?.toLowerCase() ===
                          item?.displayName?.toLowerCase()
                            ? theme?.palette?.grey[400]
                            : '',
                        border: `1px solid ${theme?.palette?.grey[700]}`,
                      },
                    }}
                  >
                    {getButtonLabel(item?.displayName?.toLowerCase())}
                  </Button>
                </>
              )}
            </>
          ))}
        </ButtonGroup>
      )}
      <MailList
        emailsByFolderIdData={mailList}
        isLoadingEmailsByFolderIdData={isLoadingEmailsByFolderIdData}
        refetch={refetch}
        mailTabType={mailTabType}
      />

      <CommonDrawer
        isDrawerOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title={'filter'}
        okText={'submit'}
        isOk={true}
      >
        <>Filter Cont.</>
      </CommonDrawer>
    </Box>
  );
};

export default LeftPane;
