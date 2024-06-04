import React from 'react';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
import { transferTypeDropDown } from './CallTransferToUser.data';

const CallTransferToUser = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="grey.700"
      pb={1}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={1.4}>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%' }}>
          <Image src={AvatarImage} alt="Avatar" width={40} height={40} />
        </Box>
        <Typography variant="body3" color="custom.light" fontWeight={500}>
          Olivia Rhye
        </Typography>
      </Box>
      <SingleDropdownButton
        dropdownOptions={transferTypeDropDown()}
        dropdownName={
          <MoreVert
            sx={{
              color: theme?.palette?.custom?.steel_blue_alpha,
              fontSize: 20,
            }}
          />
        }
        hasEndIcon={false}
        btnVariant="text"
      />
    </Box>
  );
};

export default CallTransferToUser;
