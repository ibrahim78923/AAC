import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { Box, Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { useKnowledgeBase } from './useKnowledgeBase';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS,
  AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS,
} from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Search from '@/components/Search';
import ReportAnIssueModal from '../Dashboard/ReportAnIssueModal';
import { fullName } from '@/utils/avatarUtils';

export const KnowledgeBase = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    knowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    handleKnowledgeBaseDetail,
    newTicketsDropdown,
    refetch,
  } = useKnowledgeBase();

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS?.VIEW_ARTICLES_DIFFERENT_CATEGORY,
        ]}
      >
        <PageTitledHeader title={'Knowledge Base'}>
          <PermissionsGuard
            permissions={[
              AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
              AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={newTicketsDropdown}
              dropdownName={'New'}
              btnVariant="contained"
              color="primary"
              startIcon={<AddBoxIcon />}
            />
          </PermissionsGuard>
        </PageTitledHeader>
        <Box mb={2}>
          <Search label="Search Here" setSearchBy={setSearch} />
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
                    handleKnowledgeBaseDetail={handleKnowledgeBaseDetail}
                  />
                </Grid>
              ))
            ) : (
              <NoData message="There are no knowledge base articles available" />
            )}
          </Grid>
        )}
      </PermissionsGuard>
      {openReportAnIssueModal && (
        <ReportAnIssueModal
          openReportAnIssueModal={openReportAnIssueModal}
          setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        />
      )}
    </>
  );
};
