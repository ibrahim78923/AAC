import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { useServicesList } from './useServicesList';
import { Grid } from '@mui/material';
import { AvatarInfoCard } from '@/components/Cards/AvatarInfoCard';

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
      <Grid container spacing={1}>
        {services?.map((service: any) => (
          <Grid item xs={12} md={6} lg={4} key={service?._id}>
            <AvatarInfoCard
              name={service?.itemName}
              description={service?.description}
              info={service?.cost}
              avatarSrc={service?.attachmentDetails?.fileUrl}
              onClick={() =>
                handleClickService?.(service?._id, service?.serviceCategory)
              }
            />
          </Grid>
        ))}
      </Grid>
    </ApiRequestFlow>
  );
};
