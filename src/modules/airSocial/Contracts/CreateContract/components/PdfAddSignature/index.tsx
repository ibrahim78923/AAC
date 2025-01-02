import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { styles } from './PdfAddText.style';
import { IconAddTextCopy, IconAddTextDelete } from '@/assets/icons';
import CustomLabel from '@/components/CustomLabel';
import { signatureFieldI } from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';


interface PdfAddSignProps {
  data: signatureFieldI;
  onClickDelete: (id: string) => void;
}

export default function PdfAddSignature({ data, onClickDelete }: PdfAddSignProps) {
  return (
    <Box
      key={data?.id}
      style={{ right: `${data?.x}px`, top: `${data?.y}px` }}
      sx={styles?.container}
    >
      <Box sx={styles?.addTextControls}>
        <IconButton>
          <IconAddTextCopy />
        </IconButton>
        <IconButton onClick={() => onClickDelete(data?.id)}>
          <IconAddTextDelete />
        </IconButton>
      </Box>

      <Box>
        <CustomLabel label={data?.name} />
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder='Enter a text...'
        />
      </Box>
    </Box>
  )
}
