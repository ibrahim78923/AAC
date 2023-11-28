import { Box, Card, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { agentRequestData } from './AgentRequest.data';
import { styles } from './AgentRequest.style';
import Image from 'next/image';
import RejectedModal from './RejectedModal';
import { useAgentRequest } from './useAgentRequest';
import { AGENT_REQUEST_STATUS } from '@/constants/strings';

const AgentRequest = () => {
  const {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
  } = useAgentRequest();
  return (
    <>
      <Grid container spacing={2}>
        {agentRequestData?.map((item: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={uuidv4()}>
              <Card sx={styles?.cardStyling}>
                <Box
                  border={`2px solid ${theme?.palette?.secondary?.main}`}
                  borderRadius={'50%'}
                  p={'0.05rem'}
                >
                  <Image
                    src={item?.image}
                    alt="Profile"
                    style={styles?.imageStyle}
                  />
                </Box>
                <Typography variant="h4" py={0.5} fontWeight={700}>
                  {item?.name}
                </Typography>
                <Typography variant="body2">{item?.role}</Typography>
                <Typography variant="subtitle2">{item?.date}</Typography>
                {item?.status === AGENT_REQUEST_STATUS?.PENDING ? (
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
                      onClick={handlerStatusApprove}
                    >
                      {item?.approve}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={theme?.palette?.error?.main}
                      sx={{ cursor: 'pointer' }}
                      onClick={handleOpenModal}
                    >
                      {item?.reject}
                    </Typography>
                  </Box>
                ) : (
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
                    <Typography variant="body2">{item?.requestedOn}</Typography>
                  </Box>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <RejectedModal
        openRejectedModal={openRejectedModal}
        setOpenRejectedModal={setOpenRejectedModal}
      />
    </>
  );
};

export default AgentRequest;
