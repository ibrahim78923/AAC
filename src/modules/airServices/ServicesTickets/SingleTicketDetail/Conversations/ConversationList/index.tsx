import { Box } from '@mui/material';
import { Fragment } from 'react';
import { ConversationCard } from '../ConversationCard';
import { useConversationList } from './useConversationList';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const ConversationList = () => {
  const {
    getTicketConversationListData,
    lazyGetServicesTicketsConversationListStatus,
    setAction,
    showLoader,
    showMoreLoader,
  }: any = useConversationList();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={lazyGetServicesTicketsConversationListStatus?.isError}
      refreshApi={getTicketConversationListData}
      hasNoData={
        !lazyGetServicesTicketsConversationListStatus?.data?.data?.length
      }
      noDataMessage="No conversations found"
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
    >
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
    </ApiRequestFlow>
  );
};
