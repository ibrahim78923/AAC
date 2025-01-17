import { CHIP_SHAPE, CHIP_VARIANTS } from '@/constants/mui-constant';
import { Chip } from '@mui/material';

export const CustomChip = (props: any) => {
  const {
    size = 'small',
    label,
    color = 'primary',
    variant = CHIP_VARIANTS?.FILLED,
    disabled = false,
    customStyles,
    shape = CHIP_SHAPE?.OVAL,
    borderRadius,
    icon,
    backgroundColor,
    textColor,
    hoverStyles,
    onClick,
    isCapital,
    hoverBackgroundColor = backgroundColor,
  } = props;

  const mapBorderRadius = {
    [CHIP_SHAPE?.OVAL]: 4,
    [CHIP_SHAPE?.ROUNDED]: 2,
  };

  return (
    <Chip
      size={size}
      label={label}
      variant={variant}
      color={color}
      disabled={disabled}
      icon={icon}
      onClick={() => onClick?.()}
      sx={{
        borderRadius: mapBorderRadius?.[shape] ?? borderRadius,
        backgroundColor,
        color: textColor,
        textTransform: isCapital ? 'capitalize' : 'none',
        ...customStyles,
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
          ...hoverStyles,
        },
      }}
    />
  );
};
