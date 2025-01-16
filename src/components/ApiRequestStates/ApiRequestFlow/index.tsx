import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
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
    children,
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
      <ApiErrorState canRefresh refresh={refreshApi} height={errorHeight} />
    );

  if (hasNoData)
    return <NoData message={noDataMessage} height={noDataHeight} />;

  return <>{children}</>;
};
