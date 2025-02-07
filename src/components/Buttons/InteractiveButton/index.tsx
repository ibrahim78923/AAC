import { Button } from '@mui/material';
import { InteractiveButtonPropsI } from '../Buttons.interface';

export const InteractiveButton = (props: InteractiveButtonPropsI) => {
  const {
    onClick,
    customStyles,
    color = 'primary',
    variant = 'contained',
    children,
  } = props;

  return (
    <Button
      className="small"
      color={color}
      variant={variant}
      onClick={onClick}
      sx={customStyles}
    >
      {children}
    </Button>
  );
};
