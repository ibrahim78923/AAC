import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export const AssociatesListHeader = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'1rem'}
      >
        <Typography variant="h6">Associations</Typography>
        <Box
          gap={'1rem'}
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<AddCircleOutlineIcon />}
          >
            Add Associations
          </Button>
        </Box>
      </Box>
    </>
  );
};
