import { Button, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePublicSingleDropdownButton } from './usePublicSingleDropdownButton';
import {
  PublicSingleDropdownButtonPropsI,
  PublicSingleDropdownOptionI,
} from './PublicSingleDropdownButton.interface';

export const PublicSingleDropdownButton = (
  props: PublicSingleDropdownButtonPropsI,
) => {
  const {
    dropdownOptions,
    disabled,
    dropdownName = 'Actions',
    hasEndIcon = true,
    btnVariant = 'outlined',
    Variant = hasEndIcon ? Button : IconButton,
    menuSxProps,
    ...buttonProps
  } = props;

  const { anchorEl, open, theme, handleClick, handleClose } =
    usePublicSingleDropdownButton();

  const buttonPropsWithIcon =
    Variant === Button ? { endIcon: hasEndIcon && <ArrowDropDownIcon /> } : {};

  return (
    <>
      <Variant
        variant={btnVariant}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="secondary"
        className="small"
        disabled={disabled}
        {...buttonPropsWithIcon}
        {...buttonProps}
      >
        {dropdownName}
      </Variant>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 2, ...menuSxProps }}
      >
        {dropdownOptions?.map((singleOption: PublicSingleDropdownOptionI) => (
          <MenuItem
            key={singleOption?.id}
            disabled={singleOption?.disabled}
            onClick={() => singleOption?.handleClick?.(handleClose)}
            sx={{
              '&.MuiMenuItem-root': {
                marginBottom: { md: 0.5 },
                marginX: { md: 0.5 },
              },
            }}
          >
            <Typography
              variant="body2"
              color={theme?.palette?.grey?.[600]}
              fontWeight={500}
              sx={singleOption?.titleSx}
              component={'div'}
            >
              {singleOption?.title}{' '}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
