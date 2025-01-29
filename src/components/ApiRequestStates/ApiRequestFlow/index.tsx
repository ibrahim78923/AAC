import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { GridSkeleton } from '@/components/Skeletons/GridSkeleton';
import { ItemSkeleton } from '@/components/Skeletons/ItemSkeleton';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';
import { SKELETON_TYPES } from '@/constants/mui-constant';

const skeletonTypes: any = {
  [SKELETON_TYPES?.FORM]: SkeletonForm,
  [SKELETON_TYPES?.BARS]: SkeletonTable,
  [SKELETON_TYPES?.BASIC_CARD]: SkeletonCard,
  [SKELETON_TYPES?.TABLE]: SkeletonTanStackTable,
  [SKELETON_TYPES?.GRID]: GridSkeleton,
  [SKELETON_TYPES?.ITEM]: ItemSkeleton,
};

export const ApiRequestFlow = (props: any) => {
  const {
    showSkeleton = false,
    skeletonType = SKELETON_TYPES?.FORM,
    cardSkeletonType = SKELETON_TYPES?.BASIC_CARD,
    length = 4,
    hasError = false,
    refreshApi,
    errorHeight = '50vh',
    hasNoData = false,
    noDataMessage,
    noDataHeight = errorHeight,
    refreshButtonProps,
    children,
    errorChildren,
    noDataChildren,
    errorMessage,
    canRefresh = true,
  } = props;

  const SkeletonComponent = skeletonTypes?.[skeletonType];

  if (showSkeleton)
    return (
      <SkeletonComponent
        length={length}
        {...(skeletonType === SKELETON_TYPES?.BASIC_CARD
          ? { cardType: cardSkeletonType }
          : {})}
      />
    );

  if (hasError)
    return (
      <ApiErrorState
        message={errorMessage}
        canRefresh={canRefresh}
        refresh={refreshApi}
        height={errorHeight}
        refreshButtonProps={refreshButtonProps}
      >
        {errorChildren}
      </ApiErrorState>
    );

  if (hasNoData)
    return (
      <NoData message={noDataMessage} height={noDataHeight}>
        {noDataChildren}
      </NoData>
    );

  return <>{children}</>;
};
