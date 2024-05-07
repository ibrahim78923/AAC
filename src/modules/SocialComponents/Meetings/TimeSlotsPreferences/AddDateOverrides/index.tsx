import { AlertModalCloseIcon } from '@/assets/icons';
import { RHFDatePicker, RHFTimePicker } from '@/components/ReactHookForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const AddDateOverrides = (props: any) => {
  const {
    openModule,
    setOpenModule,
    fields,
    remove,
    addDateOverride,
    setShowData,
  } = props;
  const handleShowData = () => {
    setShowData(true), setOpenModule(false);
  };
  return (
    <>
      <Dialog open={openModule} onClose={() => setOpenModule(false)} fullWidth>
        <DialogTitle>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={1}
            flexWrap={'wrap'}
          >
            <Typography variant="h4">Add a date override</Typography>
            <IconButton onClick={() => setOpenModule(false)}>
              <AlertModalCloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">
            Select the date(s) you want to assign specific hours
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <RHFDatePicker name="overrideDate" label="Select Date" fullWidth />
          <Grid item xs={12} py={0.5}>
            <Divider />
          </Grid>
          <Typography variant="h6">What hours are you available?</Typography>
          <Grid
            container
            mt={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {fields?.map((field: any, index: number) => (
              <Grid item xs={10} key={field?.id} display={'flex'} gap={0.5}>
                <RHFTimePicker name={`overrides[${index}].start`} />
                <RHFTimePicker name={`overrides[${index}].end`} />
                {fields?.length > 1 && (
                  <IconButton onClick={() => remove(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            ))}
            <IconButton onClick={addDateOverride}>
              <AddCircleIcon />
            </IconButton>
            <Grid item xs={12} py={0.5}>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModule(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleShowData}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDateOverrides;
