import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CommonDialog from '@/components/CommonDialog';
import { MenuItem } from '@mui/material';
import CustomLabel from '@/components/CustomLabel';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  setValue: any;
  value: string;
  okDisabled?: boolean;
}

export default function ModalTemplateCategories({
  open,
  onClose,
  onSubmit,
  okDisabled,
  setValue,
  value,
}: ModalProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <CommonDialog
      title={'Save as Template'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Confirm'}
      okDisabled={okDisabled}
      cancelText="Cancel"
      width="420px"
    >
      <CustomLabel label="Template Categories" />
      <Select
        value={value}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Select Template category"
        displayEmpty
      >
        <MenuItem disabled value={''}>
          Select Template category
        </MenuItem>
        <MenuItem value={'MY_TEMPLATES'}>My Templates</MenuItem>
        <MenuItem value={'AACC_TEMPLATES'}>AAC Templates</MenuItem>
        <MenuItem value={'HR'}>HR</MenuItem>
        <MenuItem value={'CAPROATE'}>Caproate</MenuItem>
        <MenuItem value={'PRIVATE'}>Private</MenuItem>
        <MenuItem value={'RENTAL'}>Rental</MenuItem>
        <MenuItem value={'STARTUP'}>Startup</MenuItem>
        <MenuItem value={'SALES'}>Sales</MenuItem>
      </Select>
    </CommonDialog>
  );
}
