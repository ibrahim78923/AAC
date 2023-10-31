import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertValidationSchema,
  upsertDefaultValues,
  upsertDataArray,
} from './UpsertFolder.data';
import CloseIcon from '@/assets/icons/shared/AlertModels/close-icon';

export const UpsertFolder = ({ openDialog, setOpenDialog }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(upsertValidationSchema),
    defaultValues: upsertDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Create Folder Successfully!', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setOpenDialog(false);
    reset(upsertDefaultValues);
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">Create Folder</Typography>
          <CloseIcon
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {upsertDataArray?.map((item: any) => (
            <item.component {...item?.componentProps} key={uuidv4()}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={option?.value} value={option?.value}>
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
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
