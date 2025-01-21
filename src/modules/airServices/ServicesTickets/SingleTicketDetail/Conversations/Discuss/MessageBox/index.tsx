import { useMessageBox } from './useMessageBox';
import { MessageCard } from './MessageCard';
import { Fragment } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const MessageBox = (props: any) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    chatMessagesDropdown,
    user,
    refetch,
  } = useMessageBox(props);

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      hasNoData={!data?.data?.length}
      refreshApi={refetch}
      noDataMessage="No conversation found"
      errorHeight="100%"
    >
      {data?.data?.map((message: any) => (
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
