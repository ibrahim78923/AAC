import React from 'react';
import { Box, useTheme } from '@mui/material';
import { styles } from './PreviewToggle.style';
import { IconContractView, IconContractPencil } from '@/assets/icons';

interface PreviewToggleProps {
  active: string;
  handleToggle: (view: string) => void;
}

export default function PreviewToggle({
  active,
  handleToggle,
}: PreviewToggleProps) {
  const theme = useTheme();
  return (
    <Box sx={styles?.previewToggle}>
      <Box
        sx={styles?.viewButton(theme, active === 'create')}
        onClick={() => handleToggle('create')}
      >
        <IconContractPencil />
        Create
      </Box>
      <Box
        sx={styles?.viewButton(theme, active === 'preview')}
        onClick={() => handleToggle('preview')}
      >
        <IconContractView />
        Preview
      </Box>
    </Box>
  );
}
