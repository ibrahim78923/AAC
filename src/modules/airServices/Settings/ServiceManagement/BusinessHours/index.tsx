import { Box, Typography } from '@mui/material';
import { ClockWithBagIcon } from '@/assets/icons';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants/routes';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useBusinessHour } from './useBusinessHour';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { MoreHoriz } from '@mui/icons-material';
import { getBusinessHoursOptions } from './BusinessHours.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { AddNewCard } from '@/components/Cards/AddNewCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

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
      <ContainerGrid spacing={3}>
        <CustomGrid lg={3} sm={6}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_BUSINESS_HOURS,
            ]}
          >
            <Link href={AIR_SERVICES?.UPSERT_BUSINESS_HOUR}>
              <AddNewCard
                title="Create New Template"
                iconBackgroundColor=""
                iconColor="primary.main"
                iconBorderColor="primary.main"
                flexDirection="row"
                cardBorderColor="primary.main"
                iconPadding={0}
              />
            </Link>
          </PermissionsGuard>
        </CustomGrid>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_BUSINESS_HOURS,
          ]}
        >
          <ApiRequestFlow
            showSkeleton={isLoading || isFetching}
            hasError={isError}
            refreshApi={refetch}
            skeletonType={SKELETON_TYPES?.BASIC_CARD}
            cardSkeletonType={
              SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD
            }
          >
            {businessHoursList?.map((businessHour: any) => (
              <CustomGrid lg={3} sm={6} key={businessHour?._id}>
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
              </CustomGrid>
            ))}
          </ApiRequestFlow>
        </PermissionsGuard>
      </ContainerGrid>

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
