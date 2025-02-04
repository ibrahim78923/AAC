import { Box } from '@mui/material';
import { useKnowledgeBase } from './useKnowledgeBase';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { fullName } from '@/utils/avatarUtils';
import { IconInfoCard } from '@/components/Cards/IconInfoCard';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ListGrid } from '@/components/Grids/ListGrid';

export const KnowledgeBase = () => {
  const {
    knowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    refetch,
    router,
  } = useKnowledgeBase();

  return (
    <>
      <PageTitledHeader title={'Knowledge Base'} />
      <Box mb={2}>
        <Search label="Search Here" setSearchBy={setSearch} size="small" />
      </Box>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!knowledgeBaseFolderData?.length}
        noDataMessage={'There are no knowledge base articles available'}
      >
        <ListGrid
          sm={6}
          md={4}
          lg={3}
          list={knowledgeBaseFolderData}
          render={(folder: any) => (
            <IconInfoCard
              name={folder?.name}
              description={fullName(
                folder?.createdBy?.firstName,
                folder?.createdBy?.lastName,
              )}
              descriptionType="Created By: "
              dateType="Created Date : "
              createdDate={folder?.createdAt}
              onClick={() =>
                router?.push({
                  pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
                  query: {
                    folderId: folder?._id,
                    ...(router?.query?.companyId && {
                      companyId: router?.query?.companyId,
                    }),
                  },
                })
              }
            />
          )}
        />
      </ApiRequestFlow>
    </>
  );
};
