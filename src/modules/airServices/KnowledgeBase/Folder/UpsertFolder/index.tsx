import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  validationSchema,
  defaultValues,
  visibleToDataArray,
} from './UpsSertFolder.data';
import ConversationModel from '@/components/Model/CoversationModel';

export const UpSertFolder = ({ openDialog, setOpenDialog }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Create Folder Successfully!', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setOpenDialog(false);
    reset(defaultValues);
  };

  const closeModal = () => {
    setOpenDialog(false);
  };

  return (
    <ConversationModel
      open={openDialog}
      handleClose={closeModal}
      selectedItem="Create Folder"
    >
      <Box width={{ xs: '18rem', sm: '25rem', lg: '30rem' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" padding={'.2rem'}>
            Name
          </Typography>
          <TextField
            type="text"
            size="small"
            placeholder="Enter Folder Name"
            fullWidth
          />

          <Typography variant="body2" padding={'.6rem 0 .2rem'}>
            Description
          </Typography>
          <TextField
            multiline
            rows={3}
            type="text"
            size="small"
            placeholder="#example"
            fullWidth
          />

          <Typography variant="body2" padding={'.6rem 0 .2rem'}>
            Visible to
          </Typography>
          <TextField
            size="small"
            id="visible"
            select
            defaultValue="All"
            fullWidth
          >
            {visibleToDataArray.map((item) => (
              <MenuItem key={uuidv4()} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </TextField>

          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            paddingTop={'2rem'}
            gap={'1rem'}
          >
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onSubmit}>
              Create
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </ConversationModel>
  );
};
