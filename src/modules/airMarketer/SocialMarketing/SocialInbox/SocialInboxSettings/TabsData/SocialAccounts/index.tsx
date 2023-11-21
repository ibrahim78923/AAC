import { Box } from '@mui/material';
import React, { useState } from 'react';

import ViewAccount from './ViewAccounts';
import SocialCard from './SocialCard';

const SocialAccounts = () => {
  const [isShowCard, setIsShowCard] = useState(false);
  const handleShowCard = () => setIsShowCard(!isShowCard);
  return (
    <Box>
      {!isShowCard && <SocialCard handleShowCard={handleShowCard} />}
      {isShowCard && <ViewAccount handleShowCard={handleShowCard} />}
    </Box>
  );
};

export default SocialAccounts;
