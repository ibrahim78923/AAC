import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Box } from '@mui/material';
import ActionButton from '../ActionButton';
import { AIR_SERVICES } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { AvatarInfoCard } from '@/components/Cards/AvatarInfoCard';
import { AVATAR_VARIANTS, SKELETON_TYPES } from '@/constants/mui-constant';
import { useServicesList } from './useServicesList';
import { ListGrid } from '@/components/Grids/ListGrid';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const ServicesList = () => {
  const {
    services,
    selectedCheckboxes,
    setSelectedCheckboxes,
    showLoader,
    hasError,
    getServicesList,
    router,
  } = useServicesList();

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_DETAILS_OF_CATALOG_SERVICE,
      ]}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        refreshApi={getServicesList}
        hasNoData={!services?.length}
        noDataMessage="No service found"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.MEDIUM_HORIZONTAL_TWO_LAYER_ROUNDED_CARD
        }
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
        >
          <CheckboxField
            checked={
              selectedCheckboxes?.length !== SELECTED_ARRAY_LENGTH?.ZERO &&
              services?.length === selectedCheckboxes?.length
            }
            onChange={(e: any) => {
              e?.target?.checked
                ? setSelectedCheckboxes(services?.map((result: any) => result))
                : setSelectedCheckboxes([]);
            }}
            name={'_id'}
            label="Select All"
          />

          <Box textAlign={'end'}>
            {selectedCheckboxes && (
              <ActionButton
                selectedCheckboxes={selectedCheckboxes}
                setSelectedCheckboxes={setSelectedCheckboxes}
                isDisabled={!selectedCheckboxes?.length}
              />
            )}
          </Box>
        </Box>
        <br />
        <ListGrid
          list={services}
          render={(service: any) => (
            <AvatarInfoCard
              avatarSize={{ variant: AVATAR_VARIANTS?.ROUNDED }}
              hasCheckbox
              descriptionType="Category Name : "
              infoType="Cost : "
              subInfoType="Status : "
              captionType=" Estimated Delivery :"
              name={service?.itemName}
              description={service?.categoryDetails?.categoryName}
              caption={service?.estimatedDelivery?.toLowerCase()}
              subInfo={service?.status?.toLowerCase()}
              info={service?.cost}
              avatarSrc={service?.attachmentDetails?.fileUrl}
              onClick={(e: any) => {
                e?.stopPropagation();
                router?.push({
                  pathname: AIR_SERVICES?.UPSERT_SERVICE,
                  query: {
                    serviceId: service?._id,
                    categoryId: service?.serviceCategory,
                  },
                });
              }}
              checked={
                !!selectedCheckboxes?.find(
                  (item: any) => item?._id === service?._id,
                )
              }
              onCheckboxChange={(e: any) => {
                e?.stopPropagation();
                e?.target?.checked
                  ? setSelectedCheckboxes([...selectedCheckboxes, service])
                  : setSelectedCheckboxes(
                      selectedCheckboxes?.filter(
                        (item: any) => item?._id !== service?._id,
                      ),
                    );
              }}
            />
          )}
          md={6}
          lg={4}
        />
      </ApiRequestFlow>
    </PermissionsGuard>
  );
};
