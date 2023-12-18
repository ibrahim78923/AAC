import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { knowledgeBaseDataArray } from './KnowledgeBase.data';
import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { Header } from './Header';
import { useKnowledgeBase } from './useKnowledgeBase';

export const KnowledgeBase = () => {
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
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
      <Grid container display={'flex'} justifyContent={'center'} spacing={2}>
        {!!knowledgeBaseDataArray?.length ? (
          knowledgeBaseDataArray?.map((option: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={option?.id}>
              <KnowledgeBaseCard
                id={option?.id}
                name={option?.name}
                createdBy={option?.createdBy}
                createdDate={option?.createdDate}
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
    </>
  );
};
