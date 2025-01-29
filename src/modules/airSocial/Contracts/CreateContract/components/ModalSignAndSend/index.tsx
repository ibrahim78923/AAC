import React, { useRef, useState } from 'react';
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import CommonDialog from '@/components/CommonDialog';
import { ENUM_SIGNATURE_TYPE } from '../../CreateContract.data';
import { styles } from './ModalSignAndSend.style';
import { IconTrashContracts } from '@/assets/icons';

type SignatureType =
  (typeof ENUM_SIGNATURE_TYPE)[keyof typeof ENUM_SIGNATURE_TYPE];
interface ModalSignAndSendProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  signatureType?: SignatureType;
  handleChangeConfirmSigning: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  isConfirmSigning: boolean;
}

export default function ModalSignAndSend({
  open,
  onClose,
  onSubmit,
  signatureType,
  handleChangeConfirmSigning,
  isConfirmSigning,
}: ModalSignAndSendProps) {
  const [, setSignature] = useState<string | null>(null);
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigCanvasRef.current?.clear();
    setSignature(null);
  };

  const handleSignatureEnd = () => {
    const sigData = sigCanvasRef.current?.toDataURL();
    setSignature(sigData || null);
  };

  const title =
    signatureType === ENUM_SIGNATURE_TYPE?.CLICK
      ? 'Sign and send the document'
      : signatureType === ENUM_SIGNATURE_TYPE?.DRAW
        ? 'Draw your signature'
        : '';

  return (
    <CommonDialog
      title={title === '' ? undefined : title}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Sign & Send'}
      okDisabled={title === '' ? false : !isConfirmSigning}
      cancelText="Cancel"
      width="648px"
      closeIcon={title === '' ? false : true}
    >
      {signatureType === ENUM_SIGNATURE_TYPE?.SMS && (
        <Typography variant="body1">
          The document will be signed by you and sent to the subsequent signee
          (if any). By signing this document, you agree to its terms and
          understand that i will be legally binding.
        </Typography>
      )}

      {signatureType === ENUM_SIGNATURE_TYPE?.CLICK && (
        <Box>
          <Typography variant="body1">
            The document will be signed by you and sent to the subsequent signee
            (if any)
          </Typography>
          <Box sx={{ mt: '24px' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isConfirmSigning}
                  onChange={handleChangeConfirmSigning}
                />
              }
              label="By signing this document, you agree to its term and understand that i will be legally binding."
            />
          </Box>
        </Box>
      )}
      {signatureType === ENUM_SIGNATURE_TYPE?.DRAW && (
        <>
          <Typography variant="body1">
            The document will be signed by you and sent to the subsequent
            signee. Collaborators will keep access to the document.
          </Typography>

          <Box sx={styles?.drawSignWrap}>
            <Box sx={styles?.signCanvasCard}>
              <Box sx={styles?.signCanvasBody}>
                <SignatureCanvas
                  ref={sigCanvasRef}
                  penColor="black"
                  canvasProps={{
                    width: 560,
                    height: 190,
                    className: 'sigCanvas',
                  }}
                  onEnd={handleSignatureEnd}
                />

                <IconButton onClick={clearSignature} sx={styles?.clearButton}>
                  <IconTrashContracts />
                </IconButton>
              </Box>
              <Box sx={styles?.signCanvasStripe} />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={isConfirmSigning}
                  onChange={handleChangeConfirmSigning}
                />
              }
              label="By signing this document, you agree to its term and understand that i will be legally binding."
            />
          </Box>
        </>
      )}
    </CommonDialog>
  );
}
