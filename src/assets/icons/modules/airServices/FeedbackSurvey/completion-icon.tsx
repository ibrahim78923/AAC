import { useTheme } from '@mui/material';

export const CompletionIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_24_17349)">
        <path
          d="M16 6.54787V13.1765C16 14.7359 14.7359 16 13.1765 16H2.82353C1.26412 16 0 14.7359 0 13.1765V2.82353C0 1.26412 1.26412 0 2.82353 0H13.1765C14.462 0 15.5468 0.859094 15.8883 2.03447L9.17647 8.74625L6.68569 6.25547C6.50191 6.07169 6.20397 6.07169 6.02019 6.25547L4.37313 7.90253C4.18934 8.08631 4.18934 8.38428 4.37313 8.56803L8.84372 13.0386C9.0275 13.2224 9.32544 13.2224 9.50922 13.0386L16 6.54787Z"
          fill={theme?.palette?.custom?.mulled_wine}
        />
      </g>
      <defs>
        <clipPath id="clip0_24_17349">
          <rect width="16" height="16" fill="common.white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default CompletionIcon;
