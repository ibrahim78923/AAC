import { Avatar, Box, Grid, Typography } from '@mui/material';
import RejectedModal from './RejectedModal';
import { useAgentRequest } from './useAgentRequest';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { LoadingButton } from '@mui/lab';
import NoData from '@/components/NoData';
import { TruncateText } from '@/components/TruncateText';

const AgentRequest = () => {
  const {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
    isLoading,
    isFetching,
    isError,
    data,
    patchApprovedRequestStatus,
    selectedAgentRequest,
    setSelectedAgentRequest,
  } = useAgentRequest();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;
  if (!data?.data?.length) return <NoData />;

  return (
    <>
      <Grid container spacing={2}>
        {data?.data?.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item?._id}>
            <Box
              textAlign={'center'}
              display={'flex'}
              flexDirection={'column'}
              border={'1px solid'}
              borderColor={'custom.off_white'}
              borderRadius={3}
              p={1}
              height={'100%'}
            >
              <Avatar
                sx={{
                  bgcolor: theme?.palette?.blue?.main,
                  width: 80,
                  height: 80,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  margin: 'auto',
                }}
                src={generateImage(item?.userDetails?.avatar?.url)}
              >
                <Typography textTransform={'uppercase'}>
                  {fullNameInitial(
                    item?.userDetails?.firstName,
                    item?.userDetails?.lastName,
                  )}
                </Typography>
              </Avatar>
              <Typography variant="h4" py={0.5} fontWeight={700}>
                {
                  <TruncateText
                    text={fullName(
                      item?.userDetails?.firstName?.toLowerCase(),
                      item?.userDetails?.lastName?.toLowerCase(),
                    )}
                  />
                }
              </Typography>
              <Typography variant="body2" color="slateBlue.main">
                {
                  <TruncateText
                    text={item?.userDetails?.jobTitle?.toLowerCase()}
                  />
                }
              </Typography>
              <Typography variant="subtitle2" mb={1} color="slateBlue.main">
                {dayjs(item?.userDetails?.createdAt)?.format(DATE_FORMAT?.UI)}
              </Typography>
              {item?.status === AGENT_REQUEST_STATUS?.APPROVED ||
              item?.status === AGENT_REQUEST_STATUS?.REJECTED ? (
                <Box alignItems={'self-end'}>
                  <Typography
                    variant="body2"
                    color={
                      item?.status === AGENT_REQUEST_STATUS?.APPROVED
                        ? theme?.palette?.success?.main
                        : theme?.palette?.error?.main
                    }
                  >
                    {item?.status}
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(item?.updatedAt)?.format(DATE_FORMAT?.UI)}
                  </Typography>
                </Box>
              ) : (
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.APPROVE_REJECT_AGENT_REQUEST,
                  ]}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    flexGrow={1}
                    alignItems={'self-end'}
                  >
                    <LoadingButton
                      onClick={() => handlerStatusApprove(item?._id)}
                      color={'success'}
                      disabled={patchApprovedRequestStatus?.isLoading}
                      loading={patchApprovedRequestStatus?.isLoading}
                      className="small"
                    >
                      Approve
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => handleOpenModal(item?._id)}
                      color={'error'}
                      disabled={patchApprovedRequestStatus?.isLoading}
                      className="small"
                    >
                      Reject
                    </LoadingButton>
                  </Box>
                </PermissionsGuard>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      {openRejectedModal && (
        <RejectedModal
          openRejectedModal={openRejectedModal}
          setOpenRejectedModal={setOpenRejectedModal}
          selectedAgentRequest={selectedAgentRequest}
          setSelectedAgentRequest={setSelectedAgentRequest}
        />
      )}
    </>
  );
};

export default AgentRequest;
