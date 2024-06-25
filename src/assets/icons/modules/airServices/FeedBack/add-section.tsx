import { useTheme } from '@mui/material';

const AddSectionIcon = () => {
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
        d="M24.875 16.875H5.125C3.25 16.875 2.5 17.675 2.5 19.6625V24.7125C2.5 26.7 3.25 27.5 5.125 27.5H24.875C26.75 27.5 27.5 26.7 27.5 24.7125V19.6625C27.5 17.675 26.75 16.875 24.875 16.875Z"
        fill={palette?.custom?.steel_blue_alpha}
      />
      <path
        d="M24.875 2.5H5.125C3.25 2.5 2.5 3.3 2.5 5.2875V10.3375C2.5 12.325 3.25 13.125 5.125 13.125H24.875C26.75 13.125 27.5 12.325 27.5 10.3375V5.2875C27.5 3.3 26.75 2.5 24.875 2.5Z"
        fill={palette?.custom?.steel_blue_alpha}
      />
    </svg>
  );
};

export default AddSectionIcon;
