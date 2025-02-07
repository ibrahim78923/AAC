import { IconButton } from '@mui/material';
import { CustomIconButtonPropsI } from '../Buttons.interface';

export const CustomIconButton = (props: CustomIconButtonPropsI) => {
  const {
    onClick,
    children,
    disabled,
    type = 'submit',
    size = 'small',
    customStyles,
    color,
  } = props;

  return (
    <IconButton
      disabled={disabled}
      color={color}
      sx={customStyles}
      onClick={onClick}
      type={type}
      size={size}
    >
      {children}
    </IconButton>
  );
};
