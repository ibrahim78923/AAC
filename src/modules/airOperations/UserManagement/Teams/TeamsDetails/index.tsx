import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { Fragment } from 'react';
import { useTeamsDetails } from './useTeamsDetails';
import { fullName, generateImage } from '@/utils/avatarUtils';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

const TeamsDetails = (props: any) => {
  const { isPortalOpen } = props;
  const { teamDataArray, data, isLoading, closeDrawer, isFetching, isError } =
    useTeamsDetails(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isView}
        onClose={() => closeDrawer?.()}
        title={data?.data?.name}
        submitHandler={() => closeDrawer?.()}
        footer
        isOk
        okText={'OK'}
      >
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  py={'1.5rem'}
                  borderRadius={'0.625rem'}
                  sx={{ background: 'custom.bluish_gray' }}
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
                    {!!!teamDataArray?.length ? (
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Typography variant="h4">No members found.</Typography>
                      </Box>
                    ) : (
                      teamDataArray?.map(({ user: item }: any, index: any) => (
                        <Fragment key={item?.id}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                              src={generateImage(item?.avatarSrc)}
                              alt={`Avatar ${item?.id}`}
                              sx={{ height: '2.5rem' }}
                            />
                            <Box ml={2} flexGrow={1}>
                              <Typography variant="body4" display={'block'}>
                                {fullName(item?.firstName, item?.lastName)}
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
                      ))
                    )}{' '}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
};

export default TeamsDetails;
