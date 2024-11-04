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

import useEmails from './useEmails';

import { styles } from '../../ViewDetails.style';

import {
  GmailIcon,
  MailIcon,
  OutlookIcon,
  SendArrowIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import {
  useDeleteAssociationEmailMutation,
  useGetAssociatedEmailsQuery,
} from '@/services/airSales/deals/view-details/emails';
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
import { useDispatch } from 'react-redux';
import {
  setCurrentEmailAssets,
  setCurrentForwardAttachments,
} from '@/redux/slices/email/outlook/slice';
import CommonModal from '@/components/CommonModal';
import { useGetMailDetailsOutlookQuery } from '@/services/commonFeatures/email/outlook';
import ProfileNameIcon from '@/components/ProfileNameIcon';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';

const EmailComp = ({ moduleType, moduleId }: any) => {
  const dispatch = useDispatch();
  const { theme } = useNameWithStyledWords();

  const [isViewDetailModal, setIsViewDetailModal] = useState(false);

  const [isDeleteAssociationModal, setIsDeleteAssociationModal] =
    useState(false);

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
    params: {
      meta: false,
      ...(moduleType === 'DEAL' && { dealId: moduleId }),
      ...(moduleType === 'COMPANY' && { companyIds: moduleId }),
      ...(moduleType === 'CONTACT' && { createdBy: moduleId }),
    },
  });

  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const selectedObj = selectedCheckboxes[0];

  const { data: messageDetailsData, isLoading: statusMessageDetailsData } =
    useGetMailDetailsOutlookQuery(
      {
        params: {
          conversationId: selectedObj?.threadId,
        },
      },
      { skip: selectedObj?.threadId ? false : true },
    );

  const sortedMessagesDataArray =
    messageDetailsData?.data && [...messageDetailsData?.data?.value]?.reverse();

  const [deleteAssociationEmail, { isLoading: deleteAssociationEmailLoading }] =
    useDeleteAssociationEmailMutation();

  const handleDeleteHandler = async () => {
    const payload = {
      moduleType: moduleType,
      moduleId: moduleId,
      id: selectedObj?._id,
    };
    try {
      await deleteAssociationEmail({
        params: payload,
      }).unwrap();
      enqueueSnackbar('Association Deleted Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

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
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_THREAD]}
                >
                  <MenuItem onClick={() => setIsViewDetailModal(true)}>
                    View Thread
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_DEALS_PERMISSIONS?.DEAL_FORWARD_EMAIL,
                  ]}
                >
                  <MenuItem
                    onClick={() => {
                      setIsOpenSendEmailDrawer(true);
                      setMailType(CREATE_EMAIL_TYPES?.FORWARD);
                      dispatch(
                        setCurrentEmailAssets({
                          provider: selectedObj?.provider,
                          messageId: selectedObj?.id,
                          id: selectedObj?.id,
                          from: selectedObj?.from?.emailAddress?.address,
                          others: {
                            from: `${selectedObj?.from?.emailAddress?.name} ${'<'}
                           ${selectedObj?.from?.emailAddress?.address}
                           ${'>'}`,
                            sent: selectedObj?.createdDateTime,
                            to: selectedObj?.toRecipients?.map(
                              (item: any) => item?.emailAddress?.address,
                            ),
                            subject: selectedObj?.subject,
                            body: removeSignatureDiv(selectedObj?.message),
                            attachments: selectedObj?.attachments,
                          },
                        }),
                      );
                      handleCloseMenu();

                      dispatch(
                        setCurrentForwardAttachments(
                          selectedObj?.attachments?.map((item: any) => item),
                        ),
                      );
                    }}
                  >
                    Forward
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REPLY_EMAIL]}
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
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_DELETE_EMAIL]}
                >
                  <MenuItem onClick={() => setIsDeleteAssociationModal(true)}>
                    Delete
                  </MenuItem>
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
          </Box>
        </Grid>
      </Grid>

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
            {data?.data?.length ? (
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
                        sx={{
                          alignSelf: 'flex-start',
                          pt: isMobile ? 0.8 : 1.7,
                        }}
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
                            color: theme?.palette?.primary?.main,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ fontWeight: '500' }}>
                            {extractInfo({ data: item?.from })}
                          </span>
                          <span
                            style={{
                              color: theme?.palette?.common?.black,
                              padding: '0px 6px',
                            }}
                          >
                            Email to :
                          </span>{' '}
                          <span style={{ fontWeight: '500' }}>
                            {extractInfo({ data: item?.to[0] })}
                          </span>
                        </Typography>
                      </Box>
                      <Typography
                        variant="body3"
                        sx={{ color: theme?.palette?.custom?.main }}
                      >
                        {dayjs(item?.createdAt)?.format(
                          DATE_TIME_FORMAT?.DMYhmma,
                        )}
                      </Typography>

                      <Box
                        dangerouslySetInnerHTML={{ __html: item?.subject }}
                      />
                    </Box>

                    {item?.provider && (
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
            ) : (
              <>No records found</>
            )}
          </>
        )}
      </Grid>

      <SendEmailDrawer
        openDrawer={isOpenSendEmailDrawer}
        setOpenDrawer={setIsOpenSendEmailDrawer}
        drawerType={mailType}
        setMailType={setMailType}
        // dealId={dealId}
        moduleType={moduleType}
        moduleId={moduleId}
      />

      <CommonModal
        open={isViewDetailModal}
        handleClose={() => setIsViewDetailModal(false)}
        handleCancel={() => setIsViewDetailModal(false)}
        title={selectedObj?.subject}
        width="40vw"
        headerIcon={
          <Box
            sx={{
              background: theme?.palette?.custom?.light_greenish,
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
            }}
          >
            <MailIcon color={theme?.palette?.success?.main} />
          </Box>
        }
        footer={false}
      >
        {statusMessageDetailsData ? (
          <>Loading</>
        ) : (
          <>
            {sortedMessagesDataArray?.length > 0 ? (
              <>
                {sortedMessagesDataArray?.map((item: any) => {
                  const nameParts = item?.from?.emailAddress?.name
                    .trim()
                    .split('-');
                  return (
                    <Grid item xs={12} sx={styles?.emailBox} key={uuidv4()}>
                      <Grid container spacing={1}>
                        <Grid item sm={1.6} xs={12}>
                          {item?.userImg || (
                            <ProfileNameIcon
                              firstName={
                                item?.from?.emailAddress?.name
                                  ?.trim()
                                  ?.split(' ')[0]
                              }
                              lastName={
                                (nameParts && nameParts[indexNumbers?.ONE]) ??
                                item?.from?.emailAddress?.name
                                  ?.trim()
                                  ?.split(' ')[1]
                              }
                            />
                          )}
                        </Grid>
                        <Grid item sm={10.4} xs={12}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{ fontSize: '18px' }}
                              >
                                {item?.from?.emailAddress?.name}
                              </Typography>
                              <RecipientsBoxWrapper
                                data={item?.toRecipients}
                                label={'To'}
                              />
                              {item?.ccRecipients?.length > 0 && (
                                <RecipientsBoxWrapper
                                  data={item?.ccRecipients}
                                  label={'Cc'}
                                />
                              )}
                              {item?.bccRecipients?.length > 0 && (
                                <RecipientsBoxWrapper
                                  data={item?.bccRecipients}
                                  label={'Bcc'}
                                />
                              )}
                            </Box>
                            <Typography
                              variant="body3"
                              sx={{ color: theme?.palette?.grey[900] }}
                            >
                              {dayjs(item?.createdDateTime)?.format(
                                DATE_TIME_FORMAT?.DMYhmma,
                              )}
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {item?.subject}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {item?.bodyPreview}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <>no Threads found</>
            )}
          </>
        )}
        <></>
      </CommonModal>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={isDeleteAssociationModal}
        handleClose={() => setIsDeleteAssociationModal(false)}
        handleSubmitBtn={handleDeleteHandler}
        loading={deleteAssociationEmailLoading}
      />
    </Box>
  );
};

const RecipientsBoxWrapper = ({ data = [], label }: any) => {
  return (
    <Box>
      <Typography variant="body2" sx={{ cursor: 'default', fontWeight: '600' }}>
        {label}: &nbsp;
        {data?.map((item: any, index: number) => (
          <span key={uuidv4()} style={{ fontWeight: '500' }}>
            {item?.emailAddress?.name}
            {index < data?.length - 1 && ', '}
          </span>
        ))}
      </Typography>
    </Box>
  );
};

const removeSignatureDiv = (htmlContent: string) => {
  if (!htmlContent) return htmlContent;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const signatureDiv = doc.getElementById('SIGNATURE');
  if (signatureDiv) {
    signatureDiv.remove();
  }
  return doc.body.innerHTML;
};

type ExtractInfoProps = {
  data: string;
};

function extractInfo({ data }: ExtractInfoProps): string | null {
  const regexWithBrackets = /^(.*?)\s*<(.+?)>$/;
  const regexEmailOnly = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const matchWithBrackets = data.match(regexWithBrackets);

  if (matchWithBrackets) {
    const name = matchWithBrackets[1].trim();
    const email = matchWithBrackets[2].trim();
    return name ? name : email;
  } else if (regexEmailOnly.test(data)) {
    return data.trim();
  }
  return null;
}

export default EmailComp;
