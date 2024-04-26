import { useTestWorkflow } from './useTestWorkflow';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@/components/Search';
import { AlertModalCloseIcon } from '@/assets/icons';
import { TestWorkflowDrawer } from './TestWorkflowDrawer';

export const TestWorkflow = (props: any) => {
  const { openWorkflowModal, setOpenWorkflowModal } = props;
  const {
    searchBy,
    setSearchBy,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    handleSubmit,
  } = useTestWorkflow(props);
  return (
    <>
      <Dialog
        fullWidth
        open={openWorkflowModal}
        onClose={() => setOpenWorkflowModal?.(false)}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              borderRadius: 5,
              p: 2,
            },
          },
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h3">Test Workflow</Typography>
          <IconButton
            onClick={() => setOpenWorkflowModal?.(false)}
            style={{ cursor: 'pointer' }}
          >
            <AlertModalCloseIcon />
          </IconButton>
        </Box>
        <br />
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
        <br />
        <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenWorkflowModal?.(false)}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" onClick={handleSubmit}>
            Test Now
          </LoadingButton>
        </Box>
      </Dialog>
      <TestWorkflowDrawer
        isWorkflowDrawer={isWorkflowDrawer}
        setIsWorkflowDrawer={setIsWorkflowDrawer}
      />
    </>
  );
};
