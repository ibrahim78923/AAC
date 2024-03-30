import { useMessageBox } from './useMessageBox';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { MessageCard } from './MessageCard';
import { Fragment } from 'react';
import NoData from '@/components/NoData';

export const MessageBox = (props: any) => {
  const { data, isLoading, isFetching, isError, chatMessagesDropdown, user } =
    useMessageBox(props);

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState height="100%" />;

  return (
    <>
      {!!data?.data?.length ? (
        data?.data?.map((message: any) => (
          <Fragment key={message?._id}>
            <MessageCard
              message={message}
              chatMessagesDropdown={chatMessagesDropdown?.(message)}
              authUser={user}
            />
          </Fragment>
        ))
      ) : (
        <NoData message="No conversation found" height="100%" />
      )}
    </>
  );
};
