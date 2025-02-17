import { IconButton } from '@mui/material';
import { CustomIconButtonPropsI } from '../Buttons.interface';

export const CustomIconButton = (props: CustomIconButtonPropsI) => {
  const {
    onClick,
    children,
    disabled,
    type = 'button',
    size = 'small',
    customStyles,
    color,
    iconName,
  } = props;

  return (
    <IconButton
      disabled={disabled}
      color={color}
      sx={customStyles}
      onClick={onClick}
      type={type}
      size={size}
      aria-label={iconName}
    >
      {children}
    </IconButton>
  );
};
