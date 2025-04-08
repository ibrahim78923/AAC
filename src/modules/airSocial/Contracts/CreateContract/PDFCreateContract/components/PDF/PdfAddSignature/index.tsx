import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styles } from './PdfAddText.style';
import { IconAddTextCopy, IconAddTextDelete } from '@/assets/icons';
import CustomLabel from '@/components/CustomLabel';
import { signatureFieldI } from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';
import { useDispatch } from 'react-redux';
import { deleteSignatureComponent } from '@/redux/slices/airSocial/contracts/pdf-contract/slice';

interface PdfAddSignProps {
  data: signatureFieldI;
}

export default function PdfAddSignature({ data }: PdfAddSignProps) {
  const dispatch = useDispatch();

  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.addTextControls}>
        <IconButton>
          <IconAddTextCopy />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteSignatureComponent(data.id))}>
          <IconAddTextDelete />
        </IconButton>
      </Box>

      <Box>
        <CustomLabel label={data?.name} />
        <Box sx={styles?.signatureBox}></Box>
      </Box>
    </Box>
  );
}
