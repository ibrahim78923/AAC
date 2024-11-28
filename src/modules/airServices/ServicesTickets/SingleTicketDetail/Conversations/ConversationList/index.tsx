import NoData from '@/components/NoData';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { ConversationCard } from '../ConversationCard';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import ApiErrorState from '@/components/ApiErrorState';
import { useConversationList } from './useConversationList';

export const ConversationList = () => {
  const {
    getTicketConversationListData,
    lazyGetServicesTicketsConversationListStatus,
    setAction,
    showLoader,
    showMoreLoader,
  }: any = useConversationList();

  if (showLoader)
    return <SkeletonCard gridSize={{ md: 12 }} outerPadding={{ x: 2, y: 3 }} />;

  if (lazyGetServicesTicketsConversationListStatus?.isError)
    return <ApiErrorState canRefresh refresh={getTicketConversationListData} />;

  if (!!!lazyGetServicesTicketsConversationListStatus?.data?.data?.length)
    return <NoData message="No conversations found" />;

  return (
    <Box maxHeight={'80vh'} overflow={'auto'}>
      <br />
      {lazyGetServicesTicketsConversationListStatus?.data?.data?.map(
        (conversation: any) => (
          <Fragment key={conversation?._id}>
            <ConversationCard
              data={conversation}
              setAction={setAction}
              showMoreLoader={showMoreLoader}
            />
          </Fragment>
        ),
      )}
    </Box>
  );
};
