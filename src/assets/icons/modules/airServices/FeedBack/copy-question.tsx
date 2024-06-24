import { useTheme } from '@mui/material';

const CopyQuestionIcon = () => {
  const { palette } = useTheme();
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 16.125V21.375C20 25.75 18.25 27.5 13.875 27.5H8.625C4.25 27.5 2.5 25.75 2.5 21.375V16.125C2.5 11.75 4.25 10 8.625 10H13.875C18.25 10 20 11.75 20 16.125Z"
        fill={palette?.custom?.main}
      />
      <path
        d="M21.3752 2.5H16.1252C12.1749 2.5 10.3748 3.9369 10.0618 7.42556C10.012 7.98025 10.4677 8.4375 11.0246 8.4375H13.8752C19.1252 8.4375 21.5627 10.875 21.5627 16.125V18.9756C21.5627 19.5325 22.0199 19.9882 22.5746 19.9384C26.0633 19.6254 27.5002 17.8253 27.5002 13.875V8.625C27.5002 4.25 25.7502 2.5 21.3752 2.5Z"
        fill={palette?.custom?.main}
      />
    </svg>
  );
};

export default CopyQuestionIcon;
