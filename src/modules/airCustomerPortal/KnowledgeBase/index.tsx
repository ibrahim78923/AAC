import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { Header } from './Header';
import { useKnowledgeBase } from './useKnowledgeBase';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

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
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Grid container display={'flex'} justifyContent={'center'} spacing={2}>
          {!!KnowledgeBaseFolderData?.length ? (
            KnowledgeBaseFolderData?.map((option: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={option?.id}>
                <KnowledgeBaseCard
                  folderId={option?._id}
                  name={option?.name}
                  createdBy={option?.createdBy?.firstName}
                  createdDate={new Date(option?.createdAt).toLocaleDateString(
                    'en-GB',
                  )}
                />
              </Grid>
            ))
          ) : (
            <NoData
              message="There are no knowledge base articles available"
              image={NoAssociationFoundImage}
            />
          )}
        </Grid>
      )}
    </>
  );
};
