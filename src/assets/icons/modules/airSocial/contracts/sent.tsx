import { useTheme } from '@mui/material';

const SentIcon = () => {
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
        d="M11.627 10.2493L13.3336 8.5426L11.627 6.83594"
        stroke={theme?.palette?.primary?.main ?? '#38CAB5'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50586 8.53906H13.2859"
        stroke={theme?.palette?.primary?.main ?? '#38CAB5'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.83919 13.8307C4.89253 13.8307 2.50586 11.8307 2.50586 8.4974C2.50586 5.16406 4.89253 3.16406 7.83919 3.16406"
        stroke={theme?.palette?.primary?.main ?? '#38CAB5'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SentIcon;
