import { LoadingButton } from '@mui/lab';
import { CustomLoadingButtonPropsI } from '../Buttons.interface';

export const CustomLoadingButton = (props: CustomLoadingButtonPropsI) => {
  const {
    variant = 'contained',
    type = 'submit',
    loading = false,
    disabled = false,
    onClick,
    name,
    customStyles,
    className = 'small',
  } = props;

  return (
    <LoadingButton
      className={className}
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
