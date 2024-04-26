import { useTheme } from '@mui/material';

const Play = () => {
  const theme = useTheme();
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.99 10.17L6.1 17.34C5.4 17.76 4.5 17.26 4.5 16.44V8.43996C4.5 4.94996 8.27 2.76996 11.3 4.50996L15.89 7.14996L17.98 8.34996C18.67 8.75996 18.68 9.75996 17.99 10.17Z"
        fill={theme?.palette?.primary?.main}
      />
      <path
        d="M18.5908 16.0309L14.5408 18.3709L10.5008 20.7009C9.05079 21.5309 7.41079 21.3609 6.22079 20.5209C5.64079 20.1209 5.71079 19.2309 6.32079 18.8709L19.0308 11.2509C19.6308 10.8909 20.4208 11.2309 20.5308 11.9209C20.7808 13.4709 20.1408 15.1409 18.5908 16.0309Z"
        fill={theme?.palette?.primary?.main}
      />
    </svg>
  );
};
export default Play;
