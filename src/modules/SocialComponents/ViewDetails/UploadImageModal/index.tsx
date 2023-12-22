import Image from 'next/image';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
  useTheme,
} from '@mui/material';

import {
  AlertModalCloseIcon,
  DeleteIcon,
  ImagePreviewIcon,
  ImageUploadIcon,
} from '@/assets/icons';

import { useState } from 'react';
import { styles } from '../ViewDetails.style';

const UploadImageModal = ({ isUploadImageOpen, setIsUploadImageOpen }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const theme = useTheme();

  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e?.target?.result);
      };

      reader?.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={isUploadImageOpen}
      onClose={() => setIsUploadImageOpen(false)}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ marginBottom: '20px' }}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Box></Box>
          <Typography variant="h4">Upload Image</Typography>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsUploadImageOpen(false)}
          >
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ textAlign: 'center', paddingBottom: '15px !important' }}
      >
        <Box>
          <Box sx={styles.uploadImage(theme)}>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected"
                width={75}
                height={75}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <ImagePreviewIcon />
            )}
          </Box>
          <Typography variant="body3" sx={{ color: theme?.palette?.grey[900] }}>
            Drag & drop file here
            <br />
            or click to browse.
          </Typography>
          <Box sx={{ marginTop: '15px' }}>
            <Input
              accept="image/png, image/jpeg" // Specify accepted file types if needed
              style={styles?.inputStyle}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="contained-button-file"
              style={styles?.labelStyle(theme)}
            >
              <ImageUploadIcon />
              <br />
              Upload image (max 5)
            </label>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          '&.MuiDialogActions-root': {
            padding: '1.5rem !important',
            paddingTop: '0px !important',
          },
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setSelectedImage(null)}
          disabled={!selectedImage}
        >
          <DeleteIcon />
        </Button>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsUploadImageOpen(false)}
            sx={{
              marginRight: '15px',
              border: `1px solid ${theme?.palette?.grey[900]}`,
              color: theme?.palette?.custom?.main,
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsUploadImageOpen(false)}
            disabled={!selectedImage}
          >
            confirm
          </Button>
        </Box>
        <Box></Box>
      </DialogActions>
    </Dialog>
  );
};

export default UploadImageModal;
