import { Box, Button } from '@mui/material';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
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
    defaultValues: defaultValues,
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
          <RHFTextField
            name={'name'}
            label={'Name'}
            placeholder={'Enter Folder Name'}
            type={'text'}
            size={'small'}
          />

          <RHFTextField
            multiline
            rows={3}
            name={'description'}
            label={'Description'}
            placeholder={'#example'}
            type={'text'}
            size={'small'}
          />

          <RHFSelect
            name={'visible'}
            label={'Visible to'}
            placeholder={'Enter Folder Name'}
            type={'text'}
            size={'small'}
          >
            {visibleToDataArray.map((item) => (
              <option key={uuidv4()} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </RHFSelect>

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
