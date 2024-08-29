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
import { DeleteConversation } from './DeleteConversation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import ApiErrorState from '@/components/ApiErrorState';

export const Conversations = () => {
  const {
    data,
    isLoading,
    isFetching,
    addConversationDropdownButton,
    openConversationTypeContext,
    selectedConversationType,
    setSelectedConversationType,
    refetch,
    isError,
  }: any = useConversations();

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {!!!data?.data?.length ? (
        <NoData message="There are no conversation available">
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ADD_CONVERSATION
            }
          >
            <SingleDropdownButton
              dropdownOptions={addConversationDropdownButton}
              dropdownName={'ADD'}
              btnVariant="contained"
              color="primary"
              endIcon={<></>}
              startIcon={<PlusSharedColorIcon />}
            />
          </PermissionsGuard>
        </NoData>
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={2}
          >
            <PageTitledHeader title={'Conversation'} />
            <PermissionsGuard
              permissions={
                Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ADD_CONVERSATION
              }
            >
              <SingleDropdownButton
                dropdownOptions={addConversationDropdownButton}
                dropdownName={'Add Conversation'}
                btnVariant="contained"
                color="primary"
                endIcon={<></>}
                startIcon={<PlusSharedColorIcon />}
                menuSxProps={{ '.MuiPaper-root': { width: pxToRem(190) } }}
              />
            </PermissionsGuard>
          </Box>
          <Box maxHeight={'50vh'} overflow={'auto'}>
            {data?.data?.map((conversation: any) => (
              <Fragment key={conversation?._id}>
                <ConversationCard
                  data={conversation}
                  setSelectedConversationType={setSelectedConversationType}
                />
              </Fragment>
            ))}
          </Box>
        </>
      )}
      {selectedConversationType?.isOpen && openConversationTypeContext()}

      {selectedConversationType?.isDelete && (
        <DeleteConversation
          isDrawerOpen={selectedConversationType?.isDelete}
          setIsDrawerOpen={setSelectedConversationType}
          selectedConversationType={selectedConversationType}
          refetch={refetch}
        />
      )}
    </>
  );
};
