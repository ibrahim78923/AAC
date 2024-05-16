import { useTheme } from '@mui/material';

export const ViewIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2.66666C4.57941 2.66666 1.6002 4.81505 0 8.00005C1.6002 11.1856 4.57941 13.3335 8 13.3335C11.4206 13.3335 14.3998 11.1856 16 8.00005C14.3998 4.81505 11.4206 2.66666 8 2.66666ZM8 11.3335C6.15879 11.3335 4.6666 9.84127 4.6666 8.00005C4.6666 6.15884 6.15879 4.66666 8 4.66666C9.84121 4.66666 11.3334 6.15884 11.3334 8.00005C11.3334 9.84127 9.84121 11.3335 8 11.3335Z"
        fill={theme?.palette?.custom?.mulled_wine}
      />
      <path
        d="M8 9.99994C9.10457 9.99994 10 9.10451 10 7.99994C10 6.89537 9.10457 5.99994 8 5.99994C6.89543 5.99994 6 6.89537 6 7.99994C6 9.10451 6.89543 9.99994 8 9.99994Z"
        fill={theme?.palette?.custom?.mulled_wine}
      />
    </svg>
  );
};

export default ViewIcon;
