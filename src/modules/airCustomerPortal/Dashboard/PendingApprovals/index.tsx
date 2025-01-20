import { CardLayout } from '../CardLayout';
import { usePendingApprovals } from './usePendingApprovals';
import { ApprovalCard } from '../../Catalog/Approvals/ApprovalCard';
import { Fragment } from 'react';
import { ApprovalsDataI } from '../../Catalog/Approvals/AllApprovals/AllApprovals.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const PendingApprovals = () => {
  const { data, isLoading, isFetching, isError, router, refetch, companyId } =
    usePendingApprovals();

  return (
    <CardLayout
      title={'Pending for Approval'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.APPROVALS,
          query: { ...(companyId && { companyId }) },
        });
      }}
      btnPosition="left"
      buttonText="View All"
      maxHeight={'40vh'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!!!data?.data?.length}
        noDataMessage={'No approval found'}
        errorHeight="100%"
      >
        {data?.data?.map((approval: ApprovalsDataI) => (
          <Fragment key={approval?._id}>
            <ApprovalCard data={approval} />
          </Fragment>
        ))}
      </ApiRequestFlow>
    </CardLayout>
  );
};
