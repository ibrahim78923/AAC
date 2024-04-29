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
  movePage,
}: any) => {
  const { action } = useWorkflowHeader();
  const EDIT_WORKFLOW = 'edit';
  const mainTitle = {
    edit: 'Edit Event Base Workflow',
    createButton: 'Create Event Base Workflow',
    update: 'Update',
    create: 'Create',
  };
  const isLoadingButton =
    testWorkflowProgress?.isLoading ||
    saveWorkflowProgress?.isLoading ||
    postWorkflowProgress?.isLoading ||
    updatedWorkflowProcess?.isLoading;
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
          moveBack={movePage}
        />
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
          <LoadingButton
            startIcon={<Cancel color="action" />}
            variant="outlined"
            color="secondary"
            onClick={movePage}
            disabled={isLoadingButton}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            startIcon={<CopyIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
            loading={testWorkflowProgress?.isLoading}
            onClick={() => {
              setValidation('test');
              handleTestWorkflow();
            }}
            disabled={isLoadingButton}
          >
            Test Workflow
          </LoadingButton>
          {action !== EDIT_WORKFLOW && (
            <LoadingButton
              startIcon={<GrayBookIcon />}
              variant="outlined"
              color="secondary"
              type="submit"
              loading={saveWorkflowProgress?.isLoading}
              disabled={isLoadingButton}
              onClick={() => setValidation('save')}
            >
              Save as Draft
            </LoadingButton>
          )}
          <LoadingButton
            startIcon={<WhiteBookIcon />}
            variant="contained"
            type="submit"
            loading={
              postWorkflowProgress?.isLoading ||
              updatedWorkflowProcess?.isLoading
            }
            disabled={isLoadingButton}
            onClick={() => setValidation('upsert')}
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
