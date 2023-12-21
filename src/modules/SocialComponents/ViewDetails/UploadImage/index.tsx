import React, { useCallback, useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { AttachFileIcon } from '@/assets/icons';
import Documents from '@/modules/SocialComponents/MyDocuments/Documents';
import Folders from '@/modules/SocialComponents/MyDocuments/Folders';
import useToggle from '@/hooks/useToggle';
import { styles } from './UploadImage.styles';
import CloseIcon from '@/assets/icons/shared/close-icon';
import IconButton from '@mui/material/IconButton';

export default function UploadImage({ name }: any) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const {
    setValue,
    getValues,
    formState: { errors },
  }: any = useFormContext();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: useCallback(
      (files: any) => {
        if (files && files?.length > 0) {
          setValue(name, files[0]);
        }
      },
      [setValue, name],
    ),
  });

  return (
    <>
      <Typography>Media</Typography>
      {!!getValues(name)?.name ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">
            {acceptedFiles?.[0]?.name || getValues(name)?.name}
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dotted #e0e0e0',
              backgroundColor: '#EBFAF8',
              padding: '30px',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
          >
            <AttachFileIcon />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            border: '2px dotted #e0e0e0',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />

          <Box>
            <AttachFileIcon />

            <Typography
              variant="body1"
              fontWeight={'bold'}
              sx={{ marginBottom: '30px', marginTop: '20px' }}
            >
              Drag files here
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginLeft: '10px',
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
                color: '#6B7280',
              }}
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              Upload from Library
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: '20px' }}
              {...getRootProps()}
            >
              Upload from Device
            </Button>
          </Box>
        </Box>
      )}
      {!!errors[name] && !!!getValues(name)?.name && (
        <Typography variant="body2" color="error">
          {errors[name]?.message}
        </Typography>
      )}

      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles?.parentBox}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsOpenModal(false)}
            sx={styles?.closeButton}
          >
            <CloseIcon />
          </IconButton>
          {isToggled ? (
            <Folders toggle={toggle} />
          ) : (
            <Documents toggle={toggle} />
          )}
        </Box>
      </Modal>
    </>
  );
}
