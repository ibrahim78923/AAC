import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CommonModal from '@/components/CommonModal';

import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { validationSchema, defaultValues } from './UpsertFolder.data';

export const UpsertFolder = () => {
  const [handleOpen, setHandleOpen] = useState(true);
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Create Successfully!', {
      variant: 'success',
    });
    setHandleOpen(false);
    reset(defaultValues);
  };

  return (
    <CommonModal
      open={handleOpen}
      handleClose={() => setHandleOpen(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={'Create new folder'}
      okText={'Create Folder'}
      footerFill={undefined}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        key={uuidv4()}
      >
        <Typography variant="body2" padding={'.2rem'}>
          Name
        </Typography>
        <TextField
          type="text"
          size="small"
          placeholder="Enter Folder Name"
          fullWidth
        />
        <Typography variant="body2" padding={'.2rem'}>
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

        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button variant="outlined" onClick={() => setHandleOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">Create</Button>
        </Box>
      </FormProvider>
    </CommonModal>
  );
};
