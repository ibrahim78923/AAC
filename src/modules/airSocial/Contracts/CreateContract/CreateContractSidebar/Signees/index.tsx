import React, { useState } from 'react';
import { Avatar, Box, Button, Switch } from '@mui/material';
import { IconPlusAddContractsFields } from '@/assets/icons';
import { styles } from './Signees.style';
import { AvatarImage } from '@/assets/images';

export default function Signees() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={styles?.signeePanel}>
      <Box>
        <Button
          // onClick={handleClick}
          variant="outlined"
          className="small"
          color="inherit"
          startIcon={<IconPlusAddContractsFields />}
          fullWidth
        >
          Add Signee
        </Button>
      </Box>
      <Box sx={styles?.signingOrder}>
        <Box sx={styles?.signingOrderTitle}>Signing order</Box>
        <Switch checked={checked} onChange={handleChange} />
      </Box>
      <Box sx={styles?.signeesList}>
        <Box sx={styles?.signeeDetails}>
          <Avatar src={AvatarImage?.src} sx={styles?.signeeAvatar}>
            {'JD'}
          </Avatar>
          <Box sx={styles?.signeeInfo}>
            <Box sx={styles?.signeeName}>John Doe</Box>
            <Box sx={styles?.signeeMeta}>Marketicon LTD.</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
