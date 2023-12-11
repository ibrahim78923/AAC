import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { upsertDataArray } from './UpsertFolder.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useUpsertFolder } from './useUpsertFolder';
import { LoadingButton } from '@mui/lab';

export const UpsertFolder = (props: any) => {
  const { openDialog, setOpenDialog } = props;
  const { methods, handleSubmit, onSubmit } = useUpsertFolder(props);

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">Create Folder</Typography>
          <AlertModalCloseIcon
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {upsertDataArray?.map((item: any) => (
            <item.component {...item?.componentProps} key={uuidv4()}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
          ))}
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ height: '2rem' }}>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          marginBottom={'2rem'}
          gap={'1rem'}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" onClick={onSubmit}>
            Create
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
