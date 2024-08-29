import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Cancel } from '@mui/icons-material';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useWorkflowHeader } from './useWorkflowHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { TestWorkflowDrawer } from '../TestWorkflowDrawer';
import { WorkflowHeaderI } from './WorkflowHeader.interface';

export const WorkflowHeader = (props: WorkflowHeaderI) => {
  const {
    isLoading,
    saveLoading,
    setValidation,
    watch,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
  } = props;
  const { handleMoveBack, workflowId } = useWorkflowHeader(props);
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
          title={'Sales Workflow'}
          canMovedBack
          moveBack={handleMoveBack}
        />
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
          <LoadingButton
            startIcon={<Cancel color="action" />}
            variant="outlined"
            color="secondary"
            disabled={saveLoading || isLoading}
            onClick={handleMoveBack}
          >
            Cancel
          </LoadingButton>
          {!workflowId && (
            <LoadingButton
              startIcon={<GrayBookIcon />}
              variant="outlined"
              color="secondary"
              loading={saveLoading}
              disabled={saveLoading || isLoading}
              onClick={() => setValidation('save')}
              type="submit"
            >
              Save as Draft
            </LoadingButton>
          )}
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.TEST_WORKFLOW,
            ]}
          >
            <LoadingButton
              startIcon={<CopyIcon />}
              variant={'outlined'}
              color={'secondary'}
              disabled={saveLoading || isLoading}
              onClick={() => setValidation('test')}
              type="submit"
            >
              Test Workflow
            </LoadingButton>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.ENABLE_NOW,
            ]}
          >
            <LoadingButton
              startIcon={<WhiteBookIcon />}
              variant="contained"
              type="submit"
              loading={isLoading}
              disabled={saveLoading || isLoading}
              onClick={() => setValidation('upsert')}
            >
              {workflowId ? 'Update' : 'Create'}
            </LoadingButton>
          </PermissionsGuard>
        </Box>
      </Box>
      <Box py={2} maxWidth={{ md: '54%', xs: '100%' }}>
        <RHFTextField
          name="title"
          size="small"
          label="Title"
          placeholder="Title"
          required
        />
        <RHFEditor
          name="description"
          label="Description"
          style={{ minHeight: 200 }}
        />
      </Box>
      <TestWorkflowDrawer
        isWorkflowDrawer={isWorkflowDrawer}
        setIsWorkflowDrawer={setIsWorkflowDrawer}
        watch={watch}
      />
    </Box>
  );
};
