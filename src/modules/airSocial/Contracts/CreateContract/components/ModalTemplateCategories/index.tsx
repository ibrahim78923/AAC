import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CommonDialog from '@/components/CommonDialog';
import { MenuItem } from '@mui/material';
import CustomLabel from '@/components/CustomLabel';
import { ENUM_TEMPLATE_CATEGORIES } from '@/utils/contracts';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  setValue: any;
  value: string;
  okDisabled?: boolean;
  isLoading?: boolean;
}

export default function ModalTemplateCategories({
  open,
  onClose,
  onSubmit,
  okDisabled,
  setValue,
  value,
  isLoading,
}: ModalProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const TEMP_CATEGORIES = [
    // { value: ENUM_TEMPLATE_CATEGORIES?.MY_TEMPLATES, label: 'My Templates' },
    { value: ENUM_TEMPLATE_CATEGORIES?.AAC_TEMPLATES, label: 'AAC Templates' },
    { value: ENUM_TEMPLATE_CATEGORIES?.HR, label: 'HR' },
    { value: ENUM_TEMPLATE_CATEGORIES?.CORPORATE, label: 'Corporate' },
    { value: ENUM_TEMPLATE_CATEGORIES?.PRIVATE, label: 'Private' },
    { value: ENUM_TEMPLATE_CATEGORIES?.RENTAL, label: 'Rental' },
    { value: ENUM_TEMPLATE_CATEGORIES?.STARTUP, label: 'Startup' },
    { value: ENUM_TEMPLATE_CATEGORIES?.SALES, label: 'Sales' },
  ];

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
      isLoading={isLoading}
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
        {TEMP_CATEGORIES?.map((category) => (
          <MenuItem key={category?.value} value={category?.value}>
            {category?.label}
          </MenuItem>
        ))}
      </Select>
    </CommonDialog>
  );
}
