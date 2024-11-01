import Image from 'next/image';

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { isNullOrEmpty } from '@/utils';

import useEmails from './useEmails';

import { NotesDataArray } from '@/mock/modules/airSales/Deals/ViewDetails';

import { styles } from '../ViewDetails.style';

import {
  GmailIcon,
  MessageIcon,
  OutlookIcon,
  SMSIcon,
  SendArrowIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { useGetAssociatedEmailsQuery } from '@/services/airSales/deals/view-details/emails';
import { IMG_URL } from '@/config';
import dayjs from 'dayjs';
import {
  CREATE_EMAIL_TYPES,
  DATE_TIME_FORMAT,
  indexNumbers,
} from '@/constants';
import SendEmailDrawer from './SendEmail';
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCurrentEmailAssets } from '@/redux/slices/email/outlook/slice';

const Emails = () => {
  const dispatch = useDispatch();

  const { theme } = useNameWithStyledWords();
  const dealId = useSearchParams()?.get('id');

  const { selectedCheckboxes, handleCheckboxChange } = useEmails();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [mailType, setMailType] = useState('');
  const { data, isLoading } = useGetAssociatedEmailsQuery({
    params: { meta: false, dealId: dealId },
  });

  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const selectedObj = selectedCheckboxes[0];

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={1} marginBottom={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4"> Emails</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={styles?.headingSpacingBetween}>
            {!isNullOrEmpty(NotesDataArray) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  endIcon={<ArrowDropDown />}
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: `${theme?.palette?.custom?.main}`,
                    padding: '5px 20px',
                  }}
                  aria-controls={isMenuOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? 'true' : undefined}
                  onClick={handleOpenMenu}
                  className="small"
                  disabled={
                    selectedCheckboxes?.length === 0 ||
                    selectedCheckboxes?.length > 1
                  }
                >
                  Action
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <PermissionsGuard
                    permissions={[
                      AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_THREAD,
                    ]}
                  >
                    <MenuItem
                    // onClick={handleOpenReassignAlert}
                    >
                      View Thread
                    </MenuItem>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[
                      AIR_SALES_DEALS_PERMISSIONS?.DEAL_FORWARD_EMAIL,
                    ]}
                  >
                    <MenuItem>Forward</MenuItem>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[
                      AIR_SALES_DEALS_PERMISSIONS?.DEAL_REPLY_EMAIL,
                    ]}
                  >
                    <MenuItem
                      onClick={() => {
                        setIsOpenSendEmailDrawer(true);
                        setMailType(CREATE_EMAIL_TYPES?.REPLY_ALL);
                        dispatch(
                          setCurrentEmailAssets({
                            provider: selectedObj?.provider,
                            messageId: selectedObj?.threadId, //need to change
                            id: selectedObj?._id,
                            from: selectedObj?.from,
                            others: {
                              from: `${selectedObj?.from[indexNumbers?.ZERO]
                                ?.name} ${'<'}
                            ${selectedObj?.from[indexNumbers?.ZERO]?.email}
                            ${'>'}`,
                              sent: selectedObj?.date,
                              to: `<>`,
                              subject: selectedObj?.subject,
                              body: '',
                              cc: selectedObj?.ccRecipients?.map(
                                (item: any) => item?.emailAddress?.address,
                              ),
                            },
                          }),
                        );
                        handleCloseMenu();
                      }}
                    >
                      Reply
                    </MenuItem>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[
                      AIR_SALES_DEALS_PERMISSIONS?.DEAL_DELETE_EMAIL,
                    ]}
                  >
                    <MenuItem>Delete</MenuItem>
                  </PermissionsGuard>
                </Menu>

                <PermissionsGuard
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_SEND_EMAIL]}
                >
                  <Button
                    variant="contained"
                    className="small"
                    sx={{ gap: 0.5 }}
                    onClick={() => {
                      setIsOpenSendEmailDrawer(true);
                      setMailType(CREATE_EMAIL_TYPES?.NEW_EMAIL);
                    }}
                  >
                    <Typography variant="body2">Send Emails</Typography>
                    <SendArrowIcon />
                  </Button>
                </PermissionsGuard>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {isNullOrEmpty(data?.data) && (
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
          <Typography variant="body2" sx={{ color: theme?.palette?.grey[900] }}>
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
              <GmailIcon width="30" height="30" />{' '}
              <Typography variant="body2">Gmail</Typography>
            </Button>

            <Button
              variant="outlined"
              sx={{ color: 'grey', gap: 0.5 }}
              className="small"
            >
              <OutlookIcon width="30" height="30" />
              <Typography variant="body2">Microsoft Outlook</Typography>
            </Button>

            <Button
              variant="outlined"
              sx={{ color: 'grey', gap: 0.5 }}
              className="small"
            >
              <SMSIcon width="30" height="30" />{' '}
              <Typography variant="body2">Others</Typography>
            </Button>
          </Box>
          <Box></Box>
        </Box>
      )}

      <Grid
        item
        xs={12}
        sx={[
          styles?.horizontalTabsInnnerBox,
          { height: 'fit-content !important' },
        ]}
      >
        {isLoading ? (
          <>
            {[1, 2, 3]?.map(() => (
              <Grid
                container
                key={uuidv4()}
                sx={{
                  py: 3,
                  px: 6.5,
                  mb: 1,
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                  borderRadius: '8px',
                  border: '1px solid #f2f2f2',
                }}
              >
                <Skeleton variant="circular" width="70px" height="70px" />
                <Box sx={{ ml: 2 }}>
                  <Skeleton
                    variant="rounded"
                    width="200px"
                    height="20px"
                    sx={{ mb: 1 }}
                  />
                  <Skeleton variant="rounded" width="170px" height="20px" />
                </Box>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {data?.data?.map((item: any) => (
              <Box
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  py: 3,
                  px: 1.5,
                  mb: 1,
                  gap: isMobile ? 1 : 2,
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                  borderRadius: '8px',
                  border: '1px solid #f2f2f2',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isMobile ? 1 : 2,
                    pb: 2,
                  }}
                >
                  <Checkbox
                    color="primary"
                    name="name"
                    checked={selectedCheckboxes.some(
                      (selected: any) => selected._id === item._id,
                    )}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{ alignSelf: 'flex-start', pt: isMobile ? 0.8 : 1.7 }}
                  />
                  <Image
                    src={`${IMG_URL}${item?.createdByAvatar?.url}`}
                    alt="Avatar"
                    width={isMobile ? 40 : 70}
                    height={isMobile ? 40 : 70}
                    style={{ borderRadius: '50%' }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span>{item?.from}</span>{' '}
                      <span style={{ color: theme?.palette?.common?.black }}>
                        Email to:
                      </span>{' '}
                      <span>{item?.to[0]}</span>
                    </Typography>
                  </Box>

                  <Typography
                    variant="body3"
                    sx={{ color: theme.palette.custom.main }}
                  >
                    {dayjs(item.createdAt).format(DATE_TIME_FORMAT.DMYhmma)}
                  </Typography>

                  <Box dangerouslySetInnerHTML={{ __html: item.subject }} />
                </Box>

                {item.provider && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                  >
                    {item.provider === 'GMAIL' && <GmailIcon />}
                    {item.provider === 'OUTLOOK' && <OutlookIcon />}
                  </Box>
                )}
              </Box>
            ))}
          </>
        )}
      </Grid>

      <SendEmailDrawer
        openDrawer={isOpenSendEmailDrawer}
        setOpenDrawer={setIsOpenSendEmailDrawer}
        drawerType={mailType}
        setMailType={setMailType}
        dealId={dealId}
      />
    </Box>
  );
};

export default Emails;
