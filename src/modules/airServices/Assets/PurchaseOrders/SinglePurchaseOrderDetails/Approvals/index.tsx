import NoData from '@/components/NoData';
import { approvalStatus, approvalsStatusObj } from './Approvals.data';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RequestApprovalForm } from './RequestApprovalForm';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ApproveForm } from './ApproveForm';
import { RejectForm } from './RejectForm';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';
import { useApprovals } from './useApprovals';
import { Fragment } from 'react';
import { DATE_TIME_FORMAT } from '@/constants';
import { CancelRequest } from './CancelRequest';
import { fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { LoadingButton } from '@mui/lab';
import { otherDateFormat } from '@/lib/date-time';

export const Approvals = () => {
  const {
    lazyGetApprovalRequestsStatus,
    approvalsList,
    theme,
    setOpenDialog,
    page,
    pageLimit,
    setPageLimit,
    setPage,
    approvalsListMetaData,
    openDialog,
    user,
    sendReminderForPurchaseOrderApproval,
    postPurchaseOrderApprovalRemindersStatus,
  } = useApprovals();

  return (
    <>
      {lazyGetApprovalRequestsStatus?.isFetching ? (
        <SkeletonTable />
      ) : (
        <Fragment>
          {approvalsList?.length <= 0 ? (
            <NoData
              message={
                'Make Approved Purchases by sending the order to your stakeholders for approval'
              }
            >
              <Button
                variant="outlined"
                className={'small'}
                sx={{ backgroundColor: theme?.palette?.grey?.[400] }}
                startIcon={<AddCircleIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Request Approval
              </Button>
            </NoData>
          ) : (
            <Fragment>
              <Box textAlign={'end'}>
                <Button
                  variant="contained"
                  className={'small'}
                  onClick={() => setOpenDialog(true)}
                  startIcon={<AddCircleIcon />}
                >
                  Request Approval
                </Button>
              </Box>

              {approvalsList?.map((item: any) => (
                <Grid
                  container
                  key={item?._id}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mt={2}
                  p={2}
                  border={`1px solid ${theme?.palette?.grey?.[200]}`}
                  boxShadow={2}
                  borderRadius={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={8}
                    display={'flex'}
                    gap={2}
                    mb={{ xs: 2, md: 'unset' }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 28,
                        height: 28,
                      }}
                      variant={'circular'}
                      src={generateImage(
                        user?._id !== item?.approverId
                          ? item?.approverByImg
                          : item?.createdByImg,
                      )}
                    >
                      <Typography variant={'body2'} textTransform={'uppercase'}>
                        {fullNameInitial(
                          user?._id !== item?.approverId
                            ? item?.approverName
                            : item?.createdName,
                        )}
                      </Typography>
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {`${
                          user?._id !== item?.approverId
                            ? item?.approverName
                            : item?.createdName
                        }`}
                      </Typography>
                      <Typography
                        variant="body2"
                        display={'flex'}
                        alignItems={'center'}
                        gap={0.5}
                        my={1}
                        color={
                          theme?.['palette']?.[
                            `${approvalsStatusObj?.(
                              item?.approvalStatus,
                              item?.approverId,
                              user?._id,
                            )?.color}`
                          ]?.['main']
                        }
                      >
                        {
                          approvalsStatusObj?.(
                            item?.approvalStatus,
                            item?.approverId,
                            user?._id,
                          )?.message
                        }
                        {otherDateFormat(
                          item?.updatedAt,
                          DATE_TIME_FORMAT?.DMDMHA,
                        )}
                      </Typography>
                      <Typography variant="body2">{item?.reasons}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4} textAlign={'end'}>
                    {user?._id === item?.approverId &&
                      !approvalStatus?.includes(item?.approvalStatus) && (
                        <Fragment>
                          <ApproveForm approvalId={item?._id} />
                          <RejectForm approvalId={item?._id} />
                        </Fragment>
                      )}
                    {user?._id !== item?.approverId &&
                      !approvalStatus?.includes(item?.approvalStatus) && (
                        <Box
                          display={'flex'}
                          gap={2}
                          alignItems={'center'}
                          justifyContent={'flex-end'}
                          flexWrap={'wrap'}
                        >
                          <CancelRequest approvalId={item?._id} />
                          <LoadingButton
                            loading={
                              postPurchaseOrderApprovalRemindersStatus?.isLoading
                            }
                            disabled={
                              postPurchaseOrderApprovalRemindersStatus?.isLoading
                            }
                            variant="outlined"
                            startIcon={<NotificationsIcon />}
                            onClick={() =>
                              sendReminderForPurchaseOrderApproval?.()
                            }
                            className={'small'}
                          >
                            Send Reminder
                          </LoadingButton>
                        </Box>
                      )}
                  </Grid>
                </Grid>
              ))}
            </Fragment>
          )}
          <RequestApprovalForm
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
          {approvalsListMetaData && approvalsListMetaData?.total > 5 && (
            <CustomPagination
              currentPage={page}
              count={approvalsListMetaData?.pages}
              pageLimit={pageLimit}
              totalRecords={approvalsListMetaData?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          )}
        </Fragment>
      )}
    </>
  );
};
