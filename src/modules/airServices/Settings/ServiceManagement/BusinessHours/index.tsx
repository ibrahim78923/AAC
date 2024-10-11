import { Box, Grid, Skeleton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ClockWithBagIcon } from '@/assets/icons';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useBusinessHour } from './useBusinessHour';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreHoriz } from '@mui/icons-material';
import { getBusinessHoursOptions } from './BusinessHours.data';
import ApiErrorState from '@/components/ApiErrorState';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const BusinessHours = () => {
  const {
    router,
    businessHoursList,
    isLoading,
    setOpenModal,
    openModal,
    isFetching,
    isError,
    refetch,
    deleteBusinessHour,
    deleteBusinessHourStatus,
  } = useBusinessHour();

  return (
    <>
      <PageTitledHeader
        title="Business Hours"
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT)}
      />

      <br />

      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          href={AIR_SERVICES?.UPSERT_BUSINESS_HOUR}
          component={Link}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_BUSINESS_HOURS,
            ]}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              height="12rem"
              border="0.06rem solid"
              borderColor="primary.main"
              borderRadius={2}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="2.1rem"
                height="2.1rem"
                border="0.13rem solid"
                borderColor="primary.main"
                borderRadius="50%"
              >
                <AddRoundedIcon
                  sx={{
                    color: 'primary.main',
                  }}
                />
              </Box>
              <Typography variant="subtitle2" color="blue.dark">
                Create New Template
              </Typography>
            </Box>
          </PermissionsGuard>
        </Grid>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_BUSINESS_HOURS,
          ]}
        >
          {isError ? (
            <Grid item xs={12}>
              <ApiErrorState canRefresh refresh={() => refetch?.()} />
            </Grid>
          ) : isLoading || isFetching ? (
            [1, 2, 3, 4, 5]?.map((item: number) => (
              <Grid item lg={4} sm={6} xs={12} key={item}>
                <Skeleton height="12rem" variant="rectangular" />
              </Grid>
            ))
          ) : (
            businessHoursList?.map((businessHour: any) => (
              <Grid item lg={3} sm={6} xs={12} key={businessHour?._id}>
                <Box
                  height={'12rem'}
                  border={'0.06rem solid'}
                  borderColor={'primary.main'}
                  borderRadius={'.5rem'}
                  overflow={'hidden'}
                >
                  <Box display="flex" justifyContent="end">
                    <SingleDropdownButton
                      dropdownOptions={getBusinessHoursOptions(
                        setOpenModal,
                        businessHour,
                        router,
                      )}
                      dropdownName={
                        <MoreHoriz
                          sx={{ color: 'secondary.lighter' }}
                          fontSize="medium"
                        />
                      }
                      hasEndIcon={false}
                      btnVariant="text"
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    overflow="hidden"
                    p={1}
                  >
                    <ClockWithBagIcon />
                    <Typography
                      fontWeight={600}
                      color="blue.dark"
                      mt="0.7rem"
                      textAlign={'center'}
                      textTransform={'capitalize'}
                      sx={{
                        textOverflow: 'break-all',
                        wordBreak: 'break-all',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {businessHour?.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          )}
        </PermissionsGuard>
      </Grid>

      {openModal?.delete && (
        <AlertModals
          message={'Are you sure you want to delete this Business Hour?'}
          type={ALERT_MODALS_TYPE?.DELETE}
          open={openModal?.delete as boolean}
          loading={deleteBusinessHourStatus?.isLoading}
          disableCancelBtn={deleteBusinessHourStatus?.isLoading}
          handleClose={() => setOpenModal({ delete: false, id: null })}
          handleSubmitBtn={deleteBusinessHour}
        />
      )}
    </>
  );
};
