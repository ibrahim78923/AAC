import { Button } from '@mui/material';
import {
  CustomizeSharedIcon,
  FilterSharedIcon,
  RestoreIcon,
} from '@/assets/icons';
import { CUSTOM_BUTTON_TYPES } from '@/constants/mui-constant';
import { CustomButtonPropsI } from '../Buttons.interface';
import { Cancel, CheckCircle, Visibility } from '@mui/icons-material';

const mappedIcon: any = {
  [CUSTOM_BUTTON_TYPES?.FILTER]: <FilterSharedIcon />,
  [CUSTOM_BUTTON_TYPES?.RESTORE]: <RestoreIcon />,
  [CUSTOM_BUTTON_TYPES?.CUSTOMIZE]: <CustomizeSharedIcon />,
  [CUSTOM_BUTTON_TYPES?.SUCCESS]: <CheckCircle />,
  [CUSTOM_BUTTON_TYPES?.REJECT]: <Cancel />,
  [CUSTOM_BUTTON_TYPES?.PREVIEW]: <Visibility />,
};

export const CustomButton = (props: CustomButtonPropsI) => {
  const {
    children,
    onClick,
    iconType = CUSTOM_BUTTON_TYPES?.FILTER,
    primary = false,
    variant = primary ? 'contained' : 'outlined',
    color = primary ? 'primary' : 'secondary',
    hasIcon = true,
    disabled = false,
    className = 'small',
    fullWidth = false,
    customStyles,
    type = 'button',
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
      type={type}
    >
      {children}
    </Button>
  );
};
