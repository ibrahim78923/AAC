import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { ViewEyeIcon } from '@/assets/icons';
import { Fragment } from 'react';
import { useTeamsDetails } from './useTeamsDetails';
import { generateImage } from '@/utils/avatarUtils';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

function TeamsDetails(props: any) {
  const {
    teamDataArray,
    data,
    isLoading,
    theme,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    okText,
    methods,
  } = useTeamsDetails(props);
  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setIsTeamDrawerOpen(true)}>
        <ViewEyeIcon />
      </Box>
      <CommonDrawer
        isDrawerOpen={isTeamDrawerOpen}
        onClose={() => {
          setIsTeamDrawerOpen(false);
        }}
        title={data?.data?.name}
        submitHandler={() => {
          setIsTeamDrawerOpen(false);
        }}
        footer={true}
        isOk={true}
        okText={okText}
      >
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Box mt={1}>
            <FormProvider methods={methods}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box
                    py={'1.5rem'}
                    borderRadius={'0.625rem'}
                    sx={{ background: theme?.palette?.custom?.bluish_gray }}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Typography px={2}>
                        Number of active Team Members
                      </Typography>
                      <Typography sx={{ marginRight: 3 }}>
                        {teamDataArray?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <Box py={'1.5rem'}>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      py={2}
                    >
                      <Typography px={1} variant="h6">
                        Members detail
                      </Typography>
                    </Box>
                    <Box>
                      {teamDataArray?.length === 0 ? (
                        <Box
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <Typography variant="h4">
                            No members found.
                          </Typography>
                        </Box>
                      ) : (
                        teamDataArray?.map(
                          ({ user: item }: any, index: any) => (
                            <Fragment key={item?.id}>
                              <Box display="flex" alignItems="center" mb={2}>
                                <Avatar
                                  src={
                                    item?.avatarSrc
                                      ? generateImage(item?.avatarSrc)
                                      : ''
                                  }
                                  alt={`Avatar ${item?.id}`}
                                  sx={{ height: '2.5rem' }}
                                />
                                <Box ml={2} flexGrow={1}>
                                  <Typography variant="body4" display={'block'}>
                                    {item?.firstName} {item?.lastName}
                                  </Typography>
                                  <Typography variant="body4" display={'block'}>
                                    {item?.email}
                                  </Typography>
                                  <Typography variant="body4" display={'block'}>
                                    {item?.address?.composite}
                                  </Typography>
                                </Box>
                              </Box>
                              {index !== teamDataArray?.length - 1 && (
                                <Divider
                                  variant="fullWidth"
                                  sx={{ mt: 2, mb: 2 }}
                                />
                              )}
                            </Fragment>
                          ),
                        )
                      )}{' '}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
}

export default TeamsDetails;
