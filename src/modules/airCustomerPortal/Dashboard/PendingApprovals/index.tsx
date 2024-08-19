import { CardLayout } from '../CardLayout';
import { usePendingApprovals } from './usePendingApprovals';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import { ApprovalCard } from '../../Catalog/Approvals/ApprovalCard';
import { Fragment } from 'react';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const PendingApprovals = () => {
  const { data, isLoading, isFetching, isError, router, refetch } =
    usePendingApprovals();

  return (
    <CardLayout
      title={'Pending for Approval'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.APPROVALS,
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
            data?.data?.map((approval: { _id: string }) => (
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
