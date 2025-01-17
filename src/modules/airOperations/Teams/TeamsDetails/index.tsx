import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { Fragment } from 'react';
import { useTeamsDetails } from './useTeamsDetails';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const TeamsDetails = () => {
  const {
    teamDataArray,
    data,
    isLoading,
    closeDrawer,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
  } = useTeamsDetails();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={closeDrawer}
      title={<TruncateText text={data?.data?.name?.toLowerCase()} />}
      submitHandler={closeDrawer}
      footer
      isOk
      okText={'OK'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
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
                  <UserInfo
                    name={fullName(item?.user?.firstName, item?.user?.lastName)}
                    nameInitial={fullNameInitial(
                      item?.user?.firstName,
                      item?.user?.lastName,
                    )}
                    avatarSrc={item?.user?.avatar?.url}
                    email={item?.user?.email}
                    optionDetail={
                      item?.user?.address?.composite
                        ? item?.user?.address?.composite
                        : item?.user?.address
                    }
                    avatarSize={{ width: 35, height: 35 }}
                    emailProps={{ fontWeight: 'fontWeightMedium' }}
                    boxProps={{
                      gap: 2,
                      borderBottom:
                        index !==
                        teamDataArray?.length - SELECTED_ARRAY_LENGTH?.ONE
                          ? '1px solid'
                          : '',
                      borderColor: 'custom.off_white',
                      py: 1,
                    }}
                  />
                </Fragment>
              ))
            )}
          </Box>
        </Box>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

export default TeamsDetails;
