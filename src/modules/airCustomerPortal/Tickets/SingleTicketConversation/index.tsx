import { Box, Typography } from '@mui/material';
import { ConversationCard } from './ConversationCard';
import { Fragment } from 'react';
import { useSingleTicketConversation } from './useSingleTicketConversation';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';

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

  if (isFetching || isLoading) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <Typography color="slateBlue.main" variant="h5">
        Conversation
      </Typography>
      <br />
      <Box maxHeight={'50vh'} overflow={'auto'}>
        {!!data?.data?.length ? (
          data?.data?.map((conversation: any) => (
            <Fragment key={conversation?._id}>
              <ConversationCard
                data={conversation}
                isReplyOpen={isReplyOpen}
                setIsReplyOpen={setIsReplyOpen}
                singleTicketData={singleTicketData}
              />
            </Fragment>
          ))
        ) : (
          <NoData height="100%" message="No conversation found" />
        )}
      </Box>
    </>
  );
};
