import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TestWorkflow } from '../TestWorkflow';
import { useWorkflowHeader } from './useWorkflowHeader';

export const WorkflowHeader = ({
  postWorkflowProgress,
  setValidation,
  saveWorkflowProgress,
}: any) => {
  const { handleMoveBack, openWorkflowModal, setOpenWorkflowModal, action } =
    useWorkflowHeader();
  const EDIT_WORKFLOW = 'edit';
  const mainTitle = {
    edit: 'Edit Rules',
    create: 'Create Rules',
    update: 'Update',
  };
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
          title={action === EDIT_WORKFLOW ? mainTitle?.edit : mainTitle?.create}
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
            onClick={() => setValidation(false)}
            disabled={saveWorkflowProgress?.isLoading}
          >
            Save as Draft
          </LoadingButton>
          <LoadingButton
            startIcon={<WhiteBookIcon />}
            variant="contained"
            type="submit"
            onClick={() => setValidation(true)}
            disabled={postWorkflowProgress?.isLoading}
          >
            {action === EDIT_WORKFLOW ? mainTitle?.update : mainTitle?.create}
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
