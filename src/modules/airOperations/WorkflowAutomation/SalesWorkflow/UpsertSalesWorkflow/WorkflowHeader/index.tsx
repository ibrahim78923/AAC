import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Cancel } from '@mui/icons-material';
import {
  CopyIcon,
  EditBlackIcon,
  GrayBookIcon,
  WhiteBookIcon,
} from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TestWorkflow } from '../TestWorkflow';
import { useWorkflowHeader } from './useWorkflowHeader';

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
              Save as Default
            </LoadingButton>
          )}
          <LoadingButton
            startIcon={<CopyIcon />}
            variant={scheduleWorkflow === SCHEDULE ? 'contained' : 'outlined'}
            color={scheduleWorkflow === SCHEDULE ? 'primary' : 'secondary'}
            onClick={() => setOpenWorkflowModal(true)}
          >
            Test Workflow
          </LoadingButton>
          {scheduleWorkflow !== SCHEDULE && (
            <LoadingButton
              startIcon={<WhiteBookIcon />}
              variant="contained"
              type="submit"
            >
              Enable
            </LoadingButton>
          )}
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={1} py={1}>
        <Typography variant="h4" color="slateBlue.main">
          Dummy Title Workflow - 09 May 2023, 10:50:12 GMT+05:00
        </Typography>
        <EditBlackIcon />
      </Box>
      <TestWorkflow
        openWorkflowModal={openWorkflowModal}
        setOpenWorkflowModal={setOpenWorkflowModal}
      />
    </Box>
  );
};
