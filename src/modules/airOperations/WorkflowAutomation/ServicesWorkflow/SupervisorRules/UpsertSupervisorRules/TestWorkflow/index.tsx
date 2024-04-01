import CommonModal from '@/components/CommonModal';
import { useTestWorkflow } from './useTestWorkflow';
import { Box, Typography } from '@mui/material';
import Search from '@/components/Search';
import { TestWorkflowDrawer } from './TestWorkflowDrawer';

export const TestWorkflow = (props: any) => {
  const { openWorkflowModal, setOpenWorkflowModal } = props;
  const { searchBy, setSearchBy, isWorkflowDrawer, setIsWorkflowDrawer } =
    useTestWorkflow();
  return (
    <>
      <CommonModal
        open={openWorkflowModal}
        handleClose={() => setOpenWorkflowModal(false)}
        handleCancel={() => setOpenWorkflowModal(false)}
        title="Test Workflow"
        footer
        okText="Test Now"
        cancelText="Cancel"
        handleSubmit={() => {
          setIsWorkflowDrawer(true);
          setOpenWorkflowModal(false);
        }}
      >
        <Box>
          <Typography
            variant="body2"
            fontWeight={500}
            pb={0.6}
            color="grey.600"
          >
            Select Task to test
          </Typography>
          <Search
            width="100%"
            label="Type to search"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
        </Box>
      </CommonModal>
      <TestWorkflowDrawer
        isWorkflowDrawer={isWorkflowDrawer}
        setIsWorkflowDrawer={setIsWorkflowDrawer}
      />
    </>
  );
};
