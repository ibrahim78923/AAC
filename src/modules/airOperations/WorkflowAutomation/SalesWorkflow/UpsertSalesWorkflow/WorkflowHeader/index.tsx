import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Cancel } from '@mui/icons-material';
import { CopyIcon, GrayBookIcon, WhiteBookIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TestWorkflow } from '../TestWorkflow';
import { useWorkflowHeader } from './useWorkflowHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { RHFTextField } from '@/components/ReactHookForm';

const SCHEDULE = 'Schedule';
export const WorkflowHeader = (props: any) => {
  const {
    handleMoveBack,
    openWorkflowModal,
    setOpenWorkflowModal,
    scheduleWorkflow,
    handleSaveDefault,
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
          {scheduleWorkflow === SCHEDULE && (
            <LoadingButton
              startIcon={<GrayBookIcon />}
              variant="outlined"
              color="secondary"
              onClick={handleSaveDefault}
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
              variant={scheduleWorkflow === SCHEDULE ? 'contained' : 'outlined'}
              color={scheduleWorkflow === SCHEDULE ? 'primary' : 'secondary'}
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
            {scheduleWorkflow !== SCHEDULE && (
              <LoadingButton
                startIcon={<WhiteBookIcon />}
                variant="contained"
                type="submit"
              >
                Enable
              </LoadingButton>
            )}
          </PermissionsGuard>
        </Box>
      </Box>
      <Box py={2} maxWidth={{ md: '54%', xs: '100%' }}>
        <RHFTextField name="title" size="small" label="Title" required />
      </Box>
      <TestWorkflow
        openWorkflowModal={openWorkflowModal}
        setOpenWorkflowModal={setOpenWorkflowModal}
      />
    </Box>
  );
};
