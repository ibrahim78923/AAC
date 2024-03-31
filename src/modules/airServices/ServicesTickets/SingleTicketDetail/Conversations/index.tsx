import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { ConversationCard } from './ConversationCard';
import { useConversations } from './useConversations';
import NoData from '@/components/NoData';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PlusSharedColorIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';
import { Fragment } from 'react';

export const Conversations = () => {
  const {
    data,
    isLoading,
    isFetching,
    addConversationDropdownButton,
    openConversationTypeContext,
    selectedConversationType,
  }: any = useConversations();

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {!!!data?.data?.length ? (
        <NoData message="There are no conversation available">
          <SingleDropdownButton
            dropdownOptions={addConversationDropdownButton}
            dropdownName={'ADD'}
            btnVariant="contained"
            color="primary"
            endIcon={<></>}
            startIcon={<PlusSharedColorIcon />}
          />
        </NoData>
      ) : (
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={2}
          >
            <PageTitledHeader title={'Conversation'} />
            <SingleDropdownButton
              dropdownOptions={addConversationDropdownButton}
              dropdownName={'ADD Conversation'}
              btnVariant="contained"
              color="primary"
              endIcon={<></>}
              startIcon={<PlusSharedColorIcon />}
              menuSxProps={{ '.MuiPaper-root': { width: pxToRem(190) } }}
            />
          </Box>
          <Box maxHeight={'50vh'} overflow={'auto'}>
            {data?.data?.map((conversation: any) => (
              <Fragment key={conversation?._id}>
                <ConversationCard data={conversation} />
              </Fragment>
            ))}
          </Box>
        </>
      )}
      {selectedConversationType?.isOpen && openConversationTypeContext()}
    </>
  );
};
