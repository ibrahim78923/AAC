import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Cancel } from '@mui/icons-material';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TestWorkflow } from '../TestWorkflow';
import { useWorkflowHeader } from './useWorkflowHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

export const WorkflowHeader = (props: any) => {
  const { isLoading, saveLoading, setValidation } = props;
  const {
    handleMoveBack,
    openWorkflowModal,
    setOpenWorkflowModal,
    handleCancel,
  } = useWorkflowHeader(props);
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
            onClick={handleCancel}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            startIcon={<GrayBookIcon />}
            variant="outlined"
            color="secondary"
            loading={saveLoading}
            onClick={() => setValidation(false)}
            type="submit"
          >
            Save as Draft
          </LoadingButton>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.TEST_WORKFLOW,
            ]}
          >
            <LoadingButton
              startIcon={<CopyIcon />}
              variant={'outlined'}
              color={'secondary'}
              onClick={() => setOpenWorkflowModal(true)}
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
              onClick={() => setValidation(true)}
            >
              Create
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
      <TestWorkflow
        openWorkflowModal={openWorkflowModal}
        setOpenWorkflowModal={setOpenWorkflowModal}
      />
    </Box>
  );
};
