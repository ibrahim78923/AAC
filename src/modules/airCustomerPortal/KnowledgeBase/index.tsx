import { Box, Button } from '@mui/material';
import { useKnowledgeBase } from './useKnowledgeBase';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Search from '@/components/Search';
import { fullName } from '@/utils/avatarUtils';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ReportIssue } from './ReportIssue';
import { IconInfoCard } from '@/components/Cards/IconInfoCard/IconInfoCard';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ListGrid } from '@/components/Grids/ListGrid';

export const KnowledgeBase = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    knowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    newTicketsDropdown,
    auth,
    refetch,
    customerPortalStyling,
    reportAnIssuePermission,
    router,
  } = useKnowledgeBase();

  return (
    <>
      <PageTitledHeader title={'Knowledge Base'}>
        {!auth?.isAuthenticated ? (
          reportAnIssuePermission && (
            <Button
              variant="contained"
              onClick={() => setOpenReportAnIssueModal?.(true)}
              sx={(theme: any) => ({
                bgcolor:
                  customerPortalStyling?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
                '&:hover': {
                  bgcolor:
                    customerPortalStyling?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                  color: 'common.white',
                },
              })}
            >
              Report An Issue
            </Button>
          )
        ) : (
          <PublicSingleDropdownButton
            dropdownOptions={newTicketsDropdown}
            dropdownName={'New'}
            btnVariant="contained"
            startIcon={<AddBoxIcon />}
            sx={(theme: any) => ({
              bgcolor:
                customerPortalStyling?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
              '&:hover': {
                bgcolor:
                  customerPortalStyling?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
              },
            })}
          />
        )}
      </PageTitledHeader>
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
      {openReportAnIssueModal && (
        <ReportIssue
          isPortalOpen={openReportAnIssueModal}
          setIsPortalOpen={setOpenReportAnIssueModal}
        />
      )}
    </>
  );
};
