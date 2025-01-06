import { useTheme } from '@mui/material';

const PlusRounded = () => {
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
        d="M5.125 9H14.125"
        stroke={theme.palette?.custom?.light}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 13.5V4.5"
        stroke={theme.palette?.custom?.light}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default PlusRounded;
