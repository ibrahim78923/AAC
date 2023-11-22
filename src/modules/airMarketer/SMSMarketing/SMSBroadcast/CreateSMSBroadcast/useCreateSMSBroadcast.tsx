import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const useCreateSMSBroadcast = () => {
  const theme = useTheme<Theme>();
  const [isAddRecipients, setIsAddRecipients] = useState(false);

  return {
    theme,
    isAddRecipients,
    setIsAddRecipients,
  };
};

export default useCreateSMSBroadcast;
