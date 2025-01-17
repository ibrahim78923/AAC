import { Box, Typography } from '@mui/material';
import { ConversationCard } from './ConversationCard';
import { Fragment } from 'react';
import { useSingleTicketConversation } from './useSingleTicketConversation';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const SingleTicketConversation = (props: any) => {
  const { singleTicketData } = props;
  const {
    data,
    isFetching,
    isLoading,
    refetch,
    isError,
    isReplyOpen,
    setIsReplyOpen,
  } = useSingleTicketConversation();

  return (
    <ApiRequestFlow
      hasNoData={!data?.data?.length}
      NoDataMessage="No conversation found"
      noDataHeight="100%"
      hasError={isError}
      refreshApi={refetch}
      showSkeleton={isFetching || isLoading}
      skeletonType={SKELETON_TYPES?.BARS}
    >
      <Typography color="slateBlue.main" variant="h5">
        Conversation
      </Typography>
      <br />
      <Box maxHeight={'50vh'} overflow={'auto'}>
        {data?.data?.map((conversation: any) => (
          <Fragment key={conversation?._id}>
            <ConversationCard
              data={conversation}
              isReplyOpen={isReplyOpen}
              setIsReplyOpen={setIsReplyOpen}
              singleTicketData={singleTicketData}
            />
          </Fragment>
        ))}
      </Box>
    </ApiRequestFlow>
  );
};
