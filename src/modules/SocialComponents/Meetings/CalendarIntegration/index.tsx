import { Box, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AntSwitch } from '@/components/AntSwitch';
import {
  calendarAccounts,
  calendarServices,
  calenderType,
} from './CalendarIntegration.data';
import { useCalendarIntegration } from './useCalendarIntegration';
import { LoadingButton } from '@mui/lab';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { Fragment } from 'react';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const CalendarIntegration = () => {
  const {
    handleGoogleClick,
    handleOfficeClick,
    handleDelete,
    switchLoading,
    handleChangeStatus,
    calendarListData,
    isLoading,
    isFetching,
    changeStatusProgress,
    deleteProgress,
  } = useCalendarIntegration();
  return (
    <>
      <Box mb={1}>
        <Typography variant="formTopHeading" color="secondary.main">
          Connect Video Calendar To Air Applecart
        </Typography>
      </Box>
      <Typography variant="body3" color="custom.main">
        Take advantage of the integration between Air Applecart and Video
        conferencing tool to boost your productivity right away.
      </Typography>
      <>
        <ContainerGrid spacing={3}>
          {calendarServices?.map((service) => (
            <CustomGrid md={6} key={service?.id}>
              <Box
                border="1px solid"
                borderColor="grey.700"
                borderRadius={2}
                marginTop="2rem"
                height="100%"
                display={'flex'}
                flexDirection={'column'}
                p={2}
              >
                <Box flex={1}>
                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      {service?.icon && <service.icon />}
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        color="slateBlue.main"
                        fontWeight={500}
                      >
                        {service?.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="body3"
                    color="custom.main"
                  >
                    {service?.description}
                  </Typography>
                </Box>
                <Box>
                  <LoadingButton
                    sx={{ mb: 1 }}
                    fullWidth
                    variant="contained"
                    onClick={
                      service?.name === calenderType?.google
                        ? handleGoogleClick
                        : handleOfficeClick
                    }
                  >
                    Connect Now
                  </LoadingButton>
                </Box>
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
              My Calendar Account
            </Typography>
          </Box>
          <ApiRequestFlow
            showSkeleton={isLoading || isFetching}
            hasNoData={!calendarListData?.length}
            noDataMessage={'No data is available'}
            noDataHeight={'100%'}
          >
            <Box mt={2}>
              {calendarListData?.map((account) => (
                <Fragment key={account?._id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={1}
                    borderBottom="1px solid"
                    borderColor="grey.700"
                    mt={2}
                    flexWrap="wrap"
                  >
                    <Box>
                      {calendarAccounts(account)?.map((item) => (
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
                        checked={account?.isDefault}
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
