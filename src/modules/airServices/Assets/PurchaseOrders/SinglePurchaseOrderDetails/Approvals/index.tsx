import NoData from '@/components/NoData';
import {
  APPROVALS_STATUS,
  approvalStatus,
  approvalsStatusObj,
} from './Approvals.data';
import { Box, Typography } from '@mui/material';
import { RequestApprovalForm } from './RequestApprovalForm';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ApproveForm } from './ApproveForm';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';
import { useApprovals } from './useApprovals';
import { DATE_TIME_FORMAT } from '@/constants';
import { CancelRequest } from './CancelRequest';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { otherDateFormat } from '@/lib/date-time';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { CUSTOM_BUTTON_TYPES } from '@/constants/mui-constant';

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
    setAction,
    isPortalOpen,
    setIsPortalOpen,
  } = useApprovals();

  return (
    <>
      {lazyGetApprovalRequestsStatus?.isFetching ? (
        <SkeletonTable />
      ) : (
        <>
          {!!!approvalsList?.length ? (
            <NoData
              message={
                'Make Approved Purchases by sending the order to your stakeholders for approval'
              }
            >
              <AddNewItemButton
                name="Request Approval"
                onClick={() => setOpenDialog(true)}
              />
            </NoData>
          ) : (
            <>
              <Box textAlign={'end'}>
                <AddNewItemButton
                  name="Request Approval"
                  onClick={() => setOpenDialog(true)}
                />
              </Box>
              {approvalsList?.map((item: any) => (
                <Box
                  key={item?._id}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mt={2}
                  p={2}
                  border={`1px solid ${theme?.palette?.grey?.[200]}`}
                  boxShadow={2}
                  borderRadius={2}
                >
                  <ContainerGrid spacing={0}>
                    <CustomGrid md={8}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          mb: { xs: 2, md: 'unset' },
                        }}
                      >
                        <CustomAvatar
                          avatarSrc={
                            user?._id !== item?.approverId
                              ? item?.approverByImg
                              : item?.createdByImg
                          }
                          nameInitial={fullNameInitial(
                            user?._id !== item?.approverId
                              ? item?.approverName?.trim()
                              : item?.createdName?.trim(),
                          )}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {fullName(
                              user?._id !== item?.approverId
                                ? item?.approverName?.trim()
                                : item?.createdName?.trim(),
                            )}
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
                          <Typography variant="body2">
                            {item?.reasons}
                          </Typography>
                        </Box>
                      </Box>
                    </CustomGrid>
                    <CustomGrid md={4}>
                      <Box sx={{ textAlign: 'end' }}>
                        {user?._id === item?.approverId &&
                          !approvalStatus?.includes(item?.approvalStatus) && (
                            <Box
                              display={'flex'}
                              gap={2}
                              alignItems={'center'}
                              justifyContent={'flex-end'}
                              flexWrap={'wrap'}
                            >
                              <CustomButton
                                color="success"
                                onClick={() =>
                                  setAction?.(
                                    APPROVALS_STATUS?.APPROVED,
                                    item?._id,
                                  )
                                }
                                iconType={CUSTOM_BUTTON_TYPES?.SUCCESS}
                              >
                                Approve
                              </CustomButton>
                              <CustomButton
                                color="error"
                                onClick={() =>
                                  setAction?.(
                                    APPROVALS_STATUS?.REJECTED,
                                    item?._id,
                                  )
                                }
                                iconType={CUSTOM_BUTTON_TYPES?.REJECT}
                              >
                                Reject
                              </CustomButton>
                            </Box>
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
                              <CustomLoadingButton
                                loading={
                                  postPurchaseOrderApprovalRemindersStatus?.isLoading
                                }
                                disabled={
                                  postPurchaseOrderApprovalRemindersStatus?.isLoading
                                }
                                variant="outlined"
                                startIcon={<NotificationsIcon />}
                                onClick={() =>
                                  sendReminderForPurchaseOrderApproval?.(
                                    item?._id,
                                  )
                                }
                              >
                                Send Reminder
                              </CustomLoadingButton>
                            </Box>
                          )}
                      </Box>
                    </CustomGrid>
                  </ContainerGrid>
                </Box>
              ))}
            </>
          )}
          <CustomPagination
            currentPage={page}
            count={approvalsListMetaData?.pages}
            pageLimit={pageLimit}
            totalRecords={approvalsListMetaData?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}
      {openDialog && (
        <RequestApprovalForm
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      {isPortalOpen?.isOpen && (
        <ApproveForm
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      )}
    </>
  );
};
