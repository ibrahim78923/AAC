import { Box, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styles } from './AddRequestPage.style';
import AddRequestApproval from './AddRequestApproval';
import { useAddRequestPage } from './useAddRequestPage';

const AddRequestPage = () => {
  const { isDrawerOpen, setIsDrawerOpen, theme } = useAddRequestPage();
  return (
    <>
      <>
        <Typography variant="h5">Approvals</Typography>
        <Box sx={styles?.requestMainPageBox}>
          <Typography variant="body2" color={theme?.palette?.grey?.[900]}>
            No Approval Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
            startIcon={<AddCircleIcon />}
          >
            Request Approval
          </Button>
        </Box>
      </>
      <AddRequestApproval
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default AddRequestPage;
