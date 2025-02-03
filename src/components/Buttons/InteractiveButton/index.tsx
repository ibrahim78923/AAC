import { Button } from '@mui/material';

export const InteractiveButton = (props: any) => {
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
