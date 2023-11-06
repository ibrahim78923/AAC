import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
export const CustomizeInventory = (props: any) => {
  const {
    isCustomizeModalOpen,
    // setIsCustomizeModalOpen,
    columns,
    handleClose,
  } = props;
  return (
    <Dialog
      open={isCustomizeModalOpen}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="formTopHeading" color="secondary">
            Select Fields
          </Typography>
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <Checkbox></Checkbox>
            <Typography variant="h6" color="secondary">
              Apply All
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <hr style={{ marginTop: '1rem' }} />
      <DialogContent>
        <Grid container>
          {columns?.map((column: any) => (
            <Grid item xs={12} sm={6} key={uuidv4()}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={1}
                flexWrap={'wrap'}
              >
                <Checkbox></Checkbox>
                <Typography variant="h5" fontWeight={500} color="secondary">
                  {column?.id}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <hr />
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
