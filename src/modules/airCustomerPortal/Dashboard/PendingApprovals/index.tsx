import { CardLayout } from '../CardLayout';
import { Box } from '@mui/material';
import { usePendingApprovals } from './usePendingApprovals';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { ApprovalCard } from '../../Catalog/Approvals/ApprovalCard';
import { Fragment } from 'react';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const PendingApprovals = () => {
  const { data, isLoading, isFetching, isError, router } =
    usePendingApprovals();

  return (
    <CardLayout
      title={'Pending for Approval'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.APPROVALS,
        });
      }}
      maxHeight={260}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box my="0.75rem">
          {!!data?.data?.length ? (
            data?.data?.map((approval: any) => (
              <Fragment key={approval?._id}>
                <ApprovalCard data={approval} />
              </Fragment>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
      )}
    </CardLayout>
  );
};
