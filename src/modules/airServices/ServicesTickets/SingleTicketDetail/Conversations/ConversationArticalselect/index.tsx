import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  Box,
  IconButton,
} from '@mui/material';

import ConversationTextLabel from '../ConversationTextLabel';
import { CloseDrawerIcon, PlusSharedIconColor } from '@/assets/icons';
import ConversationAddArtical from '../ConversationAddArtical';
import ConversationCannedResponse from '../ConversationCannedResponse';

export default function ConversationArticalselect({
  name,
  required,
  // openModal,
  ...other
}: any) {
  const { control } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalOnClick = () => {
    setIsModalOpen(true);
  };

  const componentMapping = {
    conversationartical: {
      component: <ConversationAddArtical />,
      title: 'Add Article',
    },
    response: {
      component: <ConversationCannedResponse />,
      title: 'Add Response',
    },
  };

  const selectedComponent = componentMapping[name];

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {other?.label && (
              <ConversationTextLabel
                label={other?.label}
                error={error}
                required={required}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <TextField
                {...field}
                fullWidth
                error={!!error}
                helperText={
                  <Typography
                    component={'span'}
                    sx={{ display: 'block', mt: -1, ml: -1 }}
                  >
                    {error?.message}
                  </Typography>
                }
                FormHelperTextProps={{
                  classes: {
                    root: '',
                    color: 'green',
                  },
                }}
                {...other}
                label=""
              />
              <Box
                sx={{ cursor: 'pointer', position: 'absolute', right: 10 }}
                onClick={openModalOnClick}
              >
                <PlusSharedIconColor color={'#6B7280'} />
              </Box>
            </Box>
          </>
        )}
      />

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <CloseDrawerIcon />
        </IconButton>
        <DialogTitle fontSize={'24px'} color={'#374151'}>
          {selectedComponent.title}
        </DialogTitle>

        {selectedComponent.component}
      </Dialog>
    </Box>
  );
}
