import { useTheme } from '@mui/material';
import React from 'react';

const LeftArrow = () => {
  const theme = useTheme();
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 9L17.5 9M17.5 9L9.5 0.999999M17.5 9L9.5 17"
        stroke={theme?.palette?.primary?.main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftArrow;
