import { useTheme } from '@mui/material';

export const SalesReportIcon = () => {
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
        d="M17.91 10.7209H14.82V3.52087C14.82 1.84087 13.91 1.50087 12.8 2.76087L12 3.67087L5.23001 11.3709C4.30001 12.4209 4.69001 13.2809 6.09001 13.2809H9.18001V20.4809C9.18001 22.1609 10.09 22.5009 11.2 21.2409L12 20.3309L18.77 12.6309C19.7 11.5809 19.31 10.7209 17.91 10.7209Z"
        fill={theme?.palette?.primary?.main}
      />
    </svg>
  );
};

export default SalesReportIcon;
