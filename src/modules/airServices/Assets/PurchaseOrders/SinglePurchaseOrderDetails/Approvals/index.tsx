import NoData from '@/components/NoData';
import {
  approvalStatus,
  approvalsStatusObj,
  stringAvatar,
} from './Approvals.data';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';
import { RequestApprovalForm } from './RequestApprovalForm';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { ApproveForm } from './ApproveForm';
import { RejectForm } from './RejectForm';
import { enqueueSnackbar } from 'notistack';
import { NoAssociationFoundImage } from '@/assets/images';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';
import { LoadingButton } from '@mui/lab';
import { useApprovals } from './useApprovals';
import { Fragment } from 'react';
import { DATE_TIME_FORMAT } from '@/constants';

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
    onCancel,
    patchRequestApprovalStatus,
    user,
  } = useApprovals();
  return (
    <>
      {lazyGetApprovalRequestsStatus?.isLoading ? (
        <SkeletonTable />
      ) : (
        <Fragment>
          {approvalsList?.length <= 0 ? (
            <NoData
              image={NoAssociationFoundImage}
              message={
                'Make Approved Purchases by sending the order to your stakeholders for approval'
              }
            >
              <Button
                variant="outlined"
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
                      alt={`${item?.firstName} ${item?.lastName}`}
                      sx={{ color: theme?.palette?.grey[600], fontWeight: 500 }}
                      src={item?.attachments}
                      {...stringAvatar(`${item?.firstName} ${item?.lastName}`)}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {`${item?.firstName} ${item?.lastName}`}
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
                        {dayjs(item?.updatedAt).format(
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
                        <Fragment>
                          <LoadingButton
                            variant="outlined"
                            sx={{ mx: 2 }}
                            color="secondary"
                            loading={patchRequestApprovalStatus?.isLoading}
                            onClick={() => onCancel(item?._id)}
                          >
                            Cancel
                          </LoadingButton>
                          <Button
                            variant="outlined"
                            startIcon={<NotificationsIcon />}
                            onClick={() =>
                              enqueueSnackbar('Reminder Sent!', {
                                variant: 'success',
                              })
                            }
                          >
                            Send Reminder
                          </Button>
                        </Fragment>
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
