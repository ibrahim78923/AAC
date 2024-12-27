import { useTheme } from '@mui/material';

const Connect = () => {
  const theme = useTheme();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_20558_338316)">
        <path
          d="M11.3359 8.0004H9.43594C8.4657 7.98702 7.52122 8.31269 6.76542 8.92122C6.00962 9.52975 5.48991 10.383 5.29594 11.3337H1.33594V12.6671H5.28927C5.47984 13.6207 5.99956 14.4771 6.75755 15.0864C7.51554 15.6957 8.46359 16.0192 9.43594 16.0004H11.3359V8.0004Z"
          fill={theme?.palette?.primary?.main}
        />
        <path
          d="M18.8174 11.3339C18.623 10.3809 18.1013 9.52592 17.3428 8.91712C16.5842 8.30833 15.6366 7.98409 14.6641 8.0006H12.6641V16.0006H14.6641C15.6364 16.0195 16.5845 15.6959 17.3425 15.0866C18.1004 14.4773 18.6202 13.6209 18.8107 12.6673H22.6641V11.3339H18.8174Z"
          fill={theme?.palette?.primary?.main}
        />
      </g>
      <defs>
        <clipPath id="clip0_20558_338316">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Connect;
