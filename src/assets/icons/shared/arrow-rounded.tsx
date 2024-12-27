import { useTheme } from '@mui/material';

const ArrowRounded = () => {
  const theme = useTheme();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.82C22 4.17 19.83 2 16.19 2H7.82C4.18 2 2.01 4.17 2.01 7.81V16.19C2 19.83 4.17 22 7.81 22ZM7.94 12.83L11.47 9.3C11.62 9.15 11.81 9.08 12 9.08C12.19 9.08 12.38 9.15 12.53 9.3L16.06 12.83C16.35 13.12 16.35 13.6 16.06 13.89C15.77 14.18 15.29 14.18 15 13.89L12 10.89L9 13.89C8.71 14.18 8.23 14.18 7.94 13.89C7.65 13.6 7.65 13.13 7.94 12.83Z"
        fill={theme?.palette?.primary?.main}
      />
    </svg>
  );
};

export default ArrowRounded;
