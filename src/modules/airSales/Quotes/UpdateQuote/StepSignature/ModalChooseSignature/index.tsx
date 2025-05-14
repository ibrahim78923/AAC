import React, { useState } from 'react';
import CommonDialog from '@/components/CommonDialog';
import {
  Box,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CardSignature from './CardSignature';
import { useRouter } from 'next/router';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { ENUM_CONTRACT_TYPE } from '@/utils/contracts';
import CustomLabel from '@/components/CustomLabel';
import { errorSnackbar } from '@/lib/snackbar';
import { generatePdfFileObject } from '@/lib/html-to-pdf-file-object';
import { useDispatch } from 'react-redux';
import { setTemplatePDF } from '@/redux/slices/airSales/Quotes/quotesSlice';

interface ModalChooseSignatureProps {
  open: boolean;
  onClose: () => void;
  foldersData: any;
  pdfRef: React.RefObject<HTMLElement>;
}
export default function ModalChooseSignature({
  open,
  onClose,
  foldersData,
  pdfRef,
}: ModalChooseSignatureProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedSignatureMethod, setSelectedSignatureMethod] =
    useState('drawSign');
  const [folderId, setFolderId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async () => {
    if (!folderId) {
      setError('Field is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    const pdfBlob = await generatePdfFileObject(
      pdfRef,
      'quote-template.pdf',
      40,
    );
    if (!pdfBlob) {
      errorSnackbar('Failed to generate PDF');
      setIsLoading(false);
      return;
    }

    dispatch(setTemplatePDF(pdfBlob));

    if (selectedSignatureMethod === 'drawSign') {
      router?.push({
        pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
        query: {
          contractType: ENUM_CONTRACT_TYPE?.PDF,
          folderId: folderId,
          quoteId: router?.query?.data,
        },
      });
      setIsLoading(false);
      onClose();
    }
    if (selectedSignatureMethod === 'otherSign') {
      router?.push({
        pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
        query: {
          folderId: folderId,
          quoteId: router?.query?.data,
        },
      });
      setIsLoading(false);
      onClose();
    }
  };

  const handleClose = () => {
    setFolderId('');
    setError(null);
    onClose();
  };

  const handleSelectChange = (e: any) => {
    setFolderId(e.target.value);
    if (error && e.target.value) {
      setError(null);
    }
  };

  return (
    <CommonDialog
      title={
        <Box>
          <Box>Sign a PDF</Box>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', lineHeight: '1.25', mt: '4px' }}
          >
            Choose Signature method
          </Typography>
        </Box>
      }
      open={open}
      onClose={handleClose}
      width="1062px"
      okText="Continue"
      cancelText="Cancel"
      onSubmit={handleOnSubmit}
      isLoading={isLoading}
    >
      <Grid container spacing={'24px'} sx={{ mb: '24px' }}>
        <Grid item xs={12} md={6}>
          <CustomLabel label={'Select Folder'} required={true} />
          <Select
            fullWidth
            value={folderId}
            onChange={handleSelectChange}
            size="small"
            displayEmpty
            error={!!error}
          >
            <MenuItem value="" disabled sx={{ fontStyle: 'italic' }}>
              Select option
            </MenuItem>
            {foldersData?.data?.map((folder: any) => (
              <MenuItem key={folder?._id} value={folder?._id}>
                {folder?.name}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText error sx={{ ml: 0, mt: '1px' }}>
              {error}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <CardSignature
        value={selectedSignatureMethod}
        onChange={(value) => setSelectedSignatureMethod(value)}
      />
    </CommonDialog>
  );
}
