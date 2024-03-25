import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { Header } from './Header';
import { useKnowledgeBase } from './useKnowledgeBase';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const KnowledgeBase = () => {
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    KnowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    handleKnowledgeBaseDetail,
  } = useKnowledgeBase();

  return (
    <>
      <Header
        handleButtonClick={handleButtonClick}
        setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        openReportAnIssueModal={openReportAnIssueModal}
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        setSearch={setSearch}
      />
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <Grid container spacing={2}>
          {!!KnowledgeBaseFolderData?.length ? (
            KnowledgeBaseFolderData?.map((option: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={option?._id}>
                <KnowledgeBaseCard
                  folderId={option?._id}
                  name={option?.name}
                  createdBy={option?.createdBy?.firstName}
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
    </>
  );
};
