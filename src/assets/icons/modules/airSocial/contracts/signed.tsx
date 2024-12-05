import { useTheme } from '@mui/material';

const SignedIcon = ({ color }: any) => {
  const theme = useTheme();
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7.16927V5.83594C4 3.62927 4.66667 1.83594 8 1.83594C11.3333 1.83594 12 3.62927 12 5.83594V7.16927"
        stroke={color ?? theme?.palette?.primary?.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.334 15.1641H4.66732C2.00065 15.1641 1.33398 14.4974 1.33398 11.8307V10.4974C1.33398 7.83073 2.00065 7.16406 4.66732 7.16406H11.334C14.0007 7.16406 14.6673 7.83073 14.6673 10.4974V11.8307C14.6673 14.4974 14.0007 15.1641 11.334 15.1641Z"
        stroke={color ?? theme?.palette?.primary?.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6637 11.1693H10.6696"
        stroke={color ?? theme?.palette?.primary?.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99764 11.1693H8.00363"
        stroke={color ?? theme?.palette?.primary?.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.32967 11.1693H5.33566"
        stroke={color ?? theme?.palette?.primary?.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SignedIcon;
