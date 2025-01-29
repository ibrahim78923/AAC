import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { useServicesList } from './useServicesList';
import { AvatarInfoCard } from '@/components/Cards/AvatarInfoCard';
import { ListGrid } from '@/components/Grids/ListGrid';

export const ServicesList = () => {
  const { handleClickService, isError, refetch, showLoader, services } =
    useServicesList();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={isError}
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      hasNoData={!services?.length}
      refreshApi={refetch}
      noDataMessage={'No service found'}
      errorHeight={'20vh'}
    >
      <ListGrid
        lg={4}
        list={services}
        render={(service: any) => (
          <AvatarInfoCard
            name={service?.itemName}
            description={service?.description}
            info={service?.cost}
            infoType="Cost : "
            avatarSrc={service?.attachmentDetails?.fileUrl}
            onClick={() =>
              handleClickService?.(service?._id, service?.serviceCategory)
            }
          />
        )}
      />
    </ApiRequestFlow>
  );
};
