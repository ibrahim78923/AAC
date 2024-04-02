import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { SharedPlusGrayIcon } from '@/assets/icons';
import { Fragment } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTeamsDetails } from './useTeamsDetails';
import { generateImage } from '@/utils/avatarUtils';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

function TeamsDetails(props: any) {
  const { isTeamDrawerOpen, setIsTeamDrawerOpen, okText, methods } = props;
  const {
    handleMenuClick,
    handleMenuClose,
    anchorEl,
    teamDataArray,
    data,
    isLoading,
  } = useTeamsDetails(props);
  return (
    <>
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
                    sx={{ background: '#BCC1CE' }}
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
                      <IconButton>
                        <SharedPlusGrayIcon />
                      </IconButton>
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
                        teamDataArray?.map((item: any, index: any) => (
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
                                  {item?.user?.firstName} {item?.user?.lastName}
                                </Typography>
                                <Typography variant="body4" display={'block'}>
                                  {item?.user?.email}
                                </Typography>
                                <Typography variant="body4" display={'block'}>
                                  {item?.user?.address}
                                </Typography>
                              </Box>
                              <Box display={'flex'}>
                                <IconButton onClick={handleMenuClick}>
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleMenuClose}
                                >
                                  <MenuItem onClick={handleMenuClose}>
                                    Detail
                                  </MenuItem>
                                  <MenuItem onClick={handleMenuClose}>
                                    Delete
                                  </MenuItem>
                                </Menu>
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
            </FormProvider>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
}

export default TeamsDetails;
