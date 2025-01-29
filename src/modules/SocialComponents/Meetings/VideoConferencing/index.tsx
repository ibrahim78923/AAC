import { Box, IconButton, Typography } from '@mui/material';
import {
  meetingsAccounts,
  videoConferencingData,
} from './VideoConferencing.data';
import { useVideoConferencing } from './useVideoConferencing';
import { LoadingButton } from '@mui/lab';
import { AntSwitch } from '@/components/AntSwitch';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { Fragment } from 'react';

export const VideoConferencing = () => {
  const {
    handleGoogleMeetClick,
    handleMsTeamsClick,
    meetingsListData,
    switchLoading,
    handleChangeStatus,
    handleDelete,
    isLoading,
    isFetching,
    handleZoomClick,
    changeStatusProgress,
    deleteProgress,
  } = useVideoConferencing();

  const meetings = {
    MS_TEAM: 'MS Teams',
    GOOGLE_MEET: 'Google Meet',
    ZOOM: 'Zoom',
  };

  return (
    <>
      <Box mb={1}>
        <Typography variant="formTopHeading" color="secondary.main">
          Connect Video Conferencing Tool to Air Applecart
        </Typography>
      </Box>
      <Typography variant="body3" color="custom.main">
        Take advantage of the integration between Air Applecart and Video
        conferencing tool to boost your productivity right away.
      </Typography>
      <Box mt={1}>
        <Typography variant="body3" color="custom.main">
          Select Video conferencing tool
        </Typography>
      </Box>
      <>
        <ContainerGrid spacing={3}>
          {videoConferencingData?.map((item: any) => (
            <CustomGrid key={item?.id} md={6}>
              <Box
                border="1px solid"
                borderColor="grey.700"
                borderRadius={2}
                marginTop="2rem"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                p={2}
              >
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {item?.icon && <item.icon />}
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color="slateBlue.main"
                      fontWeight={500}
                    >
                      {item?.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body3"
                  color="custom.main"
                  sx={{ flex: 1 }}
                >
                  {item?.description}
                </Typography>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  onClick={
                    item?.name === meetings?.MS_TEAM
                      ? handleMsTeamsClick
                      : item?.name === meetings?.GOOGLE_MEET
                        ? handleGoogleMeetClick
                        : handleZoomClick
                  }
                >
                  Connect Now
                </LoadingButton>
              </Box>
            </CustomGrid>
          ))}
        </ContainerGrid>
        <br />
        <Box
          border="1px solid"
          borderColor="grey.700"
          borderRadius={2}
          marginTop="2rem"
          p={2}
        >
          <Box>
            <Typography variant="formTopHeading" color="secondary.main">
              My Meetings Account
            </Typography>
          </Box>
          <ApiRequestFlow
            showSkeleton={isLoading || isFetching}
            skeletonType={SKELETON_TYPES?.BARS}
            hasNoData={!meetingsListData?.length}
            noDataMessage="No meetings account found"
            noDataHeight="100%"
            length={3}
          >
            <Box mt={2}>
              {meetingsListData?.map((account) => (
                <Fragment key={account?._id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={1}
                    borderBottom="1px solid"
                    borderColor="grey.700"
                    flexWrap="wrap"
                    my={2}
                  >
                    <Box>
                      {meetingsAccounts(account)?.map((item: any) => (
                        <Box
                          display={'flex'}
                          key={`${account?._id}-${item?.id}`}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            mr={1}
                            mb={-1}
                            sx={{ scale: '1.2' }}
                          >
                            {item?.icon && <item.icon />}
                          </Box>
                          <Typography
                            variant="formTopHeading"
                            color="slateBlue.main"
                            fontWeight={500}
                          >
                            {item?.name}
                          </Typography>
                        </Box>
                      ))}
                      <Box ml={4.2} mt={-0.5}>
                        <Typography
                          variant="body3"
                          color="custom.main"
                          sx={{ wordBreak: 'break-word' }}
                        >
                          {account?.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} gap={1}>
                      <AntSwitch
                        checked={account?.isDefault === true}
                        isLoading={switchLoading?.[account?._id]}
                        onClick={() => handleChangeStatus(account?._id)}
                        disabled={
                          changeStatusProgress?.isLoading ||
                          deleteProgress?.isLoading
                        }
                      />
                      <Box sx={{ scale: '1.3' }}>
                        <IconButton
                          onClick={() => handleDelete(account?._id)}
                          disabled={
                            changeStatusProgress?.isLoading ||
                            deleteProgress?.isLoading
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Fragment>
              ))}
            </Box>
          </ApiRequestFlow>
        </Box>
      </>
    </>
  );
};
