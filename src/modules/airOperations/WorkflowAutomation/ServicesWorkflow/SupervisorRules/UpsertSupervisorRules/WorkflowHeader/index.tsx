import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useWorkflowHeader } from './useWorkflowHeader';
import { Cancel } from '@mui/icons-material';
import { TestWorkflowDrawer } from '../../../TestWorkflowDrawer';

export const WorkflowHeader = ({
  setValidation,
  saveWorkflowProgress,
  postWorkflowProgress,
  handleTestWorkflow,
  isWorkflowDrawer,
  setIsWorkflowDrawer,
  updatedWorkflowProcess,
  watch,
  movePage,
}: any) => {
  const { action } = useWorkflowHeader();
  const EDIT_WORKFLOW = 'edit';
  const mainTitle = {
    edit: 'Edit Rules',
    createButton: 'Create Rules',
    create: 'Create',
    update: 'Update',
  };
  const isLoadingButton =
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
        mb={2}
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
            className="small"
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            startIcon={<CopyIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
            onClick={() => {
              setValidation('test');
              handleTestWorkflow();
            }}
            disabled={isLoadingButton}
            className="small"
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
              className="small"
            >
              Save as Draft
            </LoadingButton>
          )}
          <LoadingButton
            className="small"
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
        watch={watch}
      />
    </Box>
  );
};
