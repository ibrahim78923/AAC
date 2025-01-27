import { useMessageBox } from './useMessageBox';
import { MessageCard } from './MessageCard';
import { Fragment } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const MessageBox = (props: any) => {
  const {
    isLoading,
    isFetching,
    isError,
    chatMessagesDropdown,
    user,
    refetch,
    chatMessages,
  } = useMessageBox(props);

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      hasNoData={!chatMessages?.length}
      refreshApi={refetch}
      noDataMessage="No conversation found"
      errorHeight="100%"
    >
      {Array.isArray(chatMessages) &&
        chatMessages?.map((message: any) => (
          <Fragment key={message?._id}>
            <MessageCard
              message={message}
              chatMessagesDropdown={chatMessagesDropdown?.(message)}
              authUser={user}
            />
          </Fragment>
        ))}
    </ApiRequestFlow>
  );
};
