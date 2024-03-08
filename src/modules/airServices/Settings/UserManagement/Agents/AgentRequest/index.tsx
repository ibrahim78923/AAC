import { Box, Card, Grid, Typography } from '@mui/material';
import { styles } from './AgentRequest.style';
import Image from 'next/image';
import RejectedModal from './RejectedModal';
import { useAgentRequest } from './useAgentRequest';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';
import { UserRequesterImage } from '@/assets/images';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

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
              <Box
                border={`2px solid ${theme?.palette?.secondary?.main}`}
                borderRadius={'50%'}
                p={'0.05rem'}
              >
                {item?.userDetails?.avatar?.url ? (
                  <Image
                    src={item?.userDetails?.avatar?.url}
                    alt="Profile"
                    style={styles?.imageStyle}
                  />
                ) : (
                  <Image
                    src={UserRequesterImage}
                    alt="Profile"
                    style={styles?.imageStyle}
                  />
                )}
              </Box>
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
                    {item?.userDetails?.createdAt}
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
