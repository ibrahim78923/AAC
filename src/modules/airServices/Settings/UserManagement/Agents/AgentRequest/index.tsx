import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import { styles } from './AgentRequest.style';
import RejectedModal from './RejectedModal';
import { useAgentRequest } from './useAgentRequest';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { fullNameInitial, generateImage } from '@/utils/avatarUtils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const AgentRequest = () => {
  const {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
    requesterData,
  } = useAgentRequest();
  return (
    <>
      <Grid container spacing={2}>
        {requesterData?.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item?._id}>
            <Card sx={styles?.cardStyling}>
              <Avatar
                sx={{
                  bgcolor: theme?.palette?.blue?.main,
                  width: 80,
                  height: 80,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
                src={generateImage(item?.userDetails?.avatar?.url)}
              >
                <Typography variant="body2" textTransform={'uppercase'}>
                  {fullNameInitial(
                    item?.userDetails?.firstName,
                    item?.userDetails?.lastName,
                  )}
                </Typography>
              </Avatar>
              <Typography variant="h4" py={0.5} fontWeight={700}>
                {`${item?.userDetails?.firstName} ${item?.userDetails?.lastName}`}
              </Typography>
              <Typography variant="body2">{item?.role}</Typography>
              <Typography variant="subtitle2">{item?.date}</Typography>
              {item?.status === AGENT_REQUEST_STATUS?.APPROVED ||
              item?.status === AGENT_REQUEST_STATUS?.REJECTED ? (
                <Box py={2} textAlign={'center'}>
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
                    {dayjs(item?.userDetails?.createdAt)?.format(
                      DATE_FORMAT?.UI,
                    )}
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
                    width={'90%'}
                    py={2}
                    mt={2}
                  >
                    <Typography
                      variant="body2"
                      color={theme?.palette?.success?.main}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handlerStatusApprove(item?._id)}
                    >
                      Approve
                    </Typography>
                    <Typography
                      variant="body2"
                      color={theme?.palette?.error?.main}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleOpenModal(item?._id)}
                    >
                      Reject
                    </Typography>
                  </Box>
                </PermissionsGuard>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <RejectedModal
        requesterData={requesterData}
        openRejectedModal={openRejectedModal}
        setOpenRejectedModal={setOpenRejectedModal}
      />
    </>
  );
};

export default AgentRequest;
