import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton, TextField } from '@mui/material';
import { styles } from './PdfAddText.style';
import { IconAddTextCopy, IconAddTextDelete } from '@/assets/icons';
import CustomLabel from '@/components/CustomLabel';
import { TextComponentI } from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';
import {
  deleteTextComponent,
  updateTextComponentContent,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';

interface PdfAddTextProps {
  data: TextComponentI;
}

function PdfAddText({ data }: PdfAddTextProps) {
  const dispatch = useDispatch();

  const handleDeleteText = useCallback(() => {
    dispatch(deleteTextComponent(data.id));
  }, [dispatch, data.id]);

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTextComponentContent({
          id: data.id,
          content: event.target.value,
        }),
      );
    },
    [dispatch, data.id],
  );

  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.addTextControls}>
        <IconButton>
          <IconAddTextCopy />
        </IconButton>
        <IconButton onClick={handleDeleteText}>
          <IconAddTextDelete />
        </IconButton>
      </Box>

      <Box>
        <CustomLabel label="Enter a text..." />
        <TextField
          onChange={handleChangeText}
          value={data?.content}
          multiline
          rows={2}
          fullWidth
          placeholder="Enter a text..."
        />
      </Box>
    </Box>
  );
}

export default memo(PdfAddText);
