import React from 'react';
import { RHFDropzonePreviewAllTypes } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { IconExportFeatured } from '@/assets/icons';
import { styles } from './ContractLogo.style';

export default function ContractLogo() {
  return (
    <Box sx={styles?.root}>
      <RHFDropzonePreviewAllTypes
        label="Logo"
        name="contractLogo"
        fileName=""
        fileType="SVG, PNG, JPG or GIF (max. 800x400px)"
        accept={{
          'image/png': ['.png', '.PNG'],
          'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        }}
        icon={<IconExportFeatured />}
      />
    </Box>
  );
}
