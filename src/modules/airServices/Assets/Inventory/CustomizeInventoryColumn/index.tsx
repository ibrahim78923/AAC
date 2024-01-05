import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useCustomizeInventoryColumn } from './useCustomizeInventoryColumn';
import { inventoryListsInitialColumns } from '../Inventory.data';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

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
          <Typography variant="formTopHeading" color="grey.800">
            Select Fields
          </Typography>
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <Checkbox
              icon={<CheckboxIcon />}
              checkedIcon={<CheckboxCheckedIcon />}
              color="primary"
              name={'apply all'}
              checked={
                inventoryListsInitialColumns?.length === customizeColumn?.length
              }
              onChange={(e: any): any => applyAllCheckboxHandler?.(e)}
            ></Checkbox>
            <Typography
              variant="caption"
              fontWeight={400}
              color="slateBlue.main"
            >
              Apply All
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Divider sx={{ marginY: 1 }}></Divider>
      <DialogContent>
        <Grid container>
          {inventoryListsColumnsPersist?.slice?.(3)?.map((column: any) => (
            <Grid item xs={12} sm={6} key={column?.id}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={1}
                flexWrap={'wrap'}
              >
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  color="primary"
                  name={column?.id}
                  checked={customizeColumn?.includes(column?.id)}
                  onChange={(e: any): any => checkboxHandler?.(e, column)}
                />
                <Typography
                  variant="caption"
                  fontWeight={400}
                  color="slateBlue.main"
                >
                  {column?.header}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <Divider sx={{ marginY: 1 }}></Divider>
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
