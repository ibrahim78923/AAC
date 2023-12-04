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
import { useCustomizeInventoryColumn } from './useCustomizeInventoryColumn';
import { inventoryListsInitialColumns } from '../Inventory.data';

export const CustomizeInventoryColumn = (props: any) => {
  const { isCustomizeModalOpen, inventoryListsColumnsPersist } = props;
  const {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    applyAllCheckboxHandler,
  } = useCustomizeInventoryColumn(props);
  return (
    <Dialog
      open={isCustomizeModalOpen}
      onClose={() => onClose?.()}
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
            <Checkbox
              color="primary"
              name={'apply all'}
              checked={
                inventoryListsInitialColumns?.length === customizeColumn?.length
              }
              onChange={(e: any): any => applyAllCheckboxHandler?.(e)}
            ></Checkbox>
            <Typography variant="h6" color="secondary">
              Apply All
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <hr style={{ marginTop: '1rem' }} />
      <DialogContent>
        <Grid container>
          {inventoryListsColumnsPersist?.slice?.(1)?.map((column: any) => (
            <Grid item xs={12} sm={6} key={uuidv4()}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={1}
                flexWrap={'wrap'}
              >
                <Checkbox
                  color="primary"
                  name={column?.id}
                  checked={customizeColumn?.includes(column?.id)}
                  onChange={(e: any): any => checkboxHandler?.(e, column)}
                ></Checkbox>
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => submit?.()}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
