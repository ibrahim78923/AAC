import React, { useState } from 'react';

import { Box } from '@mui/material';

const useViewDetails = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTabPanel = ({ value, index, content }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && <Box p={3}>{content}</Box>}
      </div>
    );
  };

  return {
    value,
    handleTabChange,
    CustomTabPanel,
  };
};

export default useViewDetails;
