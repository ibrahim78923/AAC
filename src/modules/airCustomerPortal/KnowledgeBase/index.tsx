import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { Box, Button, Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { useKnowledgeBase } from './useKnowledgeBase';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Search from '@/components/Search';
import { fullName } from '@/utils/avatarUtils';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ReportIssue } from './ReportIssue';

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
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <Grid container spacing={2}>
          {!!knowledgeBaseFolderData?.length ? (
            knowledgeBaseFolderData?.map((option: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={option?._id}>
                <KnowledgeBaseCard
                  folderId={option?._id}
                  name={option?.name}
                  createdBy={fullName(
                    option?.createdBy?.firstName,
                    option?.createdBy?.lastName,
                  )}
                  createdDate={option?.createdAt}
                />
              </Grid>
            ))
          ) : (
            <NoData message="There are no knowledge base articles available" />
          )}
        </Grid>
      )}
      {openReportAnIssueModal && (
        <ReportIssue
          isPortalOpen={openReportAnIssueModal}
          setIsPortalOpen={setOpenReportAnIssueModal}
        />
      )}
    </>
  );
};
