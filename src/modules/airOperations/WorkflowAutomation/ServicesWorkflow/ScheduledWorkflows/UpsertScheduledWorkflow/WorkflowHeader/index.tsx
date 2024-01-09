import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TestWorkflow } from '../TestWorkflow';
import { useWorkflowHeader } from './useWorkflowHeader';

export const WorkflowHeader = () => {
  const { handleMoveBack, openWorkflowModal, setOpenWorkflowModal, action } =
    useWorkflowHeader();
  const EDIT_WORKFLOW = 'edit';
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
      >
        <PageTitledHeader
          title={
            action === EDIT_WORKFLOW
              ? 'Edit Scheduled Workflow'
              : 'Create Scheduled Workflow'
          }
          canMovedBack
          moveBack={handleMoveBack}
        />
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
          <LoadingButton
            startIcon={<CopyIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => setOpenWorkflowModal(true)}
          >
            Test Workflow
          </LoadingButton>
          <LoadingButton
            startIcon={<GrayBookIcon />}
            variant="outlined"
            color="secondary"
          >
            Save as Draft
          </LoadingButton>
          <LoadingButton
            startIcon={<WhiteBookIcon />}
            variant="contained"
            type="submit"
          >
            {action === EDIT_WORKFLOW ? 'Update' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
      <TestWorkflow
        openWorkflowModal={openWorkflowModal}
        setOpenWorkflowModal={setOpenWorkflowModal}
      />
    </Box>
  );
};
