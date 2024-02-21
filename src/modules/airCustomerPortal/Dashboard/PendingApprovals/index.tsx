import { CardLayout } from '../CardLayout';
import { Box } from '@mui/material';
import { usePendingApprovals } from './usePendingApprovals';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { ApprovalCard } from '../../Catalog/Approvals/ApprovalCard';
import { Fragment } from 'react';

export const PendingApprovals = ({ title, handleViewMore }: any) => {
  const { data, isLoading, isFetching, isError } = usePendingApprovals();

  return (
    <CardLayout title={title} btnClick={handleViewMore} maxHeight={260}>
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
