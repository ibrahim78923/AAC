import { CHIP_SHAPE, CHIP_VARIANTS } from '@/constants/mui-constant';
import { Chip } from '@mui/material';
import { CustomChipPropsI } from '../Chip.interface';

const mapBorderRadius = {
  [CHIP_SHAPE?.OVAL]: 4,
  [CHIP_SHAPE?.ROUNDED]: 2,
  [CHIP_SHAPE?.SQUARE]: 1,
};

export const CustomChip = (props: CustomChipPropsI) => {
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
    fontWeight = 400,
    hoverBackgroundColor = backgroundColor,
  } = props;

  return (
    <Chip
      size={size}
      label={label}
      variant={variant as any}
      color={color}
      disabled={disabled}
      icon={icon}
      onClick={() => onClick?.()}
      sx={{
        borderRadius: mapBorderRadius?.[shape] ?? borderRadius,
        backgroundColor,
        color: textColor,
        fontWeight,
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
