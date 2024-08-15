import { Avatar, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { Fragment } from 'react';
import { useTeamsDetails } from './useTeamsDetails';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { TeamPortalComponentPropsI } from '../Teams.interface';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

const TeamsDetails = (props: TeamPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    teamDataArray,
    data,
    isLoading,
    closeDrawer,
    isFetching,
    isError,
    refetch,
  } = useTeamsDetails(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isView as boolean}
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
          <ApiErrorState canRefresh refresh={() => refetch?.()} />
        ) : (
          <Box mt={1}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={2}
              gap={3}
              borderRadius={2}
              bgcolor={'custom.bluish_gray'}
            >
              <Typography color="slateBlue.main">
                Number of active Team Members
              </Typography>
              <Typography>{teamDataArray?.length}</Typography>
            </Box>
            <Box py={'1.5rem'}>
              <Typography variant="h6" color="slateBlue.main">
                Members detail
              </Typography>
              <br />
              <Box>
                {!!!teamDataArray?.length ? (
                  <Typography variant="h4" textAlign={'center'}>
                    No members found.
                  </Typography>
                ) : (
                  teamDataArray?.map((item: any, index: number) => (
                    <Fragment key={item?.user?._id}>
                      <Box
                        display="flex"
                        alignItems="center"
                        py={1}
                        gap={2}
                        borderBottom={
                          index !==
                          teamDataArray?.length - SELECTED_ARRAY_LENGTH?.ONE
                            ? '1px solid'
                            : ''
                        }
                        borderColor={'custom.off_white'}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'primary.light',
                            width: 35,
                            height: 35,
                          }}
                          src={generateImage(item?.user?.avatar?.url)}
                        >
                          <Typography
                            variant="body2"
                            textTransform={'uppercase'}
                            color="slateBlue.main"
                          >
                            {fullNameInitial(
                              item?.user?.firstName,
                              item?.user?.lastName,
                            )}
                          </Typography>
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body4"
                            component={'div'}
                            color="slateBlue.main"
                            fontWeight={600}
                          >
                            {fullName(
                              item?.user?.firstName,
                              item?.user?.lastName,
                            )}
                          </Typography>
                          <Typography
                            variant="body4"
                            component={'div'}
                            color="slateBlue.main"
                          >
                            {item?.user?.email}
                          </Typography>
                          <Typography
                            variant="body4"
                            component={'div'}
                            color="slateBlue.main"
                          >
                            {item?.user?.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Fragment>
                  ))
                )}{' '}
              </Box>
            </Box>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
};

export default TeamsDetails;
