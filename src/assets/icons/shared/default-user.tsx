import { useTheme } from '@mui/material';
import React from 'react';

const DefaultUserIcon = () => {
  const theme = useTheme();

  return (
    <svg
      width="35"
      height="36"
      viewBox="0 0 35 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="17.6668"
        cy="18.156"
        r="16.75"
        fill={theme?.palette?.custom?.light_blue_bg_two}
        stroke={theme?.palette?.custom?.light_blue_bg_three}
        strokeWidth="0.858974"
        strokeLinecap="square"
      />
      <path
        d="M17.781 17.3493C17.7094 17.3421 17.6235 17.3421 17.5448 17.3493C15.8412 17.292 14.4883 15.8962 14.4883 14.1782C14.4883 12.4245 15.9056 11 17.6665 11C19.4202 11 20.8447 12.4245 20.8447 14.1782C20.8375 15.8962 19.4846 17.292 17.781 17.3493Z"
        stroke={theme?.palette?.primary?.main}
        strokeWidth="1.07372"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M14.2023 19.9903C12.47 21.1499 12.47 23.0396 14.2023 24.1921C16.1708 25.5092 19.3991 25.5092 21.3676 24.1921C23.0998 23.0325 23.0998 21.1427 21.3676 19.9903C19.4062 18.6803 16.1779 18.6803 14.2023 19.9903Z"
        stroke={theme?.palette?.primary?.main}
        strokeWidth="1.07372"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DefaultUserIcon;
