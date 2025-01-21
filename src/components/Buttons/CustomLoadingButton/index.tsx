import { LoadingButton } from '@mui/lab';

export const CustomLoadingButton = (props: any) => {
  const {
    variant = 'contained',
    type = 'submit',
    loading = false,
    disabled = false,
    onClick,
    name,
    customStyles,
  } = props;

  return (
    <LoadingButton
      className="small"
      variant={variant}
      type={type}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      sx={{ ...customStyles }}
    >
      {name}
    </LoadingButton>
  );
};
