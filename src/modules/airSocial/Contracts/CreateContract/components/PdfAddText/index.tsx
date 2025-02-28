import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { styles } from './PdfAddText.style';
import { IconAddTextCopy, IconAddTextDelete } from '@/assets/icons';
import CustomLabel from '@/components/CustomLabel';
import { TextComponentI } from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';

interface PdfAddTextProps {
  data: TextComponentI;
  handleDeleteText: (id: string) => void;
}

export default function PdfAddText({
  data,
  handleDeleteText,
}: PdfAddTextProps) {
  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.addTextControls}>
        <IconButton>
          <IconAddTextCopy />
        </IconButton>
        <IconButton onClick={() => handleDeleteText(data?.id)}>
          <IconAddTextDelete />
        </IconButton>
      </Box>

      <Box>
        <CustomLabel label="Enter a text..." />
        <TextField multiline rows={2} fullWidth placeholder="Enter a text..." />
      </Box>
    </Box>
  );
}
