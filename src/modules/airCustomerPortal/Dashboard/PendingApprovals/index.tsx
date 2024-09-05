import { CardLayout } from '../CardLayout';
import { usePendingApprovals } from './usePendingApprovals';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import { ApprovalCard } from '../../Catalog/Approvals/ApprovalCard';
import { Fragment } from 'react';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { ApprovalsDataI } from '../../Catalog/Approvals/AllApprovals/AllApprovals.interface';

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
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState height={'100%'} canRefresh refresh={() => refetch?.()} />
      ) : (
        <>
          {!!data?.data?.length ? (
            data?.data?.map((approval: ApprovalsDataI) => (
              <Fragment key={approval?._id}>
                <ApprovalCard data={approval} />
              </Fragment>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </>
      )}
    </CardLayout>
  );
};
