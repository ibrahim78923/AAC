import React, { useRef } from 'react';
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import CommonDialog from '@/components/CommonDialog';
import { ENUM_SIGNATURE_TYPE } from '@/utils/contracts';
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
  isLoading?: boolean;
  signature: any;
  setSignature: (signature: string | null) => void;
}

export default function ModalSignAndSend({
  open,
  onClose,
  onSubmit,
  signatureType,
  handleChangeConfirmSigning,
  isConfirmSigning,
  isLoading,
  signature,
  setSignature,
}: ModalSignAndSendProps) {
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigCanvasRef.current?.clear();
    setSignature(null);
  };

  const handleSignatureEnd = () => {
    const sigData = sigCanvasRef.current?.getTrimmedCanvas().toDataURL();
    setSignature(sigData || null);
  };

  const title =
    signatureType === ENUM_SIGNATURE_TYPE?.CLICK
      ? 'Sign and send the document'
      : signatureType === ENUM_SIGNATURE_TYPE?.DRAW
        ? 'Draw your signature'
        : 'Sign and send the document';

  const isDrawType = signatureType === ENUM_SIGNATURE_TYPE.DRAW;
  const isSMSType = signatureType === ENUM_SIGNATURE_TYPE.SMS;
  const isClickType = signatureType === ENUM_SIGNATURE_TYPE.CLICK;
  const okDisabled = isDrawType
    ? signature == null || !isConfirmSigning
    : !isConfirmSigning;

  const handleClose = () => {
    clearSignature();
    onClose();
  };

  return (
    <CommonDialog
      title={title}
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
      okText={'Sign & Send'}
      okDisabled={okDisabled}
      cancelText="Cancel"
      width="648px"
      closeIcon={true}
      isLoading={isLoading}
    >
      {isSMSType && (
        <Typography variant="body1">
          The document will be signed by you and sent to the subsequent signee
          (if any). By signing this document, you agree to its terms and
          understand that i will be legally binding.
        </Typography>
      )}

      {isClickType && (
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
      {isDrawType && (
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
