import { Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import ViewAccount from './ViewAccounts';
import SocialCard from './SocialCard';

const SocialAccounts = () => {
  const theme = useTheme();
  const [isShowCard, setIsShowCard] = useState(false);
  const handleShowCard = () => setIsShowCard(!isShowCard);
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        padding: '1rem',
        boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}`,
        borderRadius: '8px',
      }}
    >
      {!isShowCard && <SocialCard handleShowCard={handleShowCard} />}
      {isShowCard && <ViewAccount handleShowCard={handleShowCard} />}
    </Box>
  );
};

export default SocialAccounts;
