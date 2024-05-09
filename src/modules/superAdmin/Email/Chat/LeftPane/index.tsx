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
  setMailDraftList,
  setMailList,
  setMailTabType,
} from '@/redux/slices/email/slice';
import { useAppSelector } from '@/redux/store';
import CommonDrawer from '@/components/CommonDrawer';
import {
  useGetDraftsQuery,
  useGetEmailsByFolderIdQuery,
  useGetMailFoldersQuery,
} from '@/services/commonFeatures/email';
import { PAGINATION } from '@/config';
import { EMAIL_TABS_TYPES } from '@/constants';

const LeftPane = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mailTabType: any = useAppSelector(
    (state: any) => state?.email?.mailTabType,
  );

  const mailList: any = useAppSelector((state: any) => state?.email?.mailList);
  const mailDraftList: any = useAppSelector(
    (state: any) => state?.email?.mailDraftList,
  );

  const handelToggleTab = (value: any) => {
    dispatch(setMailTabType(value));
    dispatch(setActiveRecord({}));
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { data: foldersData, isLoading } = useGetMailFoldersQuery({});
  const dataToShow = ['Inbox', 'Drafts', 'Sent', 'Schedule', 'Trash'];
  const filteredData = foldersData?.data?.filter((item: any) => {
    return dataToShow
      ?.map((name) => name?.toLowerCase())
      ?.includes(item?.display_name?.toLowerCase());
  });

  const [isGetEmailsRequest, setIsGetEmailsRequest] = useState(true);

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

  const {
    data: draftsData,
    status: isLoadingDraftsData,
    refetch: draftsDataRefetch,
  } = useGetDraftsQuery(
    {
      params: {
        page: PAGINATION?.CURRENT_PAGE,
        limit: PAGINATION?.PAGE_LIMIT,
      },
    },
    // { skip: isGetEmailsRequest },
  );

  useEffect(() => {
    if (emailsByFolderIdData) {
      dispatch(setMailList(emailsByFolderIdData));
    }
  }, [emailsByFolderIdData]);

  useEffect(() => {
    if (draftsData) {
      dispatch(setMailDraftList(draftsData));
    }
  }, [draftsData]);

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
          <ActionBtn />
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
          {filteredData?.map((item: any) => (
            <Button
              key={uuidv4()}
              onClick={() => handelToggleTab(item)}
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                color: theme?.palette?.secondary?.main,
                textTransform: 'capitalize',
                backgroundColor:
                  mailTabType?.display_name?.toLowerCase() ===
                  item?.display_name?.toLowerCase()
                    ? theme?.palette?.grey[400]
                    : '',
                '&:hover': {
                  backgroundColor:
                    mailTabType?.display_name?.toLowerCase() ===
                    item?.display_name?.toLowerCase()
                      ? theme?.palette?.grey[400]
                      : '',
                  border: `1px solid ${theme?.palette?.grey[700]}`,
                },
              }}
            >
              {item?.display_name?.toLowerCase()}
            </Button>
          ))}
        </ButtonGroup>
      )}
      <MailList
        emailsByFolderIdData={
          mailTabType?.display_name?.toLowerCase() === EMAIL_TABS_TYPES?.DRAFTS
            ? mailDraftList
            : mailList
        }
        isLoadingEmailsByFolderIdData={
          mailTabType?.display_name?.toLowerCase() === EMAIL_TABS_TYPES?.DRAFTS
            ? isLoadingDraftsData
            : isLoadingEmailsByFolderIdData
        }
        refetch={
          mailTabType?.display_name?.toLowerCase() === EMAIL_TABS_TYPES?.DRAFTS
            ? draftsDataRefetch
            : refetch
        }
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
