import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, ListItemText } from '@mui/material';
import Image from 'next/image';
import { SettingQuickImage } from '@/assets/images';

const LinkCheckbox = ({ label, name, isActive }: any) => {
  const [isChecked, setIsChecked] = useState(isActive);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event?.target?.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={handleChange} name={name} />
      }
      label={
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Image src={SettingQuickImage} alt="logo" />
          <ListItemText
            primary={label}
            primaryTypographyProps={{ variant: 'body2' }}
            sx={{ color: (theme) => theme?.palette?.grey[600] }}
          />
        </Box>
      }
    />
  );
};

export default LinkCheckbox;
