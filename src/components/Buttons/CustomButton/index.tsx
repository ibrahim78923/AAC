import { Button } from '@mui/material';
import {
  CustomizeSharedIcon,
  FilterSharedIcon,
  RestoreIcon,
} from '@/assets/icons';
import { CUSTOM_BUTTON_TYPES } from '@/constants/mui-constant';
import { CustomButtonPropsI } from '../Buttons.interface';

const mappedIcon: any = {
  filter: <FilterSharedIcon />,
  restore: <RestoreIcon />,
  customize: <CustomizeSharedIcon />,
};

export const CustomButton = (props: CustomButtonPropsI) => {
  const {
    children,
    onClick,
    iconType = CUSTOM_BUTTON_TYPES?.FILTER,
    variant = 'outlined',
    color = 'secondary',
    hasIcon = true,
    disabled = false,
    className = 'small',
    fullWidth = false,
    customStyles,
  } = props;

  const MapIcon = hasIcon && mappedIcon?.[iconType];

  return (
    <Button
      disableElevation
      variant={variant}
      color={color}
      startIcon={MapIcon}
      onClick={onClick}
      disabled={disabled}
      className={className}
      fullWidth={fullWidth}
      sx={customStyles}
    >
      {children}
    </Button>
  );
};
