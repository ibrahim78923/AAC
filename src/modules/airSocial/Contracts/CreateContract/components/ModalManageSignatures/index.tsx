import React from 'react';
import CommonModal from '@/components/CommonModal';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { SIGNATURE_METHODS } from '../../CreateContract.data';

interface ModalManageSignaturesProps {
  open: boolean;
  onClose: () => void;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  selectedSigneeId?: string | null;
}

export default function ModalManageSignatures({
  open,
  onClose,
  value,
  handleChange,
  selectedSigneeId,
}: ModalManageSignaturesProps) {
  return (
    <CommonModal
      open={open}
      handleClose={onClose}
      handleCancel={onClose}
      handleSubmit={onClose}
      title={'Manage Signatures'}
      okText={'Save Changes'}
      footer={true}
    >
      <FormControl>
        <FormLabel
          id="signature-method"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.57142857',
          }}
        >
          Select method
        </FormLabel>
        <RadioGroup
          aria-labelledby="signature-method"
          name="signatureMethod"
          value={value}
          onChange={(event) => {
            // const selectedValue = event.target.value;
            handleChange(event, selectedSigneeId || '');
          }}
          sx={{
            pl: '12px',
          }}
        >
          {SIGNATURE_METHODS?.map((method: any) => (
            <FormControlLabel
              key={method?.value}
              value={method?.value}
              control={<Radio />}
              label={method?.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </CommonModal>
  );
}
