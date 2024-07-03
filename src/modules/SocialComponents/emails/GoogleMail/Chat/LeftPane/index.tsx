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
import { useAppSelector } from '@/redux/store';
import CommonDrawer from '@/components/CommonDrawer';
import { PAGINATION } from '@/config';
import {
  useGetAuthURLGmailQuery,
  useGetGmailFoldersQuery,
  useGetGmailsByFolderIdQuery,
} from '@/services/commonFeatures/email/gmail';
import {
  setActiveGmailRecord,
  setGmailCurrentPage,
  setGmailList,
  setGmailSearch,
  setGmailTabType,
  setSelectedGmailRecords,
} from '@/redux/slices/email/gmail/slice';
import { Gmail_CONST } from '@/constants';
import CommonModal from '@/components/CommonModal';
import { SOCIAL_FEATURES_GMAIL } from '@/routesConstants/paths';
import Link from 'next/link';

const LeftPane = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const gmailTabType: any = useAppSelector(
    (state: any) => state?.gmail?.gmailTabType,
  );

  const gmailList: any = useAppSelector(
    (state: any) => state?.gmail?.gmailList,
  );
  const gmailSearch: any = useAppSelector(
    (state: any) => state?.gmail?.gmailSearch,
  );
  const gmailCurrentPage: any = useAppSelector(
    (state: any) => state?.gmail?.gmailCurrentPage,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { data: foldersData, isLoading, isError } = useGetGmailFoldersQuery({});
  const dataToShow = ['Inbox', 'Draft', 'Sent', 'Schedule', 'Trash'];
  const filteredData = foldersData?.data?.labels?.filter((item: any) => {
    return dataToShow
      ?.map((name) => name?.toLowerCase())
      ?.includes(item?.name?.toLowerCase());
  });

  const [isGetEmailsRequest, setIsGetEmailsRequest] = useState(true);

  const {
    data: emailsByFolderIdData,
    status: isLoadingEmailsByFolderIdData,
    refetch,
  } = useGetGmailsByFolderIdQuery(
    {
      params: {
        ...(gmailCurrentPage && { pageToken: gmailCurrentPage }),
        limit: PAGINATION?.PAGE_LIMIT,
        folderId: gmailTabType?.name,
        ...(gmailSearch && { search: gmailSearch }),
      },
    },
    { skip: isGetEmailsRequest },
  );

  useEffect(() => {
    if (gmailTabType) {
      setIsGetEmailsRequest(false);
    }
  }, [gmailTabType]);

  useEffect(() => {
    if (emailsByFolderIdData) {
      dispatch(setGmailList(emailsByFolderIdData?.data?.emails));
    }
  }, [emailsByFolderIdData]);

  useEffect(() => {
    if (gmailSearch?.length > 0) {
      dispatch(setActiveGmailRecord({}));
      dispatch(setSelectedGmailRecords([]));
      dispatch(setGmailList('clear'));
      dispatch(setGmailCurrentPage(''));
      refetch();
    } else {
      dispatch(setGmailSearch(''));
    }
  }, [gmailSearch]);

  const handelToggleTab = (value: any) => {
    if (value?.name !== gmailTabType?.name) {
      dispatch(setGmailTabType(value));
      dispatch(setGmailList('clear'));
      dispatch(setGmailCurrentPage(''));
      dispatch(setActiveGmailRecord({}));
      dispatch(setSelectedGmailRecords([]));
      refetch();
    }
  };

  let listOfEmail;
  if (Array?.isArray(gmailList)) {
    if (gmailTabType?.name === 'DRAFT') {
      listOfEmail = gmailList
        ?.map((thread: any) => {
          const draftId = thread?.id || '';
          const id = thread?.message?.id || '';

          const threadId = thread?.message?.threadId || '';
          const messageId = thread?.message?.id || '';
          const headers = thread?.message?.payload?.headers || [];
          const to =
            headers?.find((header: any) => header?.name === Gmail_CONST?.TO)
              ?.value || '';
          const cc =
            headers?.find((header: any) => header?.name === Gmail_CONST?.CC)
              ?.value || '';
          const Bcc =
            headers?.find((header: any) => header?.name === Gmail_CONST?.BCC)
              ?.value || '';
          const name =
            headers?.find((header: any) => header?.name === Gmail_CONST?.FROM)
              ?.value || '';
          const subject =
            headers?.find(
              (header: any) => header?.name === Gmail_CONST?.SUBJECT,
            )?.value || '(no-subject)';
          const snippet = thread?.message?.snippet || '';
          const date =
            headers?.find((header: any) => header?.name === Gmail_CONST?.DATE)
              ?.value || '';
          const readMessage = thread?.message?.labelIds?.includes('UNREAD');
          const attchImages = thread?.messages?.payload?.parts;
          return {
            draftId,
            id,
            to,
            cc,
            Bcc,
            name,
            subject,
            snippet,
            date,
            threadId,
            readMessage,
            messageId,
            attchImages,
          };
        })
        .flat();
    } else {
      listOfEmail = gmailList
        ?.map((thread: any) => {
          const id = thread?.id || '';

          const messages = thread?.messages || [];
          const lastMessage = messages[messages?.length - 1];

          if (!lastMessage) {
            return null;
          }
          const threadId = lastMessage?.threadId || '';
          const messageId = lastMessage?.id || '';
          const headers = lastMessage?.payload?.headers || [];
          const to =
            headers?.find((header: any) => header?.name === Gmail_CONST?.TO)
              ?.value || '';
          const cc =
            headers?.find((header: any) => header?.name === Gmail_CONST?.Cc)
              ?.value || '';
          const Bcc =
            headers?.find((header: any) => header?.name === Gmail_CONST?.BCC)
              ?.value || '';
          const name =
            headers?.find((header: any) => header?.name === Gmail_CONST?.FROM)
              ?.value || '';
          const subject =
            headers?.find(
              (header: any) => header?.name === Gmail_CONST?.SUBJECT,
            )?.value || '(no-subject)';
          const snippet = lastMessage?.snippet || '';
          const date =
            headers
              ?.find((header: any) => header?.name === Gmail_CONST?.DATE)
              ?.value.replace(/ -\d{4}$/, '') || '';
          const readMessage = lastMessage?.labelIds?.includes('UNREAD');
          const attchImages = lastMessage?.payload?.parts;

          return {
            id,
            to,
            cc,
            Bcc,
            name,
            subject,
            snippet,
            date,
            threadId,
            readMessage,
            messageId,
            attchImages,
          };
        })
        .flat();
    }
  }
  const [isReloginModalOpen, setIsReloginModalOpen] = useState(false);

  const { data: authURLGmail } = useGetAuthURLGmailQuery({});
  useEffect(() => {
    if (isError) {
      setIsReloginModalOpen(true);
    }
  }, [isError]);

  const oauthUrl = `${authURLGmail?.data}`;

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
                  gmailTabType?.name?.toLowerCase() ===
                  item?.name?.toLowerCase()
                    ? theme?.palette?.grey[400]
                    : '',
                '&:hover': {
                  backgroundColor:
                    gmailTabType?.name?.toLowerCase() ===
                    item?.name?.toLowerCase()
                      ? theme?.palette?.grey[400]
                      : '',
                  border: `1px solid ${theme?.palette?.grey[700]}`,
                },
              }}
            >
              {item?.name?.toLowerCase()}
            </Button>
          ))}
        </ButtonGroup>
      )}
      <MailList
        emailsByFolderIdData={listOfEmail}
        isLoadingEmailsByFolderIdData={isLoadingEmailsByFolderIdData}
        refetch={refetch}
        gmailTabType={gmailTabType}
        pageToken={emailsByFolderIdData}
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
          <Link
            href={`${SOCIAL_FEATURES_GMAIL?.MAIN_EMAIL_PAGE}?redirect=${true}`}
          >
            <Button variant="outlined">Back to emails</Button>
          </Link>

          <Button variant="contained" onClick={() => window.open(oauthUrl)}>
            Login Again
          </Button>
        </Box>
      </CommonModal>
    </Box>
  );
};

export default LeftPane;
