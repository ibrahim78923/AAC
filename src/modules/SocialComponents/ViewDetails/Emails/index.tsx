import Image from 'next/image';

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { isNullOrEmpty } from '@/utils';

import useEmails from './useEmails';
import EmailActionDropDown from './EmailActionDropDown';
import EmailEditorDrawer from './EmailEditorDrawer';

import { styles } from '../ViewDetails.style';

import {
  GmailIcon,
  MessageIcon,
  OutlookIcon,
  SMSIcon,
  SendArrowIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { IMG_URL } from '@/config';
import CustomPagination from '@/components/CustomPagination';

const Emails = ({ companyId }: any) => {
  const { theme } = useNameWithStyledWords();

  const {
    openDrawer,
    setOpenDrawer,
    handleCheckboxChange,
    selectedCheckboxes,
    setSelectedCheckboxes,
    EmailListData,
    EmailListIsLoading,
    EmailListIsFetching,
    messageDetailsData,
    isLoadingDetailsMessages,
    isFetchingDetailsMessages,
    setPageLimit,
    setPage,
  } = useEmails(companyId);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box sx={styles?.headingSpacingBetween}>
            <Typography variant="h4"> Emails</Typography>
            {!isNullOrEmpty(EmailListData?.data?.commonEmails) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <EmailActionDropDown
                  setOpenDrawer={setOpenDrawer}
                  selectedCheckboxes={selectedCheckboxes}
                  setSelectedCheckboxes={setSelectedCheckboxes}
                  messageDetailsData={messageDetailsData}
                  isLoadingDetailsMessages={isLoadingDetailsMessages}
                  isFetchingDetailsMessages={isFetchingDetailsMessages}
                  companyId={companyId}
                />
                <Button
                  variant="contained"
                  className="small"
                  sx={{ gap: 0.5 }}
                  onClick={() => setOpenDrawer('new')}
                >
                  <Typography variant="body2">Send Emails</Typography>
                  <SendArrowIcon />
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {EmailListIsLoading || EmailListIsFetching ? (
        <>
          {[1, 2, 3]?.map((index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={'100%'}
              height={100}
              sx={{ marginTop: '30px' }}
            />
          ))}{' '}
        </>
      ) : (
        <>
          {isNullOrEmpty(EmailListData?.data?.commonEmails) && (
            <Box
              sx={{
                height: '35vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <MessageIcon />
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Send Email right now from the CRM
              </Typography>
              <Button variant="contained" sx={{ height: '35px', gap: 0.5 }}>
                <Typography variant="body2">Send Emails</Typography>
                <SendArrowIcon />
              </Button>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.slateBlue?.main }}
              >
                Bring Your emails into the CRM
              </Typography>
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ color: 'grey', gap: 0.5 }}
                  className="small"
                >
                  <GmailIcon /> <Typography variant="body2">Gmail</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ color: 'grey', gap: 0.5 }}
                  className="small"
                >
                  <OutlookIcon />
                  <Typography variant="body2">Microsoft Outlook</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ color: 'grey', gap: 0.5 }}
                  className="small"
                >
                  <SMSIcon /> <Typography variant="body2">Others</Typography>
                </Button>
              </Box>
            </Box>
          )}

          {!isNullOrEmpty(EmailListData?.data?.commonEmails) && (
            <Grid item xs={12} sx={styles?.horizontalTabsInnnerBox}>
              {EmailListData?.data?.commonEmails?.map((item: any) => (
                <Grid
                  container
                  key={uuidv4()}
                  sx={{
                    py: 2,
                    px: 1.5,
                    mb: 1,
                    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                    borderRadius: '8px',
                    border: '1px solid #f2f2f2',
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    lg={0.5}
                    sm={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      color="primary"
                      name={'name'}
                      onChange={(event) => handleCheckboxChange(event, item)}
                      checked={selectedCheckboxes?.some(
                        (selectedItem: any) => selectedItem?._id === item?._id,
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    lg={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={`${IMG_URL}${item?.createdByAvatar?.url}`}
                      width={60}
                      height={60}
                      alt="user"
                      style={{
                        border: '1px solid #1F2937',
                        borderRadius: '50px',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={10} sm={9} sx={{ gap: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme?.palette?.primary?.main }}
                        >
                          {' '}
                          {item?.createdByName} &nbsp;{' '}
                        </Typography>
                      </Box>

                      <Typography variant="subtitle2">
                        Email to : &nbsp;
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme?.palette?.primary?.main,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {item?.to}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body3"
                      sx={{ color: theme?.palette?.custom?.main }}
                    >
                      {dayjs(item?.createdAt).format(
                        DATE_TIME_FORMAT?.DD_MMM_YYYY_hh_mm_A,
                      )}
                    </Typography>
                    <Typography variant="subtitle2">{item?.subject}</Typography>
                    <Typography variant="body2">
                      {extractText(item?.message)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    lg={0.5}
                    sm={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item?.provider === 'GMAIL' ? (
                      <GmailIcon width={'28'} />
                    ) : (
                      <OutlookIcon width={'28'} />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}

          <CustomPagination
            count={EmailListData?.data?.meta?.pages}
            pageLimit={EmailListData?.data?.meta?.limit}
            currentPage={EmailListData?.data?.meta?.page}
            totalRecords={EmailListData?.data?.meta?.total}
            onPageChange={(page: number) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}

      <EmailEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        companyId={companyId}
        selectedCheckboxes={selectedCheckboxes}
        messageDetailsData={messageDetailsData}
        setSelectedCheckboxes={setSelectedCheckboxes}
      />
    </Box>
  );
};

const extractText = (html: any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // Select the main text within the div
  return doc.body.querySelector('p')?.textContent || '';
};

export default Emails;
