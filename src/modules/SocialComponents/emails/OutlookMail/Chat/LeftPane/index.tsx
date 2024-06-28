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
  setBreakScrollOperation,
  setMailCurrentPage,
  setMailList,
  setMailTabType,
  setSearchTerm,
  setSelectedRecords,
} from '@/redux/slices/email/outlook/slice';
import { useAppSelector } from '@/redux/store';
import CommonDrawer from '@/components/CommonDrawer';
import {
  useGetAuthURLOutlookQuery,
  useGetEmailsByFolderIdOutlookQuery,
  useGetMailFoldersOutlookQuery,
} from '@/services/commonFeatures/email/outlook';
import CommonModal from '@/components/CommonModal';
import { END_POINTS } from '@/routesConstants/endpoints';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';

const LeftPane = ({
  isOpenSendEmailDrawer,
  setIsOpenSendEmailDrawer,
  mailType,
  setMailType,
}: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isRefresh, setIsRefresh] = useState(false);
  const [isReloginModalOpen, setIsReloginModalOpen] = useState(false);

  const mailTabType: any = useAppSelector(
    (state: any) => state?.outlook?.mailTabType,
  );
  const searchTerm: any = useAppSelector(
    (state: any) => state?.outlook?.searchTerm,
  );
  const mailCurrentPage: any = useAppSelector(
    (state: any) => state?.outlook?.mailCurrentPage,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const {
    data: foldersData,
    isLoading,
    isError,
  } = useGetMailFoldersOutlookQuery({});

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
        page: mailCurrentPage,
        limit: PAGINATION?.PAGE_LIMIT,
        ...(searchTerm && { search: searchTerm }),
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

  const { data: authURLOutlook } = useGetAuthURLOutlookQuery({});
  useEffect(() => {
    if (isError) {
      setIsReloginModalOpen(true);
    }
  }, [isError]);

  const oauthUrl = `${authURLOutlook?.data}`;

  const [trackRenders, setTrackRenders] = useState<any>(1);
  useEffect(() => {
    if (trackRenders === 1) {
      setTrackRenders(2);
    } else {
      if (emailsByFolderIdData?.data?.length < 1) {
        dispatch(setBreakScrollOperation(true));
      }
    }
  }, [isLoadingEmailsByFolderIdData]);

  const handelToggleTab = (value: any) => {
    if (value?.displayName !== mailTabType?.displayName) {
      dispatch(setMailTabType(value));
      dispatch(setActiveRecord({}));
      dispatch(setSelectedRecords([]));
      dispatch(setMailList('clear'));
      dispatch(setMailCurrentPage(1));
      dispatch(setBreakScrollOperation(false));
      setTrackRenders(1);
      refetch();

      dispatch(setSearchTerm(''));
    }
  };

  useEffect(() => {
    if (searchTerm?.length > 0) {
      dispatch(setActiveRecord({}));
      dispatch(setSelectedRecords([]));
      dispatch(setMailList('clear'));
      dispatch(setMailCurrentPage(1));
      dispatch(setBreakScrollOperation(false));
      setTrackRenders(1);
      refetch();
    }
  }, [searchTerm]);

  const handelRefresh = () => {
    dispatch(setMailList('clear'));
    dispatch(setMailCurrentPage(1));
    dispatch(setBreakScrollOperation(false));
    setIsRefresh(true);
    refetch();

    dispatch(setSearchTerm(''));
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
          <ActionBtn
            sortedData={sortedData}
            mailType={mailType}
            setMailType={setMailType}
            setIsOpenSendEmailDrawer={setIsOpenSendEmailDrawer}
            isOpenSendEmailDrawer={isOpenSendEmailDrawer}
            handelRefresh={handelRefresh}
          />
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
        emailsByFolderIdData={emailsByFolderIdData}
        isLoadingEmailsByFolderIdData={isLoadingEmailsByFolderIdData}
        refetch={refetch}
        mailTabType={mailTabType}
        trackRenders={trackRenders}
        setTrackRenders={setTrackRenders}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
        handelRefresh={handelRefresh}
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

      <CommonModal
        open={isReloginModalOpen}
        title={'Token Expired'}
        cancelIcon={false}
      >
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() =>
              router.push(`${END_POINTS?.EMAIL_VIEW}?redirect=${true}`)
            }
          >
            Back to emails
          </Button>
          <Button variant="contained" onClick={() => window.open(oauthUrl)}>
            Login Again
          </Button>
        </Box>
      </CommonModal>
    </Box>
  );
};

export default LeftPane;
