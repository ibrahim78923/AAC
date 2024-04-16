import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useWorkflowHeader } from './useWorkflowHeader';
import { TestWorkflowDrawer } from '../TestWorkflow/TestWorkflowDrawer';
import { Cancel } from '@mui/icons-material';

export const WorkflowHeader = ({
  setValidation,
  saveWorkflowProgress,
  postWorkflowProgress,
  handleTestWorkflow,
  isWorkflowDrawer,
  setIsWorkflowDrawer,
  updatedWorkflowProcess,
  testWorkflowProgress,
  testWorkflowResponse,
  watch,
}: any) => {
  const { handleMoveBack, action, handleCancel } = useWorkflowHeader();
  const EDIT_WORKFLOW = 'edit';
  const mainTitle = {
    edit: 'Edit Event Base Workflow',
    createButton: 'Create Event Base Workflow',
    update: 'Update',
    create: 'Create',
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
          title={
            action === EDIT_WORKFLOW ? mainTitle?.edit : mainTitle?.createButton
          }
          canMovedBack
          moveBack={handleMoveBack}
        />
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
          <LoadingButton
            startIcon={<Cancel color="action" />}
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            startIcon={<CopyIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
            onClick={() => {
              setValidation(true);
              handleTestWorkflow();
            }}
            disabled={testWorkflowProgress?.isLoading}
          >
            Test Workflow
          </LoadingButton>
          <LoadingButton
            startIcon={<GrayBookIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={saveWorkflowProgress?.isLoading}
            onClick={() => setValidation(false)}
          >
            Save as Draft
          </LoadingButton>
          <LoadingButton
            startIcon={<WhiteBookIcon />}
            variant="contained"
            type="submit"
            disabled={
              postWorkflowProgress?.isLoading ||
              updatedWorkflowProcess?.isLoading
            }
            onClick={() => setValidation(true)}
          >
            {action === EDIT_WORKFLOW ? mainTitle?.update : mainTitle?.create}
          </LoadingButton>
        </Box>
      </Box>
      <TestWorkflowDrawer
        isWorkflowDrawer={isWorkflowDrawer}
        setIsWorkflowDrawer={setIsWorkflowDrawer}
        testWorkflowResponse={testWorkflowResponse}
        watch={watch}
      />
    </Box>
  );
};
